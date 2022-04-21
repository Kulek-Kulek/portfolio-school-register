import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import StatDashboard from '../../../SharedComponents/StatDashboard';
import StatGroup from '../StatGroup/StatGroup';
import StatTeacher from '../StatTeacher/StatTeacher';
import StatStudent from '../StatStudent/StatStudent';
import Spinner from '../../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../../Shared/Components/Modal/ErrorModal';
import { useHttpClient } from '../../../../Shared/Hooks/http-hook';
import * as actions from '../../../../store/actions/index';

import './StatDisplay.css';


const StatDisplay = props => {

    const dispatch = useDispatch();
    const userType = useParams().user;
    const userId = useParams().id;

    const [loadedData, setLoadedData] = useState(false);
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);
    const [dateRangeFromTo, setDateRangeFromTo] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'statistics/' + userType + '/' + userId);
                setLoadedData(response);
            } catch (err) {
                setErrorModalActive(true);
                dispatch(actions.toggleBackdrop(true));
            }
        }
        fetchData();
    }, [sendRequest, dispatch, userType, userId,]);


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    const newDataSetByDateHandler = (updatedDataByDate) => {
        setLoadedData(updatedDataByDate);
    }

    const rangeDateChangeHandler = (updatedRangeDate) => {
        setDateRangeFromTo(updatedRangeDate)
    }


    let statisticsData = <h3>Brak danych do wyświetlenia.</h3>;

    switch (userType) {
        case 'student':
            statisticsData = <StatStudent
                rawData={loadedData.statisticsRawData}
                dateRangeFromTo={dateRangeFromTo}
            />
            break;
        case 'group':
            statisticsData = <StatGroup
                rawData={loadedData.statisticsRawData}
                dateRangeFromTo={dateRangeFromTo}
            />
            break;
        case 'teacher':
            statisticsData = <StatTeacher rawData={loadedData.statisticsRawData}
                dateRangeFromTo={dateRangeFromTo}
            />
            break;
        default: statisticsData = <h4>Brak danych.</h4>
    }

    return (
        <React.Fragment>
            {loading && <Spinner />}
            {errorModalActive ? <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} /> : (
                <React.Fragment>
                    <StatDashboard userType={userType} userId={userId} newDataSetByDate={newDataSetByDateHandler}
                        rangeDateChange={rangeDateChangeHandler} />
                    {statisticsData}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default StatDisplay;