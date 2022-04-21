import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../Shared/Elements/Input/Input';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import { useForm } from '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_PASSWORD
} from '../../Utility/form-validators';
import Button from '../../Shared/Elements/Button/Button';
import Main from '../../Shared/Components/Main/Main';
import './PasswordReset.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';


const PasswordReset = props => {

    const token = useParams().token;
    const userType = useParams().userType;

    const [errorModalActive, setErrorModalActive] = useState(false);
    const { loading, error, sendRequest, clearError, status } = useHttpClient();
    const [redirect, setRedirect] = useState(false);
    const [userId, setUserId] = useState();

    const dispatch = useDispatch();

    const [formState, inputHandler] = useForm(
        {
            updatedPassword: {
                value: '',
                isValid: false
            },
            repeatedUpdatedPassword: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        const fetchData = async () => {
            const path = userType === 'user' ? 'login' : 'login-supervisor';
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `${path}/password-reset/${token}`);
                setUserId(responseData.userId);
            } catch (err) {
                dispatch(actions.toggleBackdrop(true));
                setErrorModalActive(true);
            }
        }
        fetchData();
    }, [dispatch, sendRequest, token, userType]);


    const changePasswordHandler = async e => {
        e.preventDefault();
        const password = formState.inputs.updatedPassword.value;
        const repeatedPassword = formState.inputs.repeatedUpdatedPassword.value;
        const path = userType === 'user' ? 'login' : 'login-supervisor';
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `${path}/password-reset/${token}`,
                'POST',
                JSON.stringify({
                    updatedPassword: password === repeatedPassword ? password : null,
                    userId
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
        setRedirect(true);
        dispatch(actions.toggleModal('authModal'));
    }

    return (
        <Main mainClassName='password-reset'>
            {errorModalActive && <ErrorModal
                class={errorModalActive && 'error-modal--active basket__error-modal'}
                errorMessage={status ? 'Hasło zostało zmienione.' : error}
                errorHeaderMessage={status ? 'Zaloguj się korzystając z nowego hasła.' : 'Upss. Coś poszło nie tak.'}
                btnText='Zamknij'
                click={errorModalCancelHandler}
                status={status} />}
            <div className='password-reset__div'>
                {loading ? <Spinner /> :
                    <React.Fragment>
                        <Input
                            input='input'
                            type='password'
                            placeholder='Nowe hasło'
                            id='updatedPassword'
                            errorText='Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. !,?,#.'
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
                            onInput={inputHandler}
                            inputWrapperClass='password-reset__email-div'
                            classInput='password-reset__email'
                            classError='password-reset__email-error'
                        />
                        <Input
                            input='input'
                            type='password'
                            placeholder='Powtórz hasło'
                            id='repeatedUpdatedPassword'
                            errorText='Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. !,?,#.'
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
                            onInput={inputHandler}
                            inputWrapperClass='password-reset__email-div'
                            classInput='password-reset__email'
                            classError='password-reset__email-error'
                        />
                        <span className='password-reset__conditions'>Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-</span>
                        <Button
                            btnText='Resetuj hasło'
                            classButton='password-reset__button'
                            type='submit'
                            click={changePasswordHandler}
                            disabled={!formState.isValid || !(formState.inputs.repeatedUpdatedPassword.value === formState.inputs.updatedPassword.value)} />
                    </React.Fragment>
                }
            </div>
            {redirect && <Redirect to='/' />}
        </Main>
    );
}

export default PasswordReset;