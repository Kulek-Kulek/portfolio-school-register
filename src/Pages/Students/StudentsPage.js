import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Students from '../../Components/Students/Students';

import './StudentsPage.css';



const StudentsPage = props => {

    return (
        <React.Fragment>
            <Header>
                <Navigation menuList={props.menuList} />
            </Header>
            <Main mainClassName='students__main'>
                <Students />
            </Main>
        </React.Fragment>
    );
};

export default StudentsPage;