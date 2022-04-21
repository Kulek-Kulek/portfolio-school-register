import React from 'react';


import './MainHeader.css';

const MainHeader = props => {
    return (
        <header className={props.headerClassName}>
            {props.children}
        </header>
    );
}

export default MainHeader;