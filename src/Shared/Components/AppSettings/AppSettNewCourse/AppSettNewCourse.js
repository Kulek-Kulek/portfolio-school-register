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

import './AppSettNewCourse.css';


const AppSettNewCourse = props => {

    const coursesSettings = useSelector(state => state.adminData.appSettings[0].courses);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const dispatch = useDispatch();

    const [formState, inputHandler] = useForm({
        newCourseTitle: {
            value: null,
            isValid: false
        },
        newCourseLength: {
            value: null,
            isValid: false
        },
        newCoursePrice: {
            value: null,
            isValid: false
        },
        newCourseDesc: {
            value: null,
            isValid: false
        }
    },
        false
    );

    const setSettingsSchedlueHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/course',
                'POST',
                JSON.stringify({
                    newCourseTitle: formState.inputs.newCourseTitle.value,
                    newCourseLength: formState.inputs.newCourseLength.value,
                    newCoursePrice: formState.inputs.newCoursePrice.value,
                    newCourseDesc: formState.inputs.newCourseDesc.value
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

    const deleteHandler = (e) => {
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: e.target.id,
                path: 'settings/courses/' + e.target.id,
                type: 'settings',
                elementName: 'Usuń kurs'
            }
        ));
    }


    let courses = <p>Brak danych</p>
    if (coursesSettings && coursesSettings.length > 0) {
        courses = coursesSettings.map(course => (
            <div key={course.id} className='settings__rodo-div'>

                <p className='settings__rodo-title'>{course.newCourseTitle}
                    <i onClick={deleteHandler} id={course.id} className="fas fa-trash-alt settings__delete-item  admin-main__i-trash"></i>
                </p>
                <p className='settings__set-rodo-date settings__set-course-date'>{`Kurs ${course.newCourseLength
                    } godzinny`}
                    <span className='settings__set-course-price'>{`Cena ${course.newCoursePrice
                        } PLN`}</span>
                </p>
                <p className='settings__rodo-text'>{course.newCourseDesc}</p>
            </div>
        ))
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
                    <p className='settings__title'>Utwórz nowy kurs</p>
                    <p className='settings__desc'>Wszystkie stworzone kursy będą stanowiły ofertę dla potncjalnych Klientów. Pozwoli to na prowadzenie rekrutacji online 24/7.</p>
                    {loading ? <Spinner /> :
                        <form className='settings__inputs-form settings__course-inputs-form' onSubmit={setSettingsSchedlueHandler}>
                            <Input
                                input='input'
                                type='text'
                                id='newCourseTitle'
                                label='Nazwa nowego kursu, np. Angielski w Biznesie'
                                inputWrapperClass='settings__input-div'
                                classLabel='settings__label'
                                classInput='settings__input'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(5)]}
                            />
                            <div className='settings__course-number-inputs-div'>
                                <Input
                                    input='input'
                                    type='number'
                                    id='newCourseLength'
                                    label='Liczba godzin w kursie'
                                    inputWrapperClass='settings__course-input-div'
                                    classLabel='settings__label'
                                    classInput='settings__input settings__course-input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                                <Input
                                    input='input'
                                    type='number'
                                    id='newCoursePrice'
                                    label='Cena kursu'
                                    inputWrapperClass='settings__course-input-div'
                                    classLabel='settings__label'
                                    classInput='settings__input settings__course-input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                            </div>
                            <Input
                                id='newCourseDesc'
                                placeholder='Krótki opis tego kursu, np. do kogo jest adresowany, jego główne zalety.'
                                rows={10}
                                inputWrapperClass='settings__course-input-div'
                                classInput='settings__course-textarea'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(5)]}
                            />
                            <Button
                                btnText='Zatwierdź'
                                type='submit'
                                classButton='settings__btn settings__course-btn'
                                disabled={!formState.isValid}
                            />
                        </form>
                    }
                </div>
                <div className='settings__current'>
                    <p className='settings__title settings__set-title'>Aktualne ustawienia</p>
                    <div className='settings__set-data-rodo'>
                        {courses}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppSettNewCourse;