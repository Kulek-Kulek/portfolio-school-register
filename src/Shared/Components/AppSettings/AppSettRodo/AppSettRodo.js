import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RodoStudentsList from './RodoStudentsList';
import Input from '../../../Elements/Input/Input';
import Button from '../../../Elements/Button/Button';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Components/Modal/ErrorModal';
import { useHttpClient } from '../../../Hooks/http-hook';
import { useForm } from '../../../Hooks/form-hook';
import {
    VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH
} from '../../../../Utility/form-validators.js';
import * as actions from '../../../../store/actions/index';

import './AppSettRodo.css';


const AppSettRodo = props => {

    const dispatch = useDispatch();

    const rodoSettings = useSelector(state => state.adminData.appSettings[0].rodo);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        rodoName: {
            value: null,
            isValid: false
        },
        rodoText: {
            value: null,
            isValid: false
        }
    },
        false
    );


    const setSettingsSchedlueHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/rodo',
                'POST',
                JSON.stringify({
                    rodoName: formState.inputs.rodoName.value,
                    rodoText: formState.inputs.rodoText.value,
                    rodoDate: new Date().toISOString()
                }),
                { 'Content-Type': 'application/json' }
            );
            dispatch(actions.appSettings([response.settings]));
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    const deleteHandler = (e) => {
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: e.target.id,
                path: 'settings/rodo/' + e.target.id,
                type: 'settings',
                elementName: 'Usuń to rodo'
            }
        ));
    }

    let rodos = <p>Brak danych</p>
    if (rodoSettings && rodoSettings.length > 0) {
        rodos = rodoSettings.map(rodo => (
            <div key={rodo.id} className='settings__rodo-div'>
                <p className='settings__rodo-title'>{rodo.rodoName}
                    <i onClick={deleteHandler} id={rodo.id} className="fas fa-trash-alt settings__delete-item  admin-main__i-trash"></i>
                </p>
                <p className='settings__set-rodo-date'>
                    {'Wprowadzono ' + (new Date(rodo.rodoDate).toLocaleDateString().length < 10 ? '0' + new Date(rodo.rodoDate).toLocaleDateString() : new Date(rodo.rodoDate).toLocaleDateString()) + ' roku'}
                </p>
                <p className='settings__rodo-text'>{rodo.rodoText}</p>
                <ol className='settings__rodo-students-list'>
                    <p className='settings__rodo-students'>Wyrazili zgodę</p>
                    <RodoStudentsList students={rodo.students} />
                </ol>
            </div>
        ))
    }

    return (
        <React.Fragment>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='settings__details-wrap settings__details-wrap--active settings'>
                <div className='settings__settings'>
                    <p className='settings__title'>Ustaw zgody na przetwarzanie danych</p>
                    <p className='settings__desc'>Zbieraj i zarządzaj zgodami na przetwarzanie danych osobowych. Ustaw tyle rodzajów zgód marketingowych ile potrzebujesz. Będą się one wyświetlać na kontach klientów wraz z zachętą do ich podpisania.</p>
                    {loading ? <Spinner /> :
                        <form className='settings__inputs-form settings__inputs-rodo' onSubmit={setSettingsSchedlueHandler}>
                            <Input
                                input='input'
                                type='text'
                                id='rodoName'
                                label='Nazwa tego, czego dotyczy ta zgoda'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(3)]}
                            />
                            <Input
                                input='textarea'
                                type='textarea'
                                rows='5'
                                id='rodoText'
                                label='Treść zgody'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(5)]}
                            />
                            <Button
                                btnText='Zatwierdź'
                                type='submit'
                                classButton='settings__btn'
                                disabled={!formState.isValid}
                            />
                        </form>
                    }
                </div>
                <div className='settings__current'>
                    <p className='settings__title settings__set-title'>Aktualne ustawienia</p>
                    <div className='settings__set-data-rodo'>
                        {rodos}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppSettRodo;