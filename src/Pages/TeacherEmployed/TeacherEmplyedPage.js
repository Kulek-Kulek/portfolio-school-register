import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Dashboard from '../../Components/ClientComponents/Dashboard';
import LoadedTeacherData from '../../Components/TeacherEmployedComponents/LoadedTeacherData';
import { changeActiveStudentInfoType } from '../../Components/ClientComponents/changeActiveStudentInfoType';
import { AuthContext } from '../../Shared/Context/auth-context';
import DataAdminModal from '../../Shared/Components/Modal/DataAdminModal';
import InfoPopUpModal from '../../Shared/Components/Modal/InfoPopUpModal';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import * as actions from '../../store/actions/index';

import './TeacherEmployedPage.css';



const TeacherEmployedPage = props => {

    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const activeMessages = useSelector(state => state.adminData.appSettings[0].internalMessages);

    const teacherId = useSelector(state => state.adminData.loadedData._id);

    const { sendRequest } = useHttpClient();

    const [navMessageIconActive, setNavMessageIconActive] = useState(false);

    const panelFiguresTypes = [
        {
            name: auth.userStatus === 'HeadTeacher' ? 'Grupy Lektora' : 'Twoje grupy',
            id: 'studentLessonsInfo',
            icon: 'fas fa-users student__dashboard-i student__dashboard-i--active',
            class: 'dashboard student__dashboard-figure student__dashboard-figure--active',
            spanClass: 'student__dashboard-span'
        },
        {
            name: auth.userStatus === 'HeadTeacher' ? 'o lektorze' : 'O tobie',
            id: 'generalStudentInfo',
            icon: 'fas fa-project-diagram student__dashboard-i',
            class: 'dashboard student__dashboard-figure',
            spanClass: 'student__dashboard-span'
        },
        {
            name: auth.userStatus === 'HeadTeacher' ? 'rozliczenia' : 'twoje finanse',
            id: 'studentFinanceInfo',
            icon: 'fas fa-piggy-bank student__dashboard-i',
            class: 'dashboard student__dashboard-figure',
            spanClass: 'student__dashboard-span'
        }
    ];

    const [infoPopupModalAcitive, setInfoPopupModalAcitive] = useState();


    useEffect(() => {
        changeActiveStudentInfoType();
    }, [dispatch]);


    useEffect(() => {
        if (activeMessages && activeMessages.length > 0) {
            const today = new Date();
            let expiryDate;
            let startDate;

            for (let msg of activeMessages) {
                expiryDate = new Date(msg.lastInternalMessageDay);
                startDate = new Date(msg.firstInternalMessageDay);

                if (msg.messageToTeachers && msg.readBy && msg.readBy.length > 0 && teacherId && expiryDate >= today && startDate <= today) {
                    const clearedReadBy = msg.readBy.filter(t => t === teacherId);
                    if (clearedReadBy.length > 0) {
                        setNavMessageIconActive(true);
                    }
                    else {
                        setTimeout(() => {
                            const infoPopupModal = document.querySelector('.info-popup-modal');
                            infoPopupModal.classList.add('info-popup-modal--active');
                            setInfoPopupModalAcitive(msg);
                            dispatch(actions.toggleBackdrop(true));
                        }, 2000);
                    }
                }

                if (msg.messageToTeachers && expiryDate >= today && startDate <= today && (!msg.readBy || (msg.readBy && msg.readBy.length === 0))) {
                    setTimeout(() => {
                        const infoPopupModal = document.querySelector('.info-popup-modal');
                        infoPopupModal.classList.add('info-popup-modal--active');
                        setInfoPopupModalAcitive(msg);
                        dispatch(actions.toggleBackdrop(true));
                    }, 2000);
                }
            }
        }
    }, [activeMessages, teacherId, dispatch]);

    const cancelInfoPopUpModal = async e => {

        const infoPopupModal = document.querySelector('.info-popup-modal');
        infoPopupModal.classList.remove('info-popup-modal--active');
        e.preventDefault();
        dispatch(actions.toggleBackdrop(false));
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/internal-message',
                'POST',
                JSON.stringify({
                    msgId: infoPopupModalAcitive.id,
                    internalMessage: infoPopupModalAcitive.internalMessage,
                    firstInternalMessageDay: infoPopupModalAcitive.firstInternalMessageDay,
                    lastInternalMessageDay: infoPopupModalAcitive.lastInternalMessageDay,
                    messageToStudents: infoPopupModalAcitive.messageToStudents,
                    messageToTeachers: infoPopupModalAcitive.messageToTeachers,
                    teacherId
                }),
                { 'Content-Type': 'application/json' }
            );
            dispatch(actions.appSettings([response.settings]));
        } catch (err) {

        }
    }


    return (
        <React.Fragment>
            <Header>
                <Navigation navMessageIconActive={navMessageIconActive} />
            </Header>
            <Main mainClassName='user-main'>
                <InfoPopUpModal class={infoPopupModalAcitive && 'info-popup-modal--active'} cancelInfoPopUpModal={cancelInfoPopUpModal} textMessage={infoPopupModalAcitive && infoPopupModalAcitive.internalMessage
                } />
                <DataAdminModal classForm='add-data-modal-top' />
                <Dashboard panelFiguresTypes={panelFiguresTypes} />
                <LoadedTeacherData />
            </Main>
        </React.Fragment>
    );
};

export default TeacherEmployedPage;