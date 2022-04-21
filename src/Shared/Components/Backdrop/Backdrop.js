import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {

    const portalContent = <div className="backdrop" onClick={props.click}></div>;

    return ReactDOM.createPortal(portalContent, document.getElementById('backdrop-hook'));
};

export default Backdrop;
