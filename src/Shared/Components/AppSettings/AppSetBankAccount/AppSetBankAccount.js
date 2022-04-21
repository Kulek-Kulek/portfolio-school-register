import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../Elements/Input/Input';
import Button from '../../../Elements/Button/Button';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Components/Modal/ErrorModal';
import { useHttpClient } from '../../../Hooks/http-hook';
import { useForm } from '../../../Hooks/form-hook';
import {
    VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH
} from '../../../../Utility/form-validators.js';
import * as actions from '../../../../store/actions/index';

import './AppSetBankAccount.css';


const AppSettBankAccount = props => {

    const dispatch = useDispatch();

    const currentSettings = useSelector(state => state.adminData.appSettings[0]);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        setBankAccount: {
            value: null,
            isValid: false
        },
        setGracePeriod: {
            value: null,
            isValid: false
        }
    },
        false
    );


    const setSettingsSchedlueHandler = async e => {
        e.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/bankaccount',
                'POST',
                JSON.stringify({
                    setBankAccount: formState.inputs.setBankAccount.value.length > 0 ? formState.inputs.setBankAccount.value : undefined,
                    setGracePeriod: formState.inputs.setGracePeriod.value.length > 0 ? formState.inputs.setGracePeriod.value : undefined
                }),
                { 'Content-Type': 'application/json' }
            );
            dispatch(actions.appSettings([response.settings]));
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }


    let buttonDisabled = true;
    if (formState.isValid) {
        buttonDisabled = false;
    }
    if (formState.inputs.setBankAccount.isValid === false && formState.inputs.setGracePeriod.isValid === true) {
        buttonDisabled = false;
    }
    if (formState.inputs.setBankAccount.isValid && formState.inputs.setGracePeriod.isValid === false) {
        buttonDisabled = false;
    }
    if (formState.inputs.setBankAccount.value && formState.inputs.setBankAccount.value.length > 0 && formState.inputs.setBankAccount.isValid === false) {
        buttonDisabled = true;
    }
    if (formState.inputs.setGracePeriod.value && formState.inputs.setGracePeriod.value.length > 0 && formState.inputs.setGracePeriod.isValid === false) {
        buttonDisabled = true;
    }


    return (
        <React.Fragment>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='settings__details-wrap settings__details-wrap--active settings'>
                <div className='settings__settings settings__bankaccount-settings'>
                    <p className='settings__title'>Ustaw numer rachunku bankowego</p>
                    <p className='settings__desc'>Ustaw numer rachunku bankowego by Klienci wiedzieli gdzie dokonywać płatności, jeśli nie chcą korzystać z płatności online w tej aplikacji. To może, ale nie musi być ten sam numer rachunku, który funkcjonuje przy płatnościach online.<br /><br />Ustaw "Grace period", czyli liczbę dni liczonych od daty płatności wystawionego rachunku. Po tym czasie system automatycznie wychwyci niezapłacone rachunki i roześle wiadomości e-mail i SMSy wzywające do zapłaty zaległości, Czynność ta będzie powtarzana co kolejne 5 dni, jeśli pierwsza wiadmość została zignorowana. <br />Fabryczne ustawienia "grace period" to 7 dni.</p>
                    {loading ? <Spinner /> :
                        <form className='settings__inputs-form' onSubmit={setSettingsSchedlueHandler}>
                            <Input
                                input='input'
                                type='number'
                                id='setBankAccount'
                                label='Twój numer rachunku bankowego'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(26), VALIDATOR_MAXLENGTH(26)]}
                            />
                            <Input
                                input='input'
                                type='number'
                                id='setGracePeriod'
                                label='Dni liczone od daty płatności rachunku.'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(3)]}
                            />
                            <Button
                                btnText='Zatwierdź'
                                type='submit'
                                classButton='settings__btn settings__bankaccount-btn'
                                disabled={buttonDisabled}
                            />
                        </form>
                    }
                </div>
                <div className='settings__current'>
                    <p className='settings__title settings__set-title'>Aktualne ustawienia</p>
                    <div className='settings__set-data settings__set-data-bankaccount'>
                        <p className='settings__set-p settings__set-p-bank-account'>Aktualny numer rachunku:
                        </p>
                        <span className='settings__set-span settings__set-span-bankaccount'>{currentSettings.bankAccount}</span>
                    </div>
                    <div className='settings__set-data settings__set-data-bankaccount'>
                        <p className='settings__set-p settings__set-p-bank-account'>Udzielony grace period:
                        </p>
                        <span className='settings__set-span settings__set-span-bankaccount'>{currentSettings.gracePeriod}<span className='clear-settings'>dni</span></span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppSettBankAccount;