import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Main from '../../Shared/Components/Main/Main';
import StatDisplay from '../../Components/Statistics/StatDisplay/StatDisplay/StatDisplay';

import './Statistics.css';


const Statistics = props => {
    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='students__main'>
                <StatDisplay />
            </Main>
        </React.Fragment>
    );
}

export default Statistics;