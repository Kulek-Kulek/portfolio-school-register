import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../Card/Card';
import { useHttpClient } from '../../../Hooks/http-hook';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';
import * as actions from '../../../../store/actions/index';



const InfoTypeItem = props => {

    const dispatch = useDispatch();

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const [noneArchiveTeachers, setNoneArchiveTeachers] = useState();

    const { loading, error, sendRequest, clearError, status, clearStatus } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const addStudentToGroupHandler = () => {
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('updateGroups'));
        dispatch(actions.idProvider(props.id, 'teacherId'));
        window.scrollTo(0, 50);
    }

    const updatedTeacherHandler = async e => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `teachers/teacher/${props.id}`);
            dispatch(actions.loadData(response.teacher));
            dispatch(actions.idProvider(response.teacher.id, 'teacherId'))
            dispatch(actions.infoTypeChange('updateTeacher'));
            dispatch(actions.toggleBackdrop(true));
            dispatch(actions.toggleModal('dataAdminModal'));
            window.scrollTo(0, 50);
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }


    const archiveHandler = async e => {
        e.preventDefault();
        dispatch(actions.toggleBackdrop(true));
        try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'teachers/' + e.target.id,
                'PATCH',
                JSON.stringify({
                    name: props.name,
                    surname: props.surname,
                    mobile: props.mobile,
                    email: props.email,
                    archive: archiveMode ? false : true
                }),
                { 'Content-Type': 'application/json' }
            );
            setNoneArchiveTeachers(responseData.teachers);
            setErrorModalActive(true);
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }


    const deleteHandler = () => {
        dispatch(actions.toggleBackdrop(true));
        window.scrollTo(0, 50);
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: props.id,
                path: 'teachers/' + props.id,
                type: 'teacher',
                elementName: props.name + ' ' + props.surname
            }
        ));
    }


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        clearStatus();
        dispatch(actions.toggleBackdrop(false));
        noneArchiveTeachers && dispatch(actions.loadedData(noneArchiveTeachers));
    }

    const sendMessageHandler = e => {
        dispatch(actions.sendEmailMessage({}, [
            {
                id: props.id,
                name: props.surname + ' ' + props.name,
                email: props.email,
                mobile: props.mobile
            }
        ]
        ));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    const showTeacherDataHandler = e => {
        dispatch(actions.idProvider(e.target.id, 'teacherId'));
    }

    let groups;
    if (props.groupData) {
        if (props.groupData.length >= 2) {
            groups = props.groupData.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
        groups = props.groupData.map(g => (
            <div className='admin-main__populated-data-div' key={g.name}>
                <p className='admin-main__populated-data'>{`Grupa: ${g.name}`}</p>
            </div>
        ));
    }


    let archiveModalMessage = 'Lektor został przeniosiony do archiwum. W każdej chwili można go przywrócić do grupy lektorów aktywnych.';
    if (archiveMode) archiveModalMessage = 'Lektor został przeniosiony do lektorów aktywnych. W każdej chwili można go przywrócić do archiwum.';

    return (
        <li className="admin-main__item">
            {loading && <Spinner />}
            {errorModalActive && <ErrorModal
                class={errorModalActive && 'error-modal--active basket__error-modal'}
                errorMessage={status ? archiveModalMessage : error}
                errorHeaderMessage={status ? 'Operacja powiodła się.' : 'Operacja nie powiodła się.'}
                btnText='Zamknij'
                click={errorModalCancelHandler}
                status={status} />}
            <Card className="admin-main__content admin-main__content-teacher">
                <div className="admin-main__info-div">
                    <h2 className='admin-main__h2'>{`${props.surname} ${props.name}`}</h2>
                    <p className='admin-main__p'>{`Tel: ${props.mobile}`}</p>
                    <p className='admin-main__p'>{`email: ${props.email}`}</p>
                    <p className='admin-main__p'>{`Zoom link: ${props.zoomLink || 'Nie podano'}`}</p>
                    <p className='admin-main__p'>{`MeetingId: ${props.zoomMeetinId || 'Nie podano'}`}</p>
                    <p className='admin-main__p'>{`Zoom Password: ${props.zoomPassword || 'Nie podano'}`}</p>
                    <div className='admin-main__students-div'>
                        {groups}
                    </div>
                </div>
                <div className='admin-main__i-wrapper'>
                    <Link to={'/teacher/' + props.id} >
                        <i className="far fa-eye admin-main__i admin-main__i-eye" onClick={showTeacherDataHandler} id={props.id}></i>
                    </Link>
                    <Link to={'/statistics/teacher/' + props.id} className='admin-main__a'>
                        <i className="fas fa-file-invoice admin-main__i admin-main__i-invoice"></i>
                    </Link>
                    {!archiveMode && <i onClick={addStudentToGroupHandler} className="fas fa-user-plus admin-main__i admin-main__i-pen"></i>}
                    {!archiveMode && <i onClick={updatedTeacherHandler} className="fas fa-pen admin-main__i admin-main__i-user"></i>}
                    <i onClick={sendMessageHandler} className="fas fa-envelope admin-main__i admin-main__i-envelope" id={props.email}></i>
                    <i onClick={archiveHandler} className="fas fa-archive admin-main__i admin-main__i-archive" id={props.id}></i>
                    <i onClick={deleteHandler} className="fas fa-trash-alt admin-main__i admin-main__i-trash"></i>
                </div>
            </Card>
        </li>
    );
}

export default InfoTypeItem;