import { useState, useCallback, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';

export const useHttpClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [status, setStatus] = useState();
    const dispatch = useDispatch();

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        dispatch(actions.loading(true));
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url,
                {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });
            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter(requestCtrl => requestCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setLoading(false);
            dispatch(actions.loading(false));
            setStatus(response.ok);
            return responseData;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            dispatch(actions.loading(false));
            throw err;
        }
    }, [dispatch]);
    const clearError = () => {
        setError(null);
    }
    const clearStatus = () => {
        setStatus(undefined);
    }
    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(abortCtr => abortCtr.abort());
        }
    }, []);
    return { error, loading, status, sendRequest, clearError, clearStatus };
}