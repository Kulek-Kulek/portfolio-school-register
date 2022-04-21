import React from 'react';

import Button from '../Button/Button';
import './AddToBasedate.css';

const AddToDatebase = props => {
    return (
        <React.Fragment>
            <Button
                btnText={props.btnText}
                classButton={props.classButton}
                click={props.click}
                iconClass={props.iconClass}
            />
        </React.Fragment>
    );
}

export default AddToDatebase;