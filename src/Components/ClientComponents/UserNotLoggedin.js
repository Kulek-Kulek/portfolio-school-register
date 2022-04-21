import React from 'react';

import './UserNotLoggedin.css';


const UserNotLoggedin = props => {
    return (
        <React.Fragment>
            <div className='partners'>
                <p className='partners__warning'>zaloguj się, żeby korzystać z tej części serwisu</p>
            </div>
        </React.Fragment>
    );
};

export default UserNotLoggedin;