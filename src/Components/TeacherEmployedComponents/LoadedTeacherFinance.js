import React, { useRef, useState, useEffect, useContext } from 'react';

import UploadFile from '../../Shared/Components/UploadFile/UploadFile';
import Button from '../../Shared/Elements/Button/Button';
import LinkElement from '../../Shared/Elements/LinkElement/LinkElement';
import Invoice from '../SharedComponents/Invoice';
import { AuthContext } from '../../Shared/Context/auth-context';
import { useForm } from '../../Shared/Hooks/form-hook';

import './LoadedTeacherFinance.css';



const LoadedTeacherFinance = props => {

    const auth = useContext(AuthContext);

    const filePickerRef = useRef();

    const [toggleModal, setToggleModal] = useState();

    const [financialInvoices, setFinancialInvoices] = useState();

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


    useEffect(() => {
        const fileUploadModal = document.getElementById('admin-main__file-upload');
        if (fileUploadModal) {
            toggleModal ? fileUploadModal.classList.add('file-picked') : fileUploadModal.classList.remove('file-picked');
        }
    }, [toggleModal]);


    useEffect(() => {
        if (props.invoices) {
            setFinancialInvoices(props.invoices);
        }
    }, [props.invoices]);

    const pickFileHandler = () => {
        filePickerRef.current.click();
    }


    const documentStatusChangedHandler = (documentType, updatedDocumentStatus) => {
        if (documentType === 'invoice') {
            setFinancialInvoices(updatedDocumentStatus);
        }
    }

    const toggleModalHandler = isValid => {
        setToggleModal(isValid);
    }


    let invoices = <h1>Brak faktur do wyświetlenia</h1>;

    if (financialInvoices && financialInvoices.length > 0) {
        invoices = financialInvoices.map((invoice, index) => (
            <Invoice key={invoice + index}
                invoiceURL={process.env.REACT_APP_BACKEND_URL + `invoices/${invoice.key}`
                }
                name={invoice.originalname.substring(0, invoice.originalname.length - 4)}
                classStudentBtn='finance__invoice-download-btn'
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
                classPayBtn='finance__payment-hide'
                invoiceOwner='employedTeacher'
            />
        ))
    }

    return (
        <div className='student__infotype-type'>
            <div className='teacher__finance-button-div'>
                <Button
                    btnText='Dodaj dokument'
                    click={pickFileHandler}
                    classButton='teacher__upload-file-btn'
                />
                <LinkElement
                    to={'/statistics/teacher/' + props.id}
                    btnText='Moje statystyki'
                    classButton='teacher__upload-file-btn teacher__stat-btn'
                    className='teacher__stat-btn-link'
                />
            </div>
            <UploadFile
                id={props.id}
                reference={filePickerRef}
                onInput={inputHandler}
                formState={formState}
                name={props.name}
                surname={props.surname}
                mobile={props.mobile}
                email={props.email}
                bankaccount={props.bankaccount}
                path='teachers'
                displayModal={toggleModalHandler}
                documentType='invoice'
                classFileUpload='admin-main__file-upload'
                classCancelBtn='finance-dashboard__rates-button-cancel'
                classSubmitBtn='finance-dashboard__rates-button-upload'
                uploadModalId='admin-main__file-upload'
                documentStatusChanged={documentStatusChangedHandler}
                cleanFormStateInputs={cleanFormStateInputsHandler}
            />
            <div className='finance__invoices'>
                <h4 className='finance__invoice-heading'>Dokumenty i rozliczenia</h4>
                <p className='finance__invoice-heading finance__invoice-bankaccount'>{`${auth.userStatus === 'teacher' ? 'Mój numer rachunku bankowego: ' : 'Numer rachunku bankowego lektora: '} ${props.bankaccount} `}</p>
                <ul className='finance__invoice-list'>
                    {invoices}
                </ul>
            </div>
        </div>
    );
}

export default LoadedTeacherFinance;