import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../../Card/Card';
import { useHttpClient } from '../../../Hooks/http-hook';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';
import Button from '../../../../Shared/Elements/Button/Button';
import * as actions from '../../../../store/actions/index';
import './InfoTypeItem.css';


const InfoTypeItem = props => {

    const dispatch = useDispatch();

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const [noneArchiveGroups, setNoneArchiveGroups] = useState();

    const { loading, error, sendRequest, clearError, status, clearStatus } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const renewGroupHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'groups/recreate-group/' + e.target.id,
                'POST',
                JSON.stringify({
                    groupId: e.target.id
                }),
                { 'Content-Type': 'application/json' }
            );
            dispatch(actions.addNewData(responseData.group));
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }

    const updatedGroupHandler = async () => {
        dispatch(actions.toggleBackdrop(true));
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `groups/group/${props.id}`);
            dispatch(actions.loadData({
                name: response.group.name,
                lessonLength: response.group.lessonLength,
                courseLength: response.group.courseLength,
                certificateType: response.group.certificateType,
                groupLevel: response.group.groupLevel,
                lessonDayTime: response.group.lessonDayTime,
                groupCourseName: response.group.courseName,
                schoolYear: response.group.schoolYear,
                courseBook: response.group.courseBook
            }));
            dispatch(actions.idProvider(response.group.id, 'groupId'));
            dispatch(actions.infoTypeChange('updateGroup'));
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
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'groups/' + e.target.id,
                'PATCH',
                JSON.stringify({
                    name: props.name,
                    lessonLength: props.lessonLength,
                    courseLength: props.courseLength,
                    certificateType: props.certificateType,
                    lessonDayTime: props.lessonDayTime,
                    groupLevel: props.groupLevel,
                    archive: archiveMode ? false : true,
                    courseName: props.courseName,
                    schoolYear: props.schoolYear
                }),
                { 'Content-Type': 'application/json' }
            );
            setNoneArchiveGroups(responseData.groups);
            setErrorModalActive(true);
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }


    const deleteHandler = () => {
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: props.id,
                path: 'groups/' + props.id,
                type: 'groups',
                elementName: props.name
            }
        ));
    }


    const deleteFromGroupHandler = e => {
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: e.target.id,
                path: 'groups/remove-from-group/' + props.id,
                type: 'removeFromGroup',
                elementName: e.target.name,
                groupId: props.id,
                body: { [e.target.value + 'Id']: e.target.id }
            }
        ));
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        clearStatus();
        dispatch(actions.toggleBackdrop(false));
        dispatch(actions.toggleBackdrop(false));
        noneArchiveGroups && dispatch(actions.loadedData(noneArchiveGroups));
    }

    const sendMessageHandler = () => {
        dispatch(actions.toggleBackdrop(true));
        const recipants = []
        for (let student of props.studentData) {
            recipants.push({
                id: student.id,
                name: student.surname + ' ' + student.name,
                email: student.email,
                mobile: student.mobile
            })
        }
        dispatch(actions.sendEmailMessage({}, recipants));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    let groupLeader;
    if (props.teacherData) {
        groupLeader = props.teacherData.map(t => (
            <div className='admin-main__populated-data-div' key={t.id}>
                <h4 className='admin-main__populated-data'>{'Lektor: ' + t.name + ' ' + t.surname}</h4>
                <Button
                    btnText='usuń'
                    classButton='admin-main__delete-btn'
                    id={t.id}
                    name={t.name + ' ' + t.surname}
                    value='teacher'
                    click={deleteFromGroupHandler}
                />
            </div>
        ));
    };

    let students;
    if (props.studentData) {
        if (props.studentData.length > 1) {
            if (props.studentData.length > 1) {
                students = props.studentData.sort((a, b) => b.surname && a.surname.localeCompare(b.surname));
            }
        }

        students = props.studentData.map((s, index) => (
            <div className='admin-main__populated-data-div' key={s.email + index}>
                <p className='admin-main__populated-data'>{s.surname + ' ' + s.name}</p>
                <Button
                    btnText='usuń'
                    classButton='admin-main__delete-btn'
                    id={s.id}
                    name={s.name + ' ' + s.surname}
                    value='student'
                    click={deleteFromGroupHandler}
                />
            </div>
        ))
    }

    const days = [];
    const timeFrom = [];
    const timeTo = [];
    if (props.lessonDayTime) {
        for (let i of Object.values(props.lessonDayTime)) {
            for (let d of Object.keys(i)) {
                if (i[d] === true) {
                    days.push(d);
                }
                if (d.includes('Od')) {
                    timeFrom.push(i[d]);
                }
                if (d.includes('Do')) {
                    timeTo.push(i[d]);
                }
            }
        }
    }

    let timetable;

    timetable = days.map((day, index) => <p className='admin-main__populated-data' key={day + index}>{`${day} od ${timeFrom[index]} do ${timeTo[index]}`}</p>);


    let lessonsLeft = props.courseLength - props.topics.length + ' lekcji';

    if (props.courseLength - props.topics.length <= 0) lessonsLeft = 'Kurs ukończony';

    let archiveModalMessage = 'Grupa została przeniosiona do archiwum. W każdej chwili można ją przywrócić do grupy aktywnych.';
    if (archiveMode) archiveModalMessage = 'Grupa została przeniosiona do grup aktywnych. W każdej chwili można ją przywrócić do archiwum.';

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
            <Card className="admin-main__content admin-main__content-group">
                <div className="admin-main__info-div admin-main__info-divgroup">
                    <h2 className='admin-main__h2'>{props.name}</h2>
                    {groupLeader}
                    {<p className='admin-main__populated-data'>{`Kurs: ${props.courseLength} godz / ${props.lessonLength} min. Pozostało: ${lessonsLeft}`}</p>}
                    <p className='admin-main__populated-data'>Dni i godziny zajęć:</p>
                    {timetable}
                    <p className='admin-main__populated-data'>{`Certyfikat:  ${props.certificateType ? props.certificateType : 'Brak danych'}`}</p>
                    <p className='admin-main__populated-data'>{`Poziom:  ${props.groupLevel ? props.groupLevel : 'Brak danych'}`}</p>
                    <p className='admin-main__populated-data'>{`Podręcznik:  ${props.courseBook ? props.courseBook : 'Brak danych'}`}</p>
                    <div className='admin-main__students-div'>
                        <p className='admin-main__populated-data admin-main__students-heading'>Uczniowie:</p>
                        {students}
                    </div>
                </div>
                <div className='admin-main__i-wrapper'>
                    {!archiveMode && <i onClick={renewGroupHandler} className="fas fa-plus-circle admin-main__i admin-main__i-user" id={props.id}></i>}
                    {!archiveMode && <i onClick={updatedGroupHandler} className="fas fa-pen admin-main__i admin-main__i-pen"></i>}
                    <Link to={'/statistics/group/' + props.id} className='admin-main__a'>
                        <i className="fas fa-file-invoice admin-main__i admin-main__i-invoice"></i>
                    </Link>
                    <i onClick={sendMessageHandler} className="fas fa-envelope admin-main__i admin-main__i-envelope" id={props.email}></i>
                    <i onClick={archiveHandler} className="fas fa-archive admin-main__i admin-main__i-archive" id={props.id}></i>
                    <i onClick={deleteHandler} className="fas fa-trash-alt admin-main__i admin-main__i-trash"></i>
                </div>
            </Card>
        </li>
    );
}

export default InfoTypeItem;