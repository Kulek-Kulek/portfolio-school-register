import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../Elements/Input/Input';
import Button from '../../../Elements/Button/Button';
import Spinner from '../../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Components/Modal/ErrorModal';
import { useHttpClient } from '../../../Hooks/http-hook';
import { useForm } from '../../../Hooks/form-hook';
import {
    VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH
} from '../../../../Utility/form-validators.js';
import * as actions from '../../../../store/actions/index';

import './AppSettInternalMessage.css';


const AppSettInternalMessage = props => {

    const dispatch = useDispatch();

    const activeMessages = useSelector(state => state.adminData.appSettings[0].internalMessages);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        newInternalMessage: {
            value: null,
            isValid: false
        },
        firstInternalMessageDay: {
            value: null,
            isValid: false
        },
        lastInternalMessageDay: {
            value: null,
            isValid: false
        },
        sendInternalMessageTeachers: {
            value: null,
            isValid: false
        },
        sendInternalMessageStudents: {
            value: null,
            isValid: false
        }
    },
        false
    );

    const setSettingsSchedlueHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/internal-message',
                'POST',
                JSON.stringify({
                    internalMessage: formState.inputs.newInternalMessage.value,
                    firstInternalMessageDay: new Date(formState.inputs.firstInternalMessageDay.value).toISOString(),
                    lastInternalMessageDay: new Date(formState.inputs.lastInternalMessageDay.value).toISOString(),
                    messageToStudents: formState.inputs.sendInternalMessageStudents.value ? formState.inputs.sendInternalMessageStudents.value : false,
                    messageToTeachers: formState.inputs.sendInternalMessageTeachers.value ? formState.inputs.sendInternalMessageTeachers.value : false
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


    let messages = <p>Brak danych</p>
    if (activeMessages && activeMessages.length > 0) {
        messages = activeMessages.map(message => (
            <div key={message.id} className='settings__internal-msg'>
                <p className='settings__internal-msg-date'>
                    {'Aktywna ' + (new Date(message.firstInternalMessageDay).toLocaleDateString().length < 10 ? '0' + new Date(message.firstInternalMessageDay).toLocaleDateString() : new Date(message.firstInternalMessageDay).toLocaleDateString()) + ' - ' + (new Date(message.lastInternalMessageDay).toLocaleDateString().length < 10 ? '0' + new Date(message.lastInternalMessageDay).toLocaleDateString() : new Date(message.lastInternalMessageDay).toLocaleDateString())}
                </p>
                <p className='settings__internal-msg-text'><span className='settings__internal-msg-span'>Twoja wiadomo????:</span>{message.internalMessage}</p>
            </div>
        ))
    }


    return (
        <React.Fragment>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='B????d sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='settings__details-wrap settings__details-wrap--active settings'>
                <div className='settings__settings'>
                    <p className='settings__title'>Ustaw wewn??trzn?? wiadmo????</p>
                    <p className='settings__desc'>Mo??esz wysy??a?? wiadomo??ci w systemie do lektor??w lub/i uczni??w. Mog?? to by?? np. informacje organizacyjne, ??yczenia ??wi??teczne lub wiadomo??ci marketingowe. B??d?? one widziane przez WSZYSTKICH adresat??w tylko po zalogowaniu si?? na swoje konto i tylko w ramach czasowych przez ciebie okre??lonych. Je??li natomiast chcesz wys??a?? wiadomo???? prywatn??, wy??lij email lub SMS.</p>
                    {loading ? <Spinner /> :
                        <form className='settings__inputs-form settings__course-inputs-form' onSubmit={setSettingsSchedlueHandler}>
                            <Input
                                id='newInternalMessage'
                                placeholder='Napisz now?? wiadomo????.'
                                rows={5}
                                inputWrapperClass='settings__course-input-div'
                                classInput='settings__course-textarea'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(5)]}
                            />
                            <div className='settings__course-number-inputs-div'>
                                <Input
                                    input='input'
                                    type='date'
                                    id='firstInternalMessageDay'
                                    label='Widoczna od'
                                    inputWrapperClass='settings__course-input-div'
                                    classLabel='settings__label'
                                    classInput='settings__input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                                <Input
                                    input='input'
                                    type='date'
                                    id='lastInternalMessageDay'
                                    label='Wy??wietlana do'
                                    inputWrapperClass='settings__course-input-div'
                                    classLabel='settings__label'
                                    classInput='settings__input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                            </div>
                            <div className='settings__checkbox-div'>
                                <Input
                                    input='input'
                                    type='checkbox'
                                    id='sendInternalMessageTeachers'
                                    label='Wy??lij do lektor??w'
                                    inputWrapperClass='settings__checkbox'
                                    classLabel='settings__checkbox-label'
                                    onInput={inputHandler}
                                />
                                <Input
                                    input='input'
                                    type='checkbox'
                                    id='sendInternalMessageStudents'
                                    label='Wy??lij do uczni??w'
                                    inputWrapperClass='settings__checkbox'
                                    classLabel='settings__checkbox-label'
                                    onInput={inputHandler}
                                />
                            </div>

                            <Button
                                btnText='Zatwierd??'
                                type='submit'
                                classButton='settings__btn settings__btn-message'
                                disabled={!(formState.inputs.newInternalMessage.isValid && formState.inputs.firstInternalMessageDay.isValid && formState.inputs.lastInternalMessageDay.isValid && (formState.inputs.sendInternalMessageTeachers.isValid || formState.inputs.sendInternalMessageStudents.isValid))}
                            />
                        </form>
                    }
                </div>
                <div className='settings__current'>
                    <p className='settings__title settings__set-title'>Aktywne wiadomo??ci</p>
                    <div className=''>
                        {messages}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppSettInternalMessage;