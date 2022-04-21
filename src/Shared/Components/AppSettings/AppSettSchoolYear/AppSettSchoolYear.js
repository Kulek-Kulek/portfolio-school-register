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

import './AppSettSchoolYear.css';


const AppSettSchoolYear = props => {

    const dispatch = useDispatch();

    const schoolyearSettings = useSelector(state => state.adminData.appSettings[0].schoolYearSchedlue);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        schoolYearStart: {
            value: null,
            isValid: false
        },
        firstTermEnd: {
            value: null,
            isValid: false
        },
        schoolYearEnd: {
            value: null,
            isValid: false
        }
    },
        false
    );

    const setSettingsSchedlueHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/schoolyear',
                'POST',
                JSON.stringify({
                    schoolYearStart: new Date(formState.inputs.schoolYearStart.value).toISOString(),
                    firstTermEnd: new Date(formState.inputs.firstTermEnd.value).toISOString(),
                    schoolYearEnd: new Date(formState.inputs.schoolYearEnd.value).toISOString()
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

    return (
        <React.Fragment>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='settings__details-wrap settings__details-wrap--active settings'>
                <div className='settings__settings'>
                    <p className='settings__title'>Ustaw harmonogram roku szkolnego</p>
                    <p className='settings__desc'>Gdy ustawisz harmonogram roku szkolnego, wszystkie tematy i oceny uczniów będą przypisane do odpowiedniego semestru, zgodnie z ustalonym planem.</p>
                    {loading ? <Spinner /> :
                        <form className='settings__inputs-form' onSubmit={setSettingsSchedlueHandler}>
                            <Input
                                input='input'
                                type='date'
                                id='schoolYearStart'
                                label='Początek roku szkolnego'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                            />
                            <Input
                                input='input'
                                type='date'
                                id='firstTermEnd'
                                label='Koniec pierwszego semestru'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                            />
                            <Input
                                input='input'
                                type='date'
                                id='schoolYearEnd'
                                label='Koniec roku szkolnego'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                            />
                            <Button
                                btnText='Zatwierdź'
                                type='submit'
                                classButton='settings__btn'
                                disabled={!formState.isValid}
                            />
                        </form>
                    }
                </div>
                <div className='settings__current'>
                    <p className='settings__title settings__set-title'>Aktualne ustawienia</p>
                    <div className='settings__set-data'>
                        <p className='settings__set-p'>Początek roku szkolnego:
                            <span className='settings__set-span'>{schoolyearSettings && (new Date(schoolyearSettings.schoolYearStart).toLocaleDateString().length < 10 ? '0' + new Date(schoolyearSettings.schoolYearStart).toLocaleDateString() : new Date(schoolyearSettings.schoolYearStart).toLocaleDateString())}</span>
                        </p>
                        <p className='settings__set-p'>Koniec pierwszego semestru:
                            <span className='settings__set-span'>{schoolyearSettings && (new Date(schoolyearSettings.firstTermEnd).toLocaleDateString().length < 10 ? '0' + new Date(schoolyearSettings.firstTermEnd).toLocaleDateString() : new Date(schoolyearSettings.firstTermEnd).toLocaleDateString())}</span>
                        </p>
                        <p className='settings__set-p'>Koniec roku szkolnego:
                            <span className='settings__set-span'>{schoolyearSettings && (new Date(schoolyearSettings.schoolYearEnd).toLocaleDateString().length < 10 ? '0' + new Date(schoolyearSettings.schoolYearEnd).toLocaleDateString() : new Date(schoolyearSettings.schoolYearEnd).toLocaleDateString())}</span>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppSettSchoolYear;