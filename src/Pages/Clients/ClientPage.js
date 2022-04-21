import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Dashboard from '../../Components/ClientComponents/Dashboard';
import StudentInfoType from '../../Components/ClientComponents/StudentInfoType';
import InfoPopUpModal from '../../Shared/Components/Modal/InfoPopUpModal';
import { changeActiveStudentInfoType } from '../../Components/ClientComponents/changeActiveStudentInfoType';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';

import './ClientPage.css';


const ClientPage = props => {
    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const studentId = useParams().userId;

    const [infoPopupModalAcitive, setInfoPopupModalAcitive] = useState();

    const { sendRequest } = useHttpClient();

    const activeMessages = useSelector(state => state.adminData.appSettings[0].internalMessages);

    const panelFiguresTypes = [
        {
            name: auth.userStatus === 'HeadTeacher' ? 'o uczniu' : 'o tobie',
            id: 'generalStudentInfo',
            icon: 'fas fa-user-graduate student__dashboard-i student__dashboard-i--active',
            class: 'dashboard student__dashboard-figure student__dashboard-figure--active',
            spanClass: 'student__dashboard-span'
        },
        {
            name: auth.userStatus === 'HeadTeacher' ? 'postępy ucznia' : 'twoje zajęcia',
            id: 'studentLessonsInfo',
            icon: 'fas fa-book-reader student__dashboard-i',
            class: 'dashboard student__dashboard-figure',
            spanClass: 'student__dashboard-span'
        },
        {
            name: auth.userStatus === 'HeadTeacher' ? 'finanse ucznia' : 'twoje finanse',
            id: 'studentFinanceInfo',
            icon: 'fas fa-piggy-bank student__dashboard-i',
            class: 'dashboard student__dashboard-figure',
            spanClass: 'student__dashboard-span'
        }
    ];

    useEffect(() => {
        changeActiveStudentInfoType();
    }, []);


    useEffect(() => {
        if (activeMessages && activeMessages.length > 0) {
            const today = new Date();
            let expiryDate;
            let startDate;

            for (let msg of activeMessages) {
                expiryDate = new Date(msg.lastInternalMessageDay);
                startDate = new Date(msg.firstInternalMessageDay);

                if (msg.messageToStudents && msg.readBy && msg.readBy.length > 0 && studentId && expiryDate >= today && startDate <= today) {
                    const clearedReadBy = msg.readBy.filter(s => s === studentId);
                    if (clearedReadBy.length > 0) {
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

                if (msg.messageToStudents && expiryDate >= today && startDate <= today && (!msg.readBy || (msg.readBy && msg.readBy.length === 0))) {
                    setTimeout(() => {
                        const infoPopupModal = document.querySelector('.info-popup-modal');
                        infoPopupModal.classList.add('info-popup-modal--active');
                        setInfoPopupModalAcitive(msg);
                        dispatch(actions.toggleBackdrop(true));
                    }, 2000);
                }
            }
        }
    }, [activeMessages, dispatch, studentId]);


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
                    studentId
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
                <Navigation />
            </Header>
            <Main mainClassName='user-main'>
                <InfoPopUpModal class={infoPopupModalAcitive && 'info-popup-modal--active'} cancelInfoPopUpModal={cancelInfoPopUpModal} textMessage={infoPopupModalAcitive && infoPopupModalAcitive.internalMessage
                } />
                <Dashboard panelFiguresTypes={panelFiguresTypes} />
                <StudentInfoType />
            </Main>
        </React.Fragment>
    );
};

export default ClientPage;