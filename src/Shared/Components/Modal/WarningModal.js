import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../Elements/Button/Button';
import Spinner from '../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from './ErrorModal';
import { useHttpClient } from '../../Hooks/http-hook';
import * as actions from '../../../store/actions/index';
import './WarningModal.css';



const WarningModal = props => {
    const dispatch = useDispatch();

    const toggleModal = useSelector(state => state.modal);

    const warningModalPayload = useSelector(state => state.modal.warningModalPayload);

    const [deleteConfirmed, setDeleteConfirmed] = useState(false);

    const [confirmInputValue, setConfirmInputValue] = useState('');

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    useEffect(() => {
        dispatch(actions.loading(loading));
    }, [dispatch, loading]);


    const confirmDeleteDataHandler = e => {
        setConfirmInputValue(e.target.value);
        if (e.target.value === warningModalPayload.elementName) {
            setDeleteConfirmed(true);
        } else {
            setDeleteConfirmed(false);
        }
    }


    const deleteHandler = async () => {
        setConfirmInputValue('');
        setDeleteConfirmed(false);
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        let path = warningModalPayload.path;
        let method = 'DELETE';
        let body;

        if (warningModalPayload.type === 'removeFromGroup') {
            body = JSON.stringify(warningModalPayload.body);
            method = 'PATCH';
        }

        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + path,
                method,
                body && body,
                body && { 'Content-Type': 'application/json' }
            );
            dispatch(actions.toggleBackdrop(false));
            dispatch(actions.deleteData(warningModalPayload.id));
            warningModalPayload.type === 'settings' && dispatch(actions.appSettings([response.settings]));
            dispatch(actions.loadWarningModalPayload(null));
            warningModalPayload.elementName === 'Usuń temat' && dispatch(actions.deleteData(response.topic));
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
            dispatch(actions.loadWarningModalPayload(null));
        }
    }

    const cancelDeleteButton = () => {
        dispatch(actions.toggleBackdrop(false));
        dispatch(actions.toggleModal('warningModal'));
        setConfirmInputValue('');
        setDeleteConfirmed(false);
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    return (
        <React.Fragment>
            {loading && <Spinner classSpinner='spinner-centered' />}
            {errorModalActive && <ErrorModal
                class='error-modal--active'
                errorMessage={error}
                errorHeaderMessage='Ups. Coś poszło nie tak.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className={`error-modal ${toggleModal.warningModal && 'warrning-modal--active'}`} >
                <header className={props.status ? ['error-modal__header', 'error-modal__header-ok'].join(' ') : 'error-modal__header'}>
                    <p>UWAGA</p>
                </header>
                <p className='error-modal__message warrning-modal_message'>Próbujesz usunąć element wraz z powiązanymi z nim danymi. Tej czynności nie będzie można cofnąć! Wpisz nazwę tego elementu, jeśli jesteś pewien, że ma on zostać trwale usunięty z bazy danych.</p>
                <div className='warrning-modal__input-wrapper'>
                    <label htmlFor='warrningInput'>{`Przepisz: ${warningModalPayload && warningModalPayload.elementName}`}  </label>
                    <input className='warrning-modal__input' type='text' id='warrningInput' onChange={confirmDeleteDataHandler} value={confirmInputValue} />
                </div>
                <div className='error-modal__buttons-div'>
                    <Button
                        classButton='error-modal__button warrning-modal__cancel'
                        click={cancelDeleteButton}
                        btnText={props.btnText || 'anuluj'} />
                    <Button
                        classButton='error-modal__button warrning-modal__delete'
                        click={deleteHandler}
                        btnText={props.btnText || 'usuń'}
                        disabled={!deleteConfirmed} />
                </div>
            </div>
        </React.Fragment>

    );
}

export default WarningModal;