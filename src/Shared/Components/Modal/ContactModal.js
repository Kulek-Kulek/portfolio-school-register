import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../Elements/Input/Input';
import { useForm } from '../../Hooks/form-hook';
import { useHttpClient } from '../../../Shared/Hooks/http-hook';
import { dataType } from '../../../Utility/dataModalData';
import ErrorModal from '../../../Shared/Components/Modal/ErrorModal';
import Spinner from '../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import Button from '../../Elements/Button/Button';
import Logo from '../Logo/Logo';
import * as actions from '../../../store/actions/index';
import './ContactModal.css';

const ContactModal = props => {

    const contactModal = useSelector(state => state.modal.contactModal);

    const dispatch = useDispatch();

    const { loading, error, status, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        contactName: {
            value: '',
            isValid: false
        },
        contactEmail: {
            value: '',
            isValid: false
        },
        contactTel: {
            value: '',
            isValid: false
        },
        contactTextarea: {
            value: '',
            isValid: true
        }
    },
        false
    );


    const modalDataSubmitHandler = async e => {
        e.preventDefault();
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + 'contact',
                'POST',
                JSON.stringify({
                    contactName: formState.inputs.contactName.value,
                    contactMobile: formState.inputs.contactTel.value,
                    contactEmail: formState.inputs.contactEmail.value,
                    contactComment: formState.inputs.contactTextarea.value,
                }),
                {
                    'Content-Type': 'application/json'
                })
            setErrorModalActive(true);
            dispatch(actions.errorModalActivator(true, error));
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.errorModalActivator(true, error));

        }
    };

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.errorModalActivator(false, error));
        status && dispatch(actions.toggleContactModal('contactModal'));
    }

    let data;
    if (props.infoType) {
        data = (
            Object.keys(dataType[props.infoType]).map((item, index) =>
                < React.Fragment key={index}>
                    <Input
                        input={dataType[props.infoType][item].input}
                        id={dataType[props.infoType][item].id}
                        name={dataType[props.infoType][item].name}
                        type={dataType[props.infoType][item].type}
                        placeholder={dataType[props.infoType][item].placeholder}
                        label={dataType[props.infoType][item].label}
                        onInput={inputHandler}
                        validators={dataType[props.infoType][item].validators}
                        errorText={dataType[props.infoType][item].errorText}
                        classInput={dataType[props.infoType][item].class}
                        inputWrapperClass={dataType[props.infoType][item].inputWrapperClass}
                        initialIsValid={dataType[props.infoType][item].initialIsValid}
                    />
                </ React.Fragment>
            )
        )
    };


    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                errorModalActive ? <ErrorModal
                    class={errorModalActive && 'error-modal--active basket__error-modal'}
                    errorMessage={status ? 'Dziękujemy za wysłanie formularza. Skontaktujemy się z Tobą w ciągu jednego dnia.' : `${error}. Skontaktuj się z nami telefonicznie lub mailowo. Wszystkie dane kontaktowe podane są na dole strony.`}
                    errorHeaderMessage={status ? 'Twój fromularz został wysłany.' : 'Nie udało mi się wysłać tego formularza.'}
                    btnText='Zamknij'
                    click={errorModalCancelHandler}
                    status={status}
                /> : (
                    <div className={`pop-up-modal ${contactModal && 'pop-up-modal--active'}`}>
                        <div className={'pop-up-modal__top'}>
                            <div className='pop-up-modal__logo'>
                                <Logo logo='pop-up-modal__logo-div' pink='pop-up-modal__logo-pink' />
                            </div>
                            <div className='pop-up-modal__contact-data'>
                                <div className='footer__contact-details pop-up-modal__contact-details'>
                                    <div className='footer__info-div pop-up-modal__info-div'>
                                        <i className="fas fa-phone footer__i"></i>
                                        <span className='footer__info-span pop-up-modal__info-span'>500 097 398</span>
                                    </div>
                                    <div className='footer__info-div pop-up-modal__info-div'>
                                        <i className="fas fa-hourglass-end footer__i"></i>
                                        <span className='footer__info-span pop-up-modal__info-span'>Pn-So: 08.00 - 21.00</span>
                                    </div>
                                    <div className='footer__info-div pop-up-modal__info-div'>
                                        <i className="fas fa-envelope footer__i"></i>
                                        <span className='footer__info-span pop-up-modal__info-span'>lugowski.k@gmail.com</span>
                                    </div>
                                    <div className='footer__info-div pop-up-modal__info-div'>
                                        <i className="far fa-lightbulb footer__i"></i>
                                        <span className='footer__info-span pop-up-modal__info-span'>Sprawy pilne: 24/7</span>
                                    </div>
                                    <div className='footer__info-div pop-up-modal__info-div'>
                                        Przyjemność z uczenia się
                                        <div className='pop-up-modal__underline'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'pop-up-modal__inputs'}>
                            {data}
                        </div>
                        <div className='pop-up-modal__buttons'>
                            <Button
                                btnText='Anuluj'
                                btn='pop-up-modal__button'
                                arrowClassName='btn-arrow-right--active'
                                click={() => dispatch(actions.toggleContactModal('contactModal'))} />
                            <Button
                                btnText='Wyślij'
                                type='submit'
                                btn='pop-up-modal__button'
                                arrowClassName='btn-arrow-right--active'
                                click={modalDataSubmitHandler}
                                disabled={!formState.isValid} />
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
}


export default ContactModal;