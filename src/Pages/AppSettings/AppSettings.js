import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import WarningModal from '../../Shared/Components/Modal/WarningModal';
import AppSettingsMenu from '../../Shared/Components/AppSettings/AppSettingsMenu/AppSettingsMenu';
import AppSettingDetail from '../../Shared/Components/AppSettings/AppSettingsDetails/AppSettingDetails';

import './AppSettings.css';

const menuItemsList = [
    {
        name: 'rok szkolny',
        liClass: 'settings__li settings__li--active'
    },
    {
        name: 'rozliczenia',
        liClass: 'settings__li'
    },
    {
        name: 'wiadomość systemowa',
        liClass: 'settings__li'
    },
    {
        name: 'rodo',
        liClass: 'settings__li'
    },
    {
        name: 'utwórz nowy kurs',
        liClass: 'settings__li'
    }
];


const AppSettings = props => {
    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='settings__main'>
                <aside className='settings__aside'>
                    <AppSettingsMenu menuItemsList={menuItemsList} />
                </aside>
                <WarningModal class='error-modal error-modal-active' />
                <AppSettingDetail />
            </Main>
        </React.Fragment>
    );
}

export default AppSettings;