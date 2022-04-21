import React, { useState } from 'react';

import Input from '../../Shared/Elements/Input/Input';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import { useForm } from '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL
} from '../../Utility/form-validators';
import Button from '../../Shared/Elements/Button/Button';
import Main from '../../Shared/Components/Main/Main';
import './PasswordReset.css';
import { Redirect } from 'react-router-dom';



const PasswordReset = props => {


    const [errorModalActive, setErrorModalActive] = useState(false);
    const { loading, error, sendRequest, clearError, status } = useHttpClient();
    const [redirect, setRedirect] = useState(false);

    const [formState, inputHandler] = useForm(
        {
            emailPasswordReset: {
                value: '',
                isValid: false
            },
            parentPasswordResetCheckbox: {
                value: '',
                checked: false,
                isValid: true
            },
        },
        false
    );


    const changePasswordHandler = async e => {
        e.preventDefault()
        try {
            const path = formState.inputs.parentPasswordResetCheckbox.checked ? 'login-supervisor/password-reset-parent' : 'login/password-reset';
            await sendRequest(process.env.REACT_APP_BACKEND_URL + path,
                'POST',
                JSON.stringify({
                    email: formState.inputs.emailPasswordReset.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            setErrorModalActive(true);
        } catch (err) {
            setErrorModalActive(true);
        }
    }


    const errorModalCancelHandler = () => {
        clearError();
        setErrorModalActive(false);
        status && setRedirect(true);
    }
    return (
        <Main mainClassName='password-reset'>
            {errorModalActive && <ErrorModal
                class={errorModalActive && 'error-modal--active basket__error-modal'}
                errorMessage={status ? 'Raz, dwa, trzy i poszło. Kliknij w wysłany link, zmień hasło i korzystaj z serwisu. WAŻNE - link będzie aktywny przez 30 minut. Nie doszło? Sprawdź folder SPAM.' : error}
                errorHeaderMessage={status ? 'Link do zmiany hasła został wysłany na podany adres email.' : 'Upss. Coś poszło nie tak.'}
                btnText='Zamknij'
                click={errorModalCancelHandler}
                status={status} />}
            <div className='password-reset__div'>
                {loading ? <Spinner /> :
                    <React.Fragment>
                        <Input
                            input='input'
                            type='email'
                            placeholder='Podaj swój adress email'
                            id='emailPasswordReset'
                            errorText='Wprowadź poprawny adres email.'
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                            onInput={inputHandler}
                            inputWrapperClass='password-reset__email-div'
                            classInput='password-reset__email' />
                        <Input
                            input='input'
                            type='checkbox'
                            id='parentPasswordResetCheckbox'
                            label='Jestem rodzicem / pracodawcą.'
                            validators={[VALIDATOR_REQUIRE]}
                            onInput={inputHandler}
                            inputWrapperClass='auth-modal__input-wrapper auth-modal__checkbox-div auth-modal__password-reset'
                            classInput='auth-modal__checkbox'
                            classLabel='auth-modal__label' />
                        <Button
                            btnText='Resetuj hasło'
                            classButton='password-reset__button'
                            type='submit'
                            click={changePasswordHandler} />
                    </React.Fragment>
                }
            </div>
            {redirect && <Redirect to='/' />}
        </Main>
    );
}

export default PasswordReset;