import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../Shared/Context/auth-context';

import Button from '../../Elements/Button/Button';
import RodoAgreed from '../RodoAgreed/RodoAgreed';
import { useHttpClient } from '../../Hooks/http-hook';
import Spinner from '../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Shared/Components/Modal/ErrorModal';
import * as actions from '../../../store/actions/index';

import './rodoItem.css';


const RodoItem = props => {

    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const submitStudentRodoConsent = async e => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/rodo',
                'POST',
                JSON.stringify({
                    studentId: props.studentId,
                    rodoId: e.target.id,
                    rodoName: 'sample',
                    rodoText: 'sample'
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
        <div className='single-rodo__item'>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler}
            />}
            {loading ? <Spinner /> :
                <React.Fragment>
                    <div className='single-rodo__rodo-name'>{props.rodoName}
                        <RodoAgreed signed={props.signed} />
                    </div>
                    <p className='single-rodo__rodo-text'>{props.rodoText}</p>
                    {(auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && (props.signed && props.signed.length > 0 ? <p className='single-rodo__status-disapproved'>Możesz wycofać zgodę wysyłając maila na adres szkoły.</p> : <Button
                        classButton='single-rodo__rodo-btn'
                        btnText='Akceptuję'
                        type='submit'
                        id={props.id}
                        click={submitStudentRodoConsent}
                    />)
                    }
                </React.Fragment>
            }
        </div>
    );
}

export default RodoItem;