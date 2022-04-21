import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DataAdminModal from '../../Shared/Components/Modal/DataAdminModal';
import InfoTypeSection from '../../Shared/Components/InfoTypeSection/OrdersInfoType/InfoTypeSection';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import * as actions from '../../store/actions/index';
import './Orders.css';


const Orders = props => {

    const dispatch = useDispatch();

    const [loadedData, setLoadedData] = useState();
    const { loading, sendRequest, error, clearError } = useHttpClient();
    const [errorModalActive, setErrorModalActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'orders');
                setLoadedData(responseData.orders);
            } catch (err) {
                dispatch(actions.toggleBackdrop(true));
                setErrorModalActive(true);
            }
        }
        fetchData();
    }, [sendRequest, dispatch]);

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    return (
        <React.Fragment>
            <DataAdminModal />
            {loading ? <Spinner /> : (!errorModalActive ?
                <InfoTypeSection loadedData={loadedData} />
                :
                <ErrorModal
                    class='error-modal--active'
                    errorMessage={error}
                    errorHeaderMessage='Ups. Coś poszło nie tak.'
                    click={errorModalCancelHandler} />)}
        </React.Fragment>
    );
}

export default Orders;