import React from 'react';


import './Dashboard.css';


const Dashboard = props => {

    const figures = props.panelFiguresTypes.map(item => (
        <figure
            key={item.id}
            className={item.class}>
            <i className={item.icon}></i>
            <span className={item.spanClass}>{item.name}</span>
        </figure>
    ));

    return (
        <React.Fragment>
            <nav className='dashboard student__dashboard'>
                {figures}
            </nav>
        </React.Fragment>
    );
}

export default Dashboard;