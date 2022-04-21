import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button
            onClick={props.click}
            type={props.type}
            className={`button ${props.classButton}`}
            disabled={props.disabled}
            id={props.id}
            name={props.name}
            value={props.value}>
            <i className={props.iconClass} id={props.email}></i>
            {props.btnText}
            <i className={`fas fa-long-arrow-alt-right btn-arrow-right ${props.arrowClassName}`}></i>
        </button>
    );
}

export default Button;