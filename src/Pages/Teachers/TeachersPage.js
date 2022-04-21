import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Teachers from '../../Components/Teachers/Teachers';

import './TeachersPage.css';



const TeachersPage = props => {

    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='students__main'>
                <Teachers />
            </Main>
        </React.Fragment>
    );
};

export default TeachersPage;