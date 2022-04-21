import React from 'react';
import { Link } from 'react-router-dom';


import Button from '../Button/Button';

const LinkElement = props => {
    return (
        <Link
            to={props.to}
            className={props.className}
            onClick={props.click}>
            <Button
                btn={props.btn}
                classButton={props.classButton}
                btnText={props.btnText}
                arrowClassName={props.arrowClassName} />
        </Link>
    );
}

export default LinkElement;