import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../../Card/Card';
import { useHttpClient } from '../../../Hooks/http-hook';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';

import * as actions from '../../../../store/actions/index';
import './InfoTypeItem.css';


const InfoTypeItem = props => {

    const dispatch = useDispatch();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const addStudentToGroupHandler = () => {
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('updateGroups'));
        dispatch(actions.idProvider(props.id, 'studentId'));
    }

    const editHandler = e => {
        console.log('clicked');
    }
    const deleteHandler = async () => {
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `students/${props.id}`,
                'DELETE');
            dispatch(actions.deleteData(props.id));
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    return (
        <li className="admin-main__item">
            {loading && <Spinner />}
            {errorModalActive && <ErrorModal
                class='error-modal--active'
                errorMessage={error}
                errorHeaderMessage='Ups. Coś poszło nie tak.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <Card className="admin-main__content admin-main__content-orders">
                <div className="admin-main__info-div">
                    <h2 className='admin-main__h2'>{`${props.name} ${props.surname}`}</h2>
                    <p className='admin-main__p'>{`Tel: ${props.mobile}`}</p>
                    <p className='admin-main__p'>{`email: ${props.email}`}</p>
                    <p className='admin-main__p'>{`urodzny/a: ${props.birthday}`}</p>
                    <p className='admin-main__p'>{`Zamawia: ${props.courseName}`}</p>
                    <p className='admin-main__p'>{`Cena: ${props.coursePrice}`}</p>
                    <p className='admin-main__p'>{`Tryb nauki: ${props.lessonType}`}</p>
                    {props.marketingRules ? <p className='admin-main__p'>Zgody marketingowe:<i className="fas fa-check admin-main__yes-icon"></i></p> : <p className='admin-main__p'>Zgody marketingowe:<i className="fas fa-times admin-main__no-icon"></i></p>}
                    <p className='admin-main__p'>{`Złożone: ${props.submissionDate} o ${props.submissionTime}`}</p>
                    <p className='admin-main__p'>{`Komentarz: ${props.comments}`}</p>
                </div>
                <div className='admin-main__i-wrapper'>
                    <i onClick={addStudentToGroupHandler} className="fas fa-user-plus admin-main__i admin-main__i-user"></i>
                    <i onClick={editHandler} className="fas fa-pen admin-main__i admin-main__i-pen"></i>
                    <i onClick={deleteHandler} className="fas fa-trash-alt admin-main__i admin-main__i-trash"></i>
                </div>
            </Card>
        </li>
    );
}

export default InfoTypeItem;