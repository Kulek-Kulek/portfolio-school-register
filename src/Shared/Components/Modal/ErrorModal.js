import React from 'react';


import Button from '../../Elements/Button/Button';
import './ErrorModal.css';

const ErrorModal = props => {
  return (
    <div className={`error-modal ${props.class}`} >
      <header className={props.status ? ['error-modal__header', 'error-modal__header-ok'].join(' ') : 'error-modal__header'}>
        <p>{props.errorHeaderMessage}</p>
      </header>
      <p className='error-modal__message'>{props.errorMessage}</p>
      <Button
        classButton='error-modal__button'
        click={props.click}
        btnText={props.btnText || 'zamknij'} />
    </div>
  );
};

export default ErrorModal;
