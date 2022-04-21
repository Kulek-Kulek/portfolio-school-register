import React from 'react';


import './Main.css';

const Main = props => {
    return <main className={`main ${props.mainClassName}`}>{props.children}</main>;
}

export default Main;