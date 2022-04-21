import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useHttpClient } from '../../Shared/Hooks/http-hook';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import Button from '../../Shared/Elements/Button/Button';
import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';

import './Invoice.css';

const Invoice = props => {

    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const payWithPrzelewy24 = async () => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'payments/przelewy24/' + props.studentId + '/' + props.documentId);
            window.location.href = 'https://secure.przelewy24.pl/trnRequest/' + response.token;
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    const date = new Date(props.invoiceDeadline).toLocaleDateString();
    let invoiceDate = 0;
    if (date.length < 10) {
        invoiceDate += date
    } else {
        invoiceDate = date
    }


    const invoicePaymentStatusChangeHandler = async e => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'students/' + props.studentId,
                'PATCH',
                JSON.stringify({
                    financialStatus: e.target.id,
                    type: props.documentType + 'UpdateStatus',
                    documentId: props.documentId,
                    name: props.studentName,
                    surname: props.studentSurname,
                    email: props.studentEmail,
                    mobile: props.studentMobile
                }),
                { 'Content-Type': 'application/json' }
            );
            props.documentStatusChanged(props.documentType, props.documentType === 'invoice' ? response.student.invoices : response.student.financialRates);
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }

    const deleteInvoiceHandler = async e => {
        try {
            const documentId = e.target.id;
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'students/' + props.studentId + '/' + documentId,
                'DELETE');
            props.documentStatusChanged(props.documentType, props.documentType === 'invoice' ? response.student.invoices : response.student.financialRates);
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }

    return (
        <li className='finance__list-item'>
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='finance__invoice-details-div'>
                {(props.documentType === 'invoice' || props.documentType === 'studentDocument' || props.documentType === 'generalDocument') &&
                    <a href={props.invoiceURL} className='finance__a student__finance-a student__finance-a-invoice'>{props.name}</a>}
                {props.documentType === 'financialRates' && props.documentType === 'financialRates' &&
                    <p className='finance__a student__finance-a student__finance-a-invoice'>{props.name}</p>}
                {(props.documentType === 'invoice' || props.documentType === 'financialRates') &&
                    (<React.Fragment>
                        <p className='finance__invoice-details'>{`Do zapłaty: ${props.invoiceBalance || 'Pobierz dokument'}`}</p>
                        <p className='finance__invoice-details'>{`Termin płatności: ${invoiceDate && invoiceDate !== 'Invalid Date' ? invoiceDate : 'Pobierz dokument'}`}</p>
                        {loading ? <Spinner /> :
                            <div className={`finance__invoice-status-div ${props.invoiceOwner === 'employedTeacher' && 'finance__payment-hide'}`}>
                                <span className={`finance__invoice-details finance__invoice-status ${auth.userStatus === 'HeadTeacher' && 'finance__invoice-status--cursor'} ${props.invoiceStatus === 'issued' ? 'finance__invoice-issued' : ''}`} id='issued'
                                    onClick={auth.userStatus === 'HeadTeacher' ? invoicePaymentStatusChangeHandler : undefined}>Wystawiona</span>
                                <span className={`finance__invoice-details finance__invoice-status ${auth.userStatus === 'HeadTeacher' && 'finance__invoice-status--cursor'} ${props.invoiceStatus === 'overdue' ? 'finance__invoice-overdue' : ''}`} id='overdue'
                                    onClick={auth.userStatus === 'HeadTeacher' ? invoicePaymentStatusChangeHandler : undefined}>Przeterminowana</span>
                                <span className={`finance__invoice-details finance__invoice-status ${auth.userStatus === 'HeadTeacher' && 'finance__invoice-status--cursor'} ${props.invoiceStatus === 'paid' ? 'finance__invoice-paid' : ''}`} id='paid' onClick={auth.userStatus === 'HeadTeacher' ? invoicePaymentStatusChangeHandler : undefined}>
                                    Zapłacona</span>
                                {auth.userStatus === 'HeadTeacher' && props.invoiceStatus === 'issued' && <i onClick={deleteInvoiceHandler} className="fas fa-trash-alt admin-main__i-trash finance__invoice-details-delete" id={props.documentId}></i>}
                            </div>
                        }
                    </React.Fragment>
                    )}
            </div>
            <Button
                btnText='Zapłać'
                id={props.documentId}
                click={payWithPrzelewy24}
                disabled={props.invoiceStatus === 'paid' ? true : false}
                classButton={`finance__download-invoice-btn finance__paymant finance__a student__finance-a ${props.classPayBtn} ${props.invoiceStatus === 'paid' && 'finance__payment-hide'}`}
            />
        </li>
    );
}

export default Invoice;