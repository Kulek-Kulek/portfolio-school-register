import React, { useState, useEffect, useContext, useRef } from 'react';

import { useDispatch } from 'react-redux';

import Invoice from '../../SharedComponents/Invoice';
import FinanceDashboard from './FinanceDashboard/FinanceDashboard'
import Spinner from '../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Shared/Components/Modal/ErrorModal';
import UploadFile from '../../../Shared/Components/UploadFile/UploadFile';
import Button from '../../../Shared/Elements/Button/Button';
import { useHttpClient } from '../../../Shared/Hooks/http-hook';
import { useForm } from '../../../Shared/Hooks/form-hook';
import { AuthContext } from '../../../Shared/Context/auth-context';
import * as actions from '../../../store/actions/index';
import './StudentFinance.css';


const StudentFinance = props => {

    const auth = useContext(AuthContext);

    const filePickerRef = useRef();

    const dispatch = useDispatch();

    const [loadedBankAccountData, setBankAccountData] = useState();

    const [financialRatesData, setFinancialRatesData] = useState();

    const [financialInvoices, setFinancialInvoices] = useState();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [toggleModal, setToggleModal] = useState();

    const [toggleFinancePanel, setToggleFinancePanel] = useState(false);

    const [formState, inputHandler, setFormData] = useForm({
        uploadedFile: {
            value: null,
            isValid: false
        },
        invoiceBalance: {
            value: null,
            isValid: false
        },
        invoiceDeadline: {
            value: null,
            isValid: false
        },
    },
        false
    );

    useEffect(() => {
        if (props.financialRates) {
            setFinancialRatesData(props.financialRates);
        }
    }, [props.financialRates]);

    useEffect(() => {
        if (props.invoices) {
            setFinancialInvoices(props.invoices);
        }
    }, [props.invoices]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + 'settings/');
                setBankAccountData(responseData.settings[0].bankAccount);
            } catch (err) {
                setErrorModalActive(true);
                dispatch(actions.toggleBackdrop(true));
            }
        }
        fetchData();
    }, [sendRequest, dispatch]);



    useEffect(() => {
        const fileUploadModal = document.getElementById('admin-main__file-upload');
        if (fileUploadModal) {
            toggleModal ? fileUploadModal.classList.add('file-picked') : fileUploadModal.classList.remove('file-picked');
        }
    }, [toggleModal]);

    useEffect(() => {
        const panel = document.querySelector('.finance-dashboard__btn-wrapper');
        if (panel) {
            toggleFinancePanel ? panel.classList.add('finance-dashboard__btn-wrapper--active') : panel.classList.remove('finance-dashboard__btn-wrapper--active');
        }
    }, [toggleFinancePanel]);

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
    }

    const documentStatusChangedHandler = (documentType, updatedDocumentStatus) => {
        if (documentType === 'financialRates') {
            setFinancialRatesData(updatedDocumentStatus);
        }
        if (documentType === 'invoice') {
            setFinancialInvoices(updatedDocumentStatus);
        }
    }

    const pickFileHandler = () => {
        filePickerRef.current.click();
    }

    const toggleModalHandler = isValid => {
        setToggleModal(isValid);
    }

    const cleanFormStateInputsHandler = (clicked) => {
        if (clicked) {
            setFormData({
                uploadedFile: {
                    value: null,
                    isValid: false
                },
                invoiceBalance: {
                    value: null,
                    isValid: false
                },
                invoiceDeadline: {
                    value: null,
                    isValid: false
                },
            },
                false)
        }
    }

    const financePanelClickedHandler = () => {
        setToggleFinancePanel(toggleFinancePanel => !toggleFinancePanel);
    }

    let bankaccount = 'Brak danych';
    if (loadedBankAccountData) {
        bankaccount = loadedBankAccountData;
    }

    let invoices = <h1>Brak faktur do wyświetlenia</h1>;

    if (financialInvoices && financialInvoices.length > 0) {
        invoices = financialInvoices.map((invoice, index) => (
            <Invoice key={invoice + index}
                invoiceURL={process.env.REACT_APP_BACKEND_URL + `invoices/${invoice.key}`
                }
                name={invoice.originalname.substring(0, invoice.originalname.length - 4)}
                classStudentBtn='finance__invoice-download-btn'
                classPayBtn='finance__paymentBtn'
                invoiceBalance={invoice.invoiceBalance}
                invoiceDeadline={invoice.invoiceDeadline}
                invoiceStatus={invoice.invoiceStatus}
                documentType={invoice.type || 'invoice'}
                studentId={props.studentId}
                studentName={props.name}
                studentSurname={props.surname}
                studentEmail={props.email}
                studentMobile={props.mobile}
                documentId={invoice.id}
                documentStatusChanged={documentStatusChangedHandler}
            />
        ))
    }


    let rates;
    if (financialRatesData && financialRatesData.length > 0) {
        rates = financialRatesData.map((rate, index) => (
            <Invoice key={rate + index}
                name={rate.documentName || 'Informacja finansowa'}
                classStudentBtn='finance__invoice-download-btn'
                classPayBtn='finance__paymentBtn'
                invoiceBalance={rate.documentBalance}
                invoiceDeadline={rate.documentDeadline}
                invoiceStatus={rate.documentStatus}
                documentType={rate.type || 'financialRates'}
                studentId={props.studentId}
                studentName={props.name}
                studentSurname={props.surname}
                studentEmail={props.email}
                studentMobile={props.mobile}
                documentId={rate.id}
                documentStatusChanged={documentStatusChangedHandler}
            />
        ))
    }

    return (
        <React.Fragment>
            {loading && <Spinner />}
            {errorModalActive && <ErrorModal
                class={['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='student__infotype-type'>
                <UploadFile
                    id={props.studentId}
                    reference={filePickerRef}
                    onInput={inputHandler}
                    formState={formState}
                    name={props.name}
                    surname={props.surname}
                    mobile={props.mobile}
                    email={props.email}
                    invoiceEmail={props.invoiceData ? props.invoiceData.email : props.email}
                    path='students'
                    displayModal={toggleModalHandler}
                    documentType='invoice'
                    classFileUpload='admin-main__file-upload'
                    classCancelBtn='finance-dashboard__rates-button-cancel'
                    classSubmitBtn='finance-dashboard__rates-button-upload'
                    uploadModalId='admin-main__file-upload'
                    documentStatusChanged={documentStatusChangedHandler}
                    cleanFormStateInputs={cleanFormStateInputsHandler}
                />
                <div className='finance__general-info'>
                    <div className='finance__account-div'>
                        <p className='finance__payment-details'>Konto do dokonywania płatności:</p>
                        <p className='finance__payment-details'>{bankaccount}</p>
                    </div>
                </div>
                {auth.userStatus !== 'student' && <div className='finance-dashboard__document-panel'>
                    <Button
                        btnText={`${toggleFinancePanel ? 'Ukryj panel' : 'Wysuń panel'}`}
                        classButton='finance-dashboard__panel-btn'
                        click={financePanelClickedHandler}
                    />
                </div>}
                {auth.userStatus === 'HeadTeacher' && <FinanceDashboard
                    studentId={props.studentId}
                    name={props.name}
                    surname={props.surname}
                    email={props.email}
                    mobile={props.mobile}
                    documentType='financialRates'
                    documentStatusChanged={documentStatusChangedHandler}
                    refrence={pickFileHandler}
                />}
                <div className='finance__invoices'>
                    <h4 className='finance__invoice-heading'>Dokumenty i rozliczenia</h4>
                    <ul className='finance__invoice-list'>
                        {rates}
                    </ul>
                    <ul className='finance__invoice-list'>
                        {invoices}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default StudentFinance;