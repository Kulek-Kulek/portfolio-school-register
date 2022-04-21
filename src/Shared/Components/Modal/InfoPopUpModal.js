import React from 'react';

import Button from '../../Elements/Button/Button';
import img from '../../../images/modal/internalPopUpModal.jpg';

import './InfoPopUpModal.css';



const InfoPopUpModal = props => {

    return (
        <div className={`info-popup-modal ${props.class}`} >
            <header className='info-popup-modal__heading'>
                <img className='info-popup-modal__img' src={img} alt='noticeboard' />
                <p className='info-popup-modal__heading-title'>Nowa wiadomość!</p>
            </header>
            <p className='info-popup-modal__msg'>{props.textMessage}</p>
            <Button
                classButton='info-popup-modal__btn'
                click={props.cancelInfoPopUpModal}
                btnText='zamknij' />
        </div>
    );
}

export default InfoPopUpModal;