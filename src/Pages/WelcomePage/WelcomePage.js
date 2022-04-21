import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import * as actions from '../../store/actions/index';
import './WelcomePage.css';


const WelcomePage = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchSettings());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='welcome__main'>
                <span className='welcome__welcome-log'>zaloguj się by korzystać z serwisu</span>
            </Main>
        </React.Fragment>
    );
}

export default WelcomePage;