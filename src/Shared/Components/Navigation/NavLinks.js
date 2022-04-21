import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavSingleLink from './NavSingleLink';
import Button from '../../Elements/Button/Button';
import { AuthContext } from '../../Context/auth-context';
import * as actions from '../../../store/actions/index';
import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const changeArchiveMode = () => {
        dispatch(actions.archiveMode(!archiveMode));
    }



    let menuList = [];
    if (auth.userStatus === 'HeadTeacher') {
        menuList = [
            { iconClass: "fas fa-cogs navigation__settings-i", path: '/admin/settings', type: 'settings', navLinkClass: archiveMode && 'finance-dashboard__btn--hide' },
            // { name: 'zamówienia', path: '/admin/orders', exact: true, type: 'orders', navLinkClass: archiveMode && 'finance-dashboard__btn--hide' },
            { name: 'WYJDŹ Z ARCHIWUM', path: '/admin/students', type: '', clickLink: changeArchiveMode, navLinkClass: !archiveMode && 'finance-dashboard__btn--hide' },
            { name: 'uczniowie', path: `${!archiveMode ? '/admin/students' : '/admin/archive/students'}`, type: 'students' },
            { name: 'grupy', path: `${!archiveMode ? '/admin/groups' : '/admin/archive/groups'}`, type: 'groups' },
            { name: 'lektorzy', path: `${!archiveMode ? '/admin/teachers' : '/admin/archive/teachers'}`, type: 'teachers' },
            { name: 'archiwum', path: '/admin/archive/students', type: 'archive', clickLink: changeArchiveMode, navLinkClass: archiveMode && 'finance-dashboard__btn--hide' }
        ];
    }
    else if (auth.userStatus === 'student' || auth.userStatus === 'Supervisor') {
        menuList = [

        ];
    }

    let navigation;
    if (props.menuList && props.menuList.length > 0) {
        navigation = props.menuList
    } else {
        navigation = menuList;
    }

    const navLinks = navigation.map(link => (
        <NavSingleLink
            key={link.name || Math.random()}
            path={link.path}
            name={link.name}
            iconClass={link.iconClass}
            exact={link.exact}
            authenticated={link.authenticated}
            click={link.click}
            clickLink={link.clickLink}
            type={link.type}
            navLinkClass={link.navLinkClass}
        />
    ));

    const loginButtonHandler = () => {
        dispatch(actions.toggleModal('authModal'));
        dispatch(actions.toggleBackdrop(true));
    }

    const logoutButtonHandler = () => {
        auth.logout();
        dispatch(actions.toggleBackdrop(false));
        window.location.reload();
    }

    const loginButton = (
        <Button
            btnText={!auth.isLoggedIn ? 'zaloguj' : 'wyloguj'}
            classButton={`navigation__list-button ${auth.isLoggedIn && 'navigation__list-button--logout'}`}
            arrowClassName='btn-arrow-right--active'
            click={auth.isLoggedIn ? logoutButtonHandler : loginButtonHandler}
        />
    );

    let backTo = process.env.REACT_APP_COMPANY_NAME;
    if (process.env.REACT_APP_COMPANY_NAME.length < 5) {
        backTo = `Wróć do ${process.env.REACT_APP_COMPANY_NAME}`;
    }


    return (
        <React.Fragment>
            <ul className={`${auth.userStatus === 'HeadTeacher' ? 'navigation__list' : ['navigation__list', 'navigation__list-clients'].join(' ')}`}>
                {!auth.isLoggedIn && <a href={process.env.REACT_APP_COMPANY_PAGE_URL} className='navigation__a-back-to-school'>{backTo}</a>}
                {navLinks}
                {loginButton}
            </ul>

        </React.Fragment>
    );
};


export default NavLinks;