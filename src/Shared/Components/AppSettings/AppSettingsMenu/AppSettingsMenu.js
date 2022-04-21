import React from 'react';

import AppSettMenuItem from './AppSettMenuItems/AppSettMenuItem';

import './AppSettingsMenu.css';



const AppSettingsMenu = props => {

    const menuItems = props.menuItemsList.map(item => (
        <AppSettMenuItem
            key={item.name}
            liClass={item.liClass}
            name={item.name}
        />
    ));

    return (
        <nav className='settings__nav'>
            <ul className='settings__ul'>
                {menuItems}
            </ul>
        </nav>
    );
}

export default AppSettingsMenu;