import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddToDatebase from '../../Shared/Elements/AddToBasedate/AddToBasedate';
import Borderline from '../../Shared/Components/Borderline/Borderline';
import DataAdminModal from '../../Shared/Components/Modal/DataAdminModal';
import InfoTypeSection from '../../Shared/Components/InfoTypeSection/TeacherInfoType/InfoTypeSection';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import * as actions from '../../store/actions/index';
import './Teachers.css';


const Teachers = props => {

    const dispatch = useDispatch();
    const adminData = useSelector(state => state.adminData.loadedData);
    const archiveMode = useSelector(state => state.archive.archiveMode);

    const [loadedData, setLoadedData] = useState();
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);

    useEffect(() => {
        dispatch(actions.loadedData([]));
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'teachers/' + archiveMode);
                dispatch(actions.loadedData(responseData.teachers));
            } catch (err) {
                dispatch(actions.toggleBackdrop(true));
                setErrorModalActive(true);

            }
        }
        fetchData();
    }, [sendRequest, dispatch, archiveMode]);


    useEffect(() => {
        setLoadedData(adminData);
    }, [adminData]);

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    const addButtonHandler = () => {
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('teachers'));
    }

    const sendMessageToAllHandler = () => {
        const recipients = [];
        for (let recipient of loadedData) {
            recipients.push({
                id: recipient.id,
                email: recipient.email,
                mobile: recipient.mobile,
                name: recipient.surname + ' ' + recipient.name
            });
        }

        dispatch(actions.sendEmailMessage({}, recipients));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    const searchInputHandler = (e) => {
        let searchedData;
        if (e.target.value.length === 0) {
            searchedData = adminData;
        } else {
            searchedData = adminData.filter(data =>
                data.name.toLowerCase().includes(e.target.value.toLowerCase()) || data.surname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.mobile.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
        }
        setLoadedData(searchedData);
    }

    return (
        <React.Fragment>
            <div className='info-type-panel'>
                {!archiveMode && <AddToDatebase
                    btnText='dodaj nowego lektora'
                    classButton='info-type-panel__btn'
                    iconClass='fas fa-user-plus info-type-panel__i admin-main__i-pen'
                    click={addButtonHandler}
                />}
                {!archiveMode && <AddToDatebase
                    btnText='Wiadomość do wszystkich'
                    classButton='info-type-panel__btn'
                    iconClass='fas fa-envelope admin-main__i-envelope info-type-panel__i'
                    click={sendMessageToAllHandler}
                />}
                <div className='info-type-panel__search-div'>
                    <i className="fas fa-search info-type-panel__search-i"></i>
                    <input
                        className='info-type-panel__btn button info-type-panel__search'
                        type='text'
                        placeholder='Imię, nazwisko, email lub telefon'
                        onChange={searchInputHandler}
                    />
                </div>
                <Borderline />
                <DataAdminModal />
            </div>
            {loading ? <Spinner /> : (!errorModalActive ?
                <InfoTypeSection loadedData={loadedData} />
                :
                <ErrorModal
                    class='error-modal--active'
                    errorMessage={error}
                    errorHeaderMessage='Błąd sieciowy'
                    click={errorModalCancelHandler} />)}
        </React.Fragment>
    );
}

export default Teachers;