import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StudentAbout from './StudentAbout/StudentAbout';
import StudentFinance from './StudentFinance/StudentFinance';
import StudentLessons from './StudentLessons/StudentLessons';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';

import './StudentInfoType.css';


const StudentInfoType = props => {

    const auth = useContext(AuthContext);

    const userId = useParams().userId;

    const studentData = useSelector(state => state.adminData.loadedData);

    const [loadedData, setLoadedData] = useState(false);
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);
    const [settingsErrorModalActive, setSettingsErrorModalActive] = useState(false);
    const [generalDocuments, setGeneralDocuments] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `students/student/${userId}`);
                dispatch(actions.loadedData(responseData.student));
            } catch (err) {
                setErrorModalActive(true);
                dispatch(actions.toggleBackdrop(true));
            }
        }
        fetchData();
    }, [sendRequest, userId, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `documents/`);
                setGeneralDocuments(responseData);
            } catch (err) {
                setSettingsErrorModalActive(true);
                dispatch(actions.toggleBackdrop(true));
            }
        }
        fetchData();
    }, [sendRequest, userId, dispatch]);

    useEffect(() => {
        if (studentData) {
            setLoadedData(studentData);
        }
    }, [dispatch, studentData]);

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        setSettingsErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
        errorModalActive && auth.logout();
    }

    return (
        <React.Fragment>
            {loading && <Spinner />}
            {(errorModalActive || settingsErrorModalActive) && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={settingsErrorModalActive ? 'Nie pobrałem danych o organizacji roku szkolnego lub listy Twoich dokumentów. Przypisanie ocen i tematów do poszczególnych semestrów mogło się nie powieść. Lista dokumentów do pobrania może nie być aktywna. Wszystkie pozostałe dane wyświetlane są poprawnie.' : error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <aside className='dashboard student__infotype-dashboard'>
                <StudentAbout
                    name={loadedData.name}
                    surname={loadedData.surname}
                    mobile={loadedData.mobile}
                    email={loadedData.email}
                    courses={loadedData.courses}
                    topics={loadedData.topics}
                    invoiceData={loadedData.invoiceData}
                    address={loadedData.address}
                    id={loadedData.id}
                    invoiceEmail={loadedData.invoiceData && (loadedData.invoiceData.email ? loadedData.invoiceData.email : loadedData.email)}
                    documents={loadedData.documents}
                    generalDocuments={generalDocuments.documents}
                    profileImgPath={loadedData && loadedData.profileImage && loadedData.profileImage.location}
                    loading={loading}
                />
                <StudentLessons
                    groups={loadedData.group}
                    courses={loadedData.courses}
                    topics={loadedData.topics}
                    grades={loadedData.grades}
                    studentName={loadedData.name}
                    studentSurname={loadedData.surname}
                    studentEmail={loadedData.email}
                    endTermGrades={loadedData.endTermGrades}
                    certificateIsAvailable={{
                        name: loadedData.name,
                        surname: loadedData.surname,
                        birthday: loadedData.birthday,
                        birthplace: loadedData.birthplace,
                        financialRates: loadedData.financialRates,
                        invoices: loadedData.invoices,
                        grade: loadedData.endTermGrades,
                        group: loadedData.group
                    }}
                />
                <StudentFinance
                    invoices={loadedData.invoices}
                    financialRates={loadedData.financialRates}
                    studentId={loadedData.id}
                    name={loadedData.name}
                    surname={loadedData.surname}
                    email={loadedData.email}
                    mobile={loadedData.mobile} />
            </aside>
        </React.Fragment>
    );
}

export default StudentInfoType;