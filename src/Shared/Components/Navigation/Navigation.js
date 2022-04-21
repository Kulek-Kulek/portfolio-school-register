import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavLinks from './NavLinks';
import SideDrawer from '../Navigation/Side-Drawer';
import Backdrop from '../../Components/Backdrop/Backdrop';
import { AuthContext } from '../../Context/auth-context';
import * as actions from '../../../store/actions/index';
import './Navigation.css';

const Navigation = props => {
    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const internalMessagesList = useSelector(state => state.adminData.appSettings[0].internalMessages);


    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const [backdropState, setBackdropState] = useState(true);

    const [loadedInternalMessagesList, setLoadedInternalMessagesList] = useState();

    useEffect(() => {
        setLoadedInternalMessagesList(internalMessagesList);
    }, [internalMessagesList]);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    const openMessagesListHandler = e => {
        setBackdropState(backdropState => !backdropState);
        const internalMessagesList = [...document.querySelectorAll('.info-popup-modal__ham-nav-msg-div')];
        if (internalMessagesList) {

            internalMessagesList.forEach(el => el.classList.toggle('info-popup-modal__ham-nav-msg-div--active'));
            dispatch(actions.toggleBackdrop(backdropState));
        }

    }


    const singleMessageDisplayHandler = e => {
        const clickedMessageId = e.target.id;
        const messagesList = [...loadedInternalMessagesList];
        for (let msg of messagesList) {
            if (msg.id === clickedMessageId) {
                if (msg.isDisplayed) {
                    msg.isDisplayed = false;
                } else {
                    msg.isDisplayed = true;
                }
                const index = messagesList.findIndex(msg => msg.id === clickedMessageId);
                messagesList.splice(index, 1, msg);
            }
        }
        setLoadedInternalMessagesList(messagesList);
    }


    let internalMessages;
    if (loadedInternalMessagesList && loadedInternalMessagesList.length > 0) {

        const upToDateMessage = loadedInternalMessagesList.filter(msg => new Date(msg.firstInternalMessageDay) <= new Date() && new Date(msg.lastInternalMessageDay) >= new Date() && msg.messageToTeachers === true);

        internalMessages = upToDateMessage.map(msg => (
            <p key={msg.id} id={msg.id} className={`info-popup-modal__nav-msg ${msg.isDisplayed && 'info-popup-modal__nav-msg--active'}`} onClick={singleMessageDisplayHandler}>{!msg.isDisplayed ? msg.internalMessage.slice(0, 30) + ' ...' : msg.internalMessage}{msg.isDisplayed && <span className='info-popup-modal__nav-expiry-date'>{'Ta wiadomość będzie widoczna do ' + (new Date(msg.lastInternalMessageDay).toLocaleDateString().length < 10 ? '0' + new Date(msg.lastInternalMessageDay).toLocaleDateString() : new Date(msg.lastInternalMessageDay).toLocaleDateString())}</span>}</p>
        ));
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop click={closeDrawerHandler} />}
            <SideDrawer
                classActive={drawerIsOpen && true}
                click={closeDrawerHandler}
            >
                <nav className='navigation__sideDrawer'>
                    <NavLinks menuList={props.menuList} />
                </nav>
            </SideDrawer>

            <button className='nav__hamburger'>
                {(auth.userStatus === 'teacher' || auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && <div className='info-popup-modal__ham-nav-div'>
                    <i className={`far fa-comments info-popup-modal__nav-i ${props.navMessageIconActive && 'info-popup-modal__nav-i--active'}`} onClick={openMessagesListHandler}></i>
                    <div className='info-popup-modal__ham-nav-msg-div'>
                        {internalMessages}
                    </div>
                </div>}
                <div className='nav__hamburger-wrapper' onClick={drawerIsOpen ? closeDrawerHandler : openDrawerHandler}>
                    <div className={'nav__hamburger-span'}>
                        <span className='nav__haburger-snail'></span>
                    </div>
                    <div className={'nav__hamburger-span'}>
                        <span className='nav__haburger-snail'></span>
                    </div>
                    <div className={'nav__hamburger-span'}>
                        <span className='nav__haburger-snail'></span>
                    </div>
                </div>
            </button>
            <nav className={`navigation ${props.navClassName} ${archiveMode && 'navigation--archive'}`}>
                <NavLinks
                    menuList={props.menuList}
                    navMessageIconActive={props.navMessageIconActive}
                    internalMessagesList={internalMessagesList} />
                {(auth.userStatus === 'teacher' || auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && <div className='info-popup-modal__ham-nav-div'>
                    <i className={`far fa-comments info-popup-modal__nav-i ${props.navMessageIconActive && 'info-popup-modal__nav-i--active'}`} onClick={openMessagesListHandler}></i>
                    <div className='info-popup-modal__ham-nav-msg-div'>
                        {internalMessages}
                    </div>
                </div>}
            </nav>
        </React.Fragment>
    );
};

export default Navigation;