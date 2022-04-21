import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useHttpClient } from '../../../Hooks/http-hook';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Modal/ErrorModal';
import Card from '../../Card/Card';
import * as actions from '../../../../store/actions/index';
import './InfoTypeItem.css';


const InfoTypeItem = props => {

    const { loading, error, sendRequest, clearError, status, clearStatus } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [noneArchiveStudents, setNoneArchiveStudents] = useState();

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const dispatch = useDispatch();

    const addStudentToGroupHandler = () => {
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('updateGroups'));
        dispatch(actions.idProvider(props.id, 'studentId'));
        window.scrollTo(0, 50);
    }

    const updatedStudentHandler = () => {

        const address = {
            street: props.address ? props.address.street : null,
            zipcode: props.address ? props.address.zipcode : null,
            city: props.address ? props.address.city : null,
            placeNumber: props.address ? props.address.placeNumber : null
        }

        const invoiceData = {
            name: props.invoiceData ? props.invoiceData.name : null,
            taxNo: props.invoiceData ? props.invoiceData.taxNo : null,
            email: props.invoiceData ? props.invoiceData.email : null,
            mobile: props.invoiceData ? props.invoiceData.mobile : null,
            street: props.invoiceData ? (props.invoiceData.street !== ' ' ? props.invoiceData.street : null) : null,
            zipcode: props.invoiceData ? (props.invoiceData.zipcode !== ' ' ? props.invoiceData.zipcode : null) : null
        }


        dispatch(actions.loadData({
            name: props.name,
            surname: props.surname,
            mobile: props.mobile,
            email: props.email,
            birthday: props.birthday,
            birthplace: props.birthplace,
            address,
            invoiceData,
            supervisors: props.supervisors.length > 0 && props.supervisors
        }));
        dispatch(actions.idProvider(props.id, 'studentId'));
        dispatch(actions.infoTypeChange('updateStudent'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('dataAdminModal'));
        window.scrollTo(0, 50);
    }

    const archiveHandler = async e => {
        e.preventDefault();
        dispatch(actions.toggleBackdrop(true));
        try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'students/' + e.target.id,
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
            setNoneArchiveStudents(responseData.students);
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
                path: 'students/' + props.id,
                type: 'students',
                elementName: props.name + " " + props.surname
            }
        ));
    }

    const sendMessageHandler = () => {
        dispatch(actions.sendEmailMessage({}, [
            {
                id: props.id,
                name: props.surname + ' ' + props.name,
                email: props.email,
                mobile: props.mobile
            }
        ]));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    const showStudentDataHandler = e => {
        dispatch(actions.idProvider(e.target.id, 'studentId'));
    }


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        clearStatus();
        dispatch(actions.toggleBackdrop(false));
        noneArchiveStudents && dispatch(actions.loadedData(noneArchiveStudents));
    }

    let groups;
    if (props.groupData) {
        groups = props.groupData.map(g => (
            <div className='admin-main__populated-data-div' key={g.id}>
                <p className='admin-main__populated-data'>{`Grupa: ${g.name}`}</p>
            </div>
        ));
    }
    let courses;
    if (props.coursesData) {
        courses = props.coursesData.map(c => (
            <div className='admin-main__populated-data-div' key={c.id}>
                <p className='admin-main__populated-data'>{`Kurs: ${c.courseTitle}`}</p>
            </div>
        ));
    }

    let birthdayData = <p className='admin-main__p'>Data i miejsce urodzenia: Brak danych</p>;
    if (props.birthday && props.birthplace) {
        birthdayData = <p className='admin-main__p'>{`Data i miejsce urodzenia: ${new Date(props.birthday).toLocaleDateString()} ${props.birthplace}`}</p>
    }

    let archiveModalMessage = 'Uczeń został przeniosiony do archiwum. W każdej chwili można go przywrócić do grupy uczniów aktywnych.';
    if (archiveMode) archiveModalMessage = 'Uczeń został przeniosiony do uczniów aktywnych. W każdej chwili można go przywrócić do archiwum.';

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
            <Card className="admin-main__content admin-main__content-student">
                <div id={props.id} className="admin-main__main-wrapper">
                    <div className='admin-main__info-div' >
                        <h2 className='admin-main__h2'>{`${props.surname} ${props.name}`}</h2>
                        <p className='admin-main__p'>{`Tel: ${props.mobile}`}</p>
                        <p className='admin-main__p'>{`email: ${props.email}`}</p>
                        {birthdayData}
                        {groups}
                        {courses}
                    </div>
                    <div className='admin-main__i-wrapper'>
                        <Link to={'/client/' + props.id} className='admin-main__a'>
                            <i onClick={showStudentDataHandler} id={props.id} className="far fa-eye admin-main__i admin-main__i-eye"></i>
                        </Link>
                        <Link to={'/statistics/student/' + props.id} className='admin-main__a'>
                            <i className="fas fa-file-invoice admin-main__i admin-main__i-invoice"></i>
                        </Link>
                        {!archiveMode && <i onClick={addStudentToGroupHandler} className="fas fa-user-plus admin-main__i admin-main__i-user"></i>}
                        {!archiveMode && <i onClick={updatedStudentHandler} className="fas fa-pen admin-main__i admin-main__i-pen"></i>}
                        <i onClick={sendMessageHandler} className="fas fa-envelope admin-main__i admin-main__i-envelope" id={props.email}></i>
                        <i onClick={archiveHandler} className="fas fa-archive admin-main__i admin-main__i-archive" id={props.id}></i>
                        <i onClick={deleteHandler} className="fas fa-trash-alt admin-main__i admin-main__i-trash"></i>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default InfoTypeItem;