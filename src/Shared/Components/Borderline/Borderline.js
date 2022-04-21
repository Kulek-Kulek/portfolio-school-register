import React from 'react';

import './Borderline.css';

const Borderline = props => {
    return (
        <div className={`borderline ${props.classBorderline}`}></div>
    );
}

export default Borderline;