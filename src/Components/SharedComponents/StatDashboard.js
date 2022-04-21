import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../Shared/Elements/Input/Input';
import Button from '../../Shared/Elements/Button/Button';
import { useForm } from '../../Shared/Hooks/form-hook';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import {
    VALIDATOR_REQUIRE
} from '../../Utility/form-validators';
import * as actions from '../../store/actions/index';

import './StatDashboard.css';


const StatDashboard = props => {

    const dispatch = useDispatch();
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);

    const [formState, inputHandler] = useForm({
        statSearchStartDate: {
            value: null,
            isValid: false
        },
        statSearchEndDate: {
            value: null,
            isValid: false
        }
    },
        false
    );
    const searchByDateButtonHandler = () => {
        const fetchData = async () => {
            const startDate = new Date(formState.inputs.statSearchStartDate.value).toISOString();
            const endDate = new Date(formState.inputs.statSearchEndDate.value).toISOString();
            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'statistics/' + props.userType + '/' + props.userId + '/' + startDate + '/' + endDate);
                props.newDataSetByDate(response);
                props.rangeDateChange({
                    startDate,
                    endDate
                });
            } catch (err) {
                setErrorModalActive(true);
                dispatch(actions.toggleBackdrop(true));
            }
        }
        fetchData();
    };


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
                    click={errorModalCancelHandler} /> : (
                    <div className='stat-searchby-date-dashboard'>
                        <p className='stat-searchby-date-dashboard__period-heading'>Pokarz dane za okres</p>
                        <div className='stat-searchby-date-dashboard__input-div'>
                            <Input
                                input='input'
                                type='date'
                                id='statSearchStartDate'
                                label='od'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE]}
                                classLabel='stat-searchby-date-dashboard__label'
                                classInput='stat-searchby-date-dashboard__input'
                            />
                            <Input
                                input='input'
                                type='date'
                                id='statSearchEndDate'
                                label='do'
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE]}
                                classLabel='stat-searchby-date-dashboard__label'
                                classInput='stat-searchby-date-dashboard__input'
                            />
                        </div>
                        <div className='stat-reports__btn-div'>
                            <Button
                                btnText='Szukaj'
                                click={searchByDateButtonHandler}
                                classButton='stat-searchby-date-dashboard__search-btn'
                                disabled={!formState.isValid}
                            />
                        </div>
                    </div>
                ))}
        </React.Fragment>
    );
}

export default StatDashboard;