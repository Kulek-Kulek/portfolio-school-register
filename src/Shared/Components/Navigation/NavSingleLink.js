import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavSingleLink.css';

const NavSingleLink = props => {

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const navLink = <li className={'navigation__li ' + props.navLinkClass} onClick={props.clickLink}>

        <NavLink className={`${archiveMode ? 'navigation__link navigation__link--archive' : 'navigation__link'}`} to={props.path}
            exact={props.exact ? props.exact : false}
        >
            {props.name ? props.name : <i className={props.iconClass} onClick={props.click}></i>}
        </NavLink>
    </li>

    return (
        navLink
    );
};

export default NavSingleLink;