import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Input from '../../../Shared/Elements/Input/Input';
import Spinner from '../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../Modal/ErrorModal';
import { useForm } from '../../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_PASSWORD
} from '../../../Utility/form-validators';
import Button from '../../../Shared/Elements/Button/Button';
import { AuthContext } from '../../Context/auth-context';
import * as actions from '../../../store/actions/index';

import './AuthModal.css';



const Auth = props => {

    const auth = useContext(AuthContext);

    const authModal = useSelector(state => state.modal.authModal);

    const dispatch = useDispatch();

    const [errorModalActive, setErrorModalActive] = useState(false);
    const { loading, error, sendRequest, clearError } = useHttpClient();


    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            supervisorEmail: {
                value: '',
                checked: false,
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
        },
        false
    );



    const authSubmitHandler = async e => {
        e.preventDefault();

        let path = 'login';
        let body = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        }

        if (formState.inputs.supervisor && formState.inputs.supervisor.checked && formState.inputs.supervisorEmail.value) {
            path = 'login-supervisor';
            body = {
                supervisor: formState.inputs.supervisor.checked,
                supervisorEmail: formState.inputs.supervisorEmail.value,
                supervisorPassword: formState.inputs.password.value,
                studentEmail: formState.inputs.email.value,
            }
        }

        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + path,
                'POST',
                JSON.stringify(body),
                {
                    'Content-Type': 'application/json'
                }
            );
            dispatch(actions.toggleModal('authModal'));
            dispatch(actions.toggleBackdrop(false));
            auth.login(response.userId, response.email, response.token, response.userStatus);
        } catch (err) {
            setErrorModalActive(true);
        }
    };

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
    }

    const cancelAuthModalHandler = () => {
        dispatch(actions.toggleModal('authModal'));
        dispatch(actions.toggleBackdrop(false));
    }



    const authModalClasses = ['auth-modal', 'auth-modal--active'];

    let submitButtonDisabled = true;
    if (formState.inputs.supervisor && formState.inputs.supervisor.checked) {
        if (formState.isValid) {
            submitButtonDisabled = false;
        }
    } else {
        if (formState.inputs.email.isValid && formState.inputs.password.isValid) {
            submitButtonDisabled = false;
        }

    }

    const portalContent = (
        <React.Fragment>
            <div className={authModal ? authModalClasses.join(' ') : 'auth-modal'} >
                <ErrorModal
                    class={errorModalActive && 'error-modal--active'}
                    errorMessage={error}
                    errorHeaderMessage='Błąd logowania.'
                    btnText='Zamknij'
                    click={errorModalCancelHandler} />
                {loading ? < Spinner /> : (
                    <div className={errorModalActive ? 'auth-modal-invisible' : ''}>
                        <span className='auth-modal__info-span'>Zaloguj się do serwisu.</span>
                        <i className="fa fa-times-circle auth-modal__cancel-icon" aria-hidden="true" onClick={cancelAuthModalHandler}></i>
                        <form onSubmit={authSubmitHandler} className='auth-modal__form'>
                            <Input
                                input='input'
                                type='email'
                                placeholder='Email kursanta'
                                id='email'
                                errorText='Wprowadź poprawny adres email.'
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                                onInput={inputHandler}
                                inputWrapperClass='auth-modal__input-wrapper'
                                classInput='auth-modal__input' />

                            {formState.inputs.supervisor && formState.inputs.supervisor.checked && <Input
                                input='input'
                                type='email'
                                placeholder='Email rodzica lub przełożonego'
                                id='supervisorEmail'
                                errorText='Wprowadź poprawny adres email.'
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                                onInput={inputHandler}
                                inputWrapperClass='auth-modal__input-wrapper'
                                classInput='auth-modal__input' />}
                            <Input
                                input='input'
                                type='password'
                                placeholder='Twoje hasło'
                                id='password'
                                errorText='Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-'
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_PASSWORD()]}
                                onInput={inputHandler}
                                inputWrapperClass='auth-modal__input-wrapper'
                                classInput='auth-modal__input' />
                            <Input
                                input='input'
                                type='checkbox'
                                id='supervisor'
                                label='Jestem rodzicem / pracodawcą.'
                                validators={[VALIDATOR_REQUIRE]}
                                onInput={inputHandler}
                                inputWrapperClass='auth-modal__input-wrapper auth-modal__checkbox-div'
                                classInput='auth-modal__checkbox'
                                classLabel='auth-modal__label' />
                            <Button
                                type='submit'
                                btnText='Zaloguj'
                                disabled={submitButtonDisabled}
                                classButton={'auth-modal__login-button'}
                                arrowClassName='btn-arrow-right--active'
                            />
                        </form>
                        <Link to='/password-reset' onClick={cancelAuthModalHandler}>Nie pamiętam hasła</Link>
                    </div>
                )}
            </div>
            {(auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && <Redirect to={`/client/${auth.userId}`} />}
            {auth.userStatus === 'teacher' && <Redirect to={`/teacher/${auth.userId}`} />}
        </React.Fragment>
    );

    return ReactDOM.createPortal(portalContent, document.getElementById('auth-hook'));
};


export default Auth;