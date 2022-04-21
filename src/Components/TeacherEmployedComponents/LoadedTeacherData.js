import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import LoadedTeacherAbout from './LoadedTeacherAbout';
import LoadedTeacherGroups from './LoadedTeacherGroups';
import LoadedTeacherFinance from './LoadedTeacherFinance';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../Shared/Context/auth-context';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import * as actions from '../../store/actions/index';

import './LoadedTeacherData.css';


const LoadedTeacherData = () => {

    const dispatch = useDispatch();
    const adminData = useSelector(state => state.adminData);
    const loadedTeacherData = useSelector(state => state.adminData.loadedData);
    const auth = useContext(AuthContext);

    const [loadedData, setLoadedData] = useState();
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const teacherId = auth.userStatus === 'HeadTeacher' ? adminData.teacherId : auth.userId;
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `teachers/groupsBy/${teacherId}`);
                dispatch(actions.loadedData(responseData.teacherWithGroups));
            } catch (err) {
                dispatch(actions.toggleBackdrop(true));
                setErrorModalActive(true);
            }
        }
        fetchData();
    }, [sendRequest, dispatch, auth.userId, auth.userStatus, adminData.teacherId]);

    useEffect(() => {
        if (Object.keys(loadedTeacherData).length > 0 && loadedTeacherData.constructor === Object) {
            setLoadedData(loadedTeacherData);
        }
    }, [loadedTeacherData]);


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    return (
        <React.Fragment>
            {loading && <Spinner />}
            {<ErrorModal
                class={errorModalActive && ['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <aside className='dashboard student__infotype-dashboard'>
                <LoadedTeacherGroups
                    loadedGroups={loadedData && loadedData.group}
                    loading={loading}
                />
                <LoadedTeacherAbout
                    id={loadedData && loadedData.id}
                    name={loadedData && loadedData.name}
                    surname={loadedData && loadedData.surname}
                    mobile={loadedData && loadedData.mobile}
                    email={loadedData && loadedData.email}
                    zoomLink={loadedData && loadedData.zoom && loadedData.zoom.link}
                    zoomPassword={loadedData && loadedData.zoom && loadedData.zoom.password}
                    zoomMeetingId={loadedData && loadedData.zoom && loadedData.zoom.meetingId}
                    profileImgPath={loadedData && loadedData.profileImage && loadedData.profileImage.location}
                    loading={loading}
                />
                <LoadedTeacherFinance
                    name={loadedData && loadedData.name}
                    surname={loadedData && loadedData.surname}
                    mobile={loadedData && loadedData.mobile}
                    email={loadedData && loadedData.email}
                    id={loadedData && loadedData.id}
                    invoices={loadedData && loadedData.invoices}
                    bankaccount={loadedData && loadedData.bankaccount}
                />
            </aside>
        </React.Fragment>
    );
}

export default LoadedTeacherData;
