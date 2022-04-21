import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Input from '../../../../Shared/Elements/Input/Input';
import Button from '../../../../Shared/Elements/Button/Button';
import Spinner from '../../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../Shared/Components/Modal/ErrorModal';
import { useHttpClient } from '../../../../Shared/Hooks/http-hook';
import { useForm } from '../../../../Shared/Hooks/form-hook';
import {
    VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH
} from '../../../../Utility/form-validators.js';
import * as actions from '../../../../store/actions/index';

import './FinanceDashboard.css';


const FinanceDashboard = props => {

    const dispatch = useDispatch();

    const [toggleRatesModal, setToggleRatesModal] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        paidUntil: {
            value: null,
            isValid: false
        },
        numberOfRates: {
            value: null,
            isValid: false
        },
        amount: {
            value: null,
            isValid: false
        },
        howOften: {
            value: null,
            isValid: false
        }
    },
        false
    );

    useEffect(() => {
        const ratesPanel = document.querySelector('.finance-dashboard__rates-wrapper');
        if (ratesPanel) {
            toggleRatesModal ? ratesPanel.classList.add('finance-dashboard__rates-wrapper--active') : ratesPanel.classList.remove('finance-dashboard__rates-wrapper--active');
        }
    }, [toggleRatesModal, dispatch]);

    useEffect(() => {
        const dateInput = document.querySelector('.finance-dashboard__date-input');
        if (dateInput) {
            dateInput.addEventListener('focus', function () {
                this.setAttribute('type', 'date');
            });
            dateInput.addEventListener('blur', function () {
                this.setAttribute('type', 'text');
            });
        }
    }, []);


    const generateAndUpdateStudentFinancialDocumentHandler = async () => {
        dispatch(actions.toggleBackdrop(true));
        let date = new Date(formState.inputs.paidUntil.value);
        const interval = +formState.inputs.howOften.value;
        let rates = [];
        for (let i = 0; i < formState.inputs.numberOfRates.value; i++) {
            let rate = {};
            rate.documentDeadline = date.toISOString();
            rate.documentBalance = formState.inputs.amount.value;
            rate.documentStatus = 'issued';
            rate.documentName = date.toLocaleDateString().length < 10 ? `Informacja finansowa ${'0' + date.toLocaleDateString()}` : 'Informacja finansowa - termin płatności ' + date.toLocaleDateString();
            rates.push(rate);
            date.setMonth(date.getMonth() + interval);
        }
        dispatch(actions.toggleBackdrop(false));
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'students/' + props.studentId,
                'PATCH',
                JSON.stringify({
                    rates,
                    name: props.name,
                    surname: props.surname,
                    email: props.email,
                    mobile: props.mobile,
                    type: props.documentType
                }),
                { 'Content-Type': 'application/json' }
            );
            props.documentStatusChanged(props.documentType, response.student.financialRates);
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
            setErrorModalActive(true);
        }
    }


    const createRatesBtnClickedHandler = () => {
        setToggleRatesModal(true);
        dispatch(actions.toggleBackdrop(true));
    }

    const cancelCreateRatesHandler = () => {
        setToggleRatesModal(false);
        dispatch(actions.toggleBackdrop(false));
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                errorModalActive ? <ErrorModal
                    class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                    errorMessage={error}
                    errorHeaderMessage='Błąd sieciowy.'
                    btnText='Zamknij'
                    click={errorModalCancelHandler} /> :
                    <div className='finance-dashboard'>
                        <div className='finance-dashboard__btn-wrapper'>
                            <Button
                                btnText='Dodaj dokument .pdf'
                                classButton='finance-dashboard__btn'
                                click={props.refrence}
                            />
                            <Button
                                btnText='Utwórz harmonogram płatności'
                                classButton='finance-dashboard__btn'
                                click={createRatesBtnClickedHandler}
                            />
                            {/* <Button
                                btnText='Utwórz płatność według godzin'
                                classButton='finance-dashboard__btn'
                            /> */}
                        </div>
                        <div className='finance-dashboard__rates-wrapper'>
                            <div className='finance-dashboard__inputs-wrapper'>
                                <Input
                                    input='input'
                                    type='number'
                                    id='amount'
                                    placeholder='Podaj wielkość jednej raty'
                                    inputWrapperClass='finance-dashboard__input-div'
                                    classInput='finance-dashboard__input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                                <Input
                                    input='input'
                                    type='number'
                                    id='numberOfRates'
                                    placeholder='Podaj liczbę rat'
                                    inputWrapperClass='finance-dashboard__input-div'
                                    classInput='finance-dashboard__input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                                <Input
                                    input='input'
                                    type='text'
                                    id='paidUntil'
                                    placeholder='Data płatności pierwszej raty'
                                    inputWrapperClass='finance-dashboard__input-div'
                                    classInput='finance-dashboard__input finance-dashboard__date-input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE]}
                                />
                                <Input
                                    input='input'
                                    type='number'
                                    id='howOften'
                                    placeholder='Co ile miesięcy powtórzyć?'
                                    inputWrapperClass='finance-dashboard__input-div'
                                    classInput='finance-dashboard__input finance-dashboard__date-input'
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(1)]}
                                />
                                {/* <div className='finance-dashboard__input-div'>
                                    <p className='finance-dashboard__span'>Powtórz co jeden miesiąc</p>
                                </div> */}
                            </div>
                            <div className='finance-dashboard__rates-btns finance-dashboard__inputs-wrapper'>
                                <Button
                                    btnText='Anuluj'
                                    click={cancelCreateRatesHandler}
                                    classButton='finance-dashboard__rates-button finance-dashboard__rates-button-cancel'
                                />
                                <Button
                                    btnText='Wygeneruj'
                                    classButton='finance-dashboard__rates-button'
                                    click={generateAndUpdateStudentFinancialDocumentHandler}
                                    disabled={!formState.isValid}
                                />
                            </div>
                        </div>
                    </div>)
            }
        </React.Fragment>
    );
}

export default FinanceDashboard;