import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector } from 'react-redux';

import './Side-Drawer.css';

const SideDrawer = props => {

    const archiveMode = useSelector(state => state.archive.archiveMode);

    const classes = ['side__drawer--active'];

    const portalContent = (
        <aside
            className={`side__drawer ${props.classActive && classes.join(' ')} ${archiveMode && 'side__drawer--archive'}`} onClick={props.click}>
            {props.children}
        </aside>);

    return ReactDOM.createPortal(portalContent, document.getElementById('drawer-hook'));
};

export default SideDrawer;