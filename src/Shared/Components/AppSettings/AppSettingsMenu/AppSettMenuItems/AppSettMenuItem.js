import React from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../../../../store/actions/index';
import './AppSettMenuItem.css';


const AppSettMenuItem = props => {

    const dispatch = useDispatch();

    const toggleSettingDetailsHandler = (e) => {
        let menuNameItem;
        switch (e.target.id) {
            case 'rok szkolny':
                menuNameItem = 'schoolYearSchedlue';
                break;
            case 'rodo':
                menuNameItem = 'rodo';
                break;
            case 'rozliczenia':
                menuNameItem = 'bankAccount';
                break;
            case 'wiadomość systemowa':
                menuNameItem = 'internalMessage';
                break;
            case 'utwórz nowy kurs':
                menuNameItem = 'courses';
                break;
            default: menuNameItem = 'schoolYearSchedlue';
        }
        const menuItems = [...document.querySelectorAll('.settings__li')];
        const activeItemIndex = menuItems.findIndex(item => item.classList.contains('settings__li--active'));

        menuItems[activeItemIndex].classList.remove('settings__li--active');
        const clickedItem = document.getElementById(e.target.id);
        clickedItem.classList.add('settings__li--active');
        dispatch(actions.settingsInfoType(menuNameItem));
    }

    return (
        <li
            className={props.liClass}
            id={props.name}
            onClick={toggleSettingDetailsHandler}
        >
            {props.name}
        </li>
    );
}

export default AppSettMenuItem;