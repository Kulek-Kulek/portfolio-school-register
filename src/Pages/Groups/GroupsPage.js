import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Groups from '../../Components/Groups/Groups';

import './GroupsPage.css';



const GroupsPage = props => {

    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='students__main'>
                <Groups />
            </Main>
        </React.Fragment>
    );
};

export default GroupsPage;