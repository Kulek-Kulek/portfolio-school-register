import React from 'react';

import Header from '../../Shared/Components/MainHeader/MainHeader';
import Main from '../../Shared/Components/Main/Main';
import Navigation from '../../Shared/Components/Navigation/Navigation';
import Orders from '../../Components/Orders/Orders';

import './OrdersPage.css';



const OrdersPage = props => {

    return (
        <React.Fragment>
            <Header>
                <Navigation />
            </Header>
            <Main mainClassName='orders__main'>
                <Orders />
            </Main>
        </React.Fragment>
    );
};

export default OrdersPage;