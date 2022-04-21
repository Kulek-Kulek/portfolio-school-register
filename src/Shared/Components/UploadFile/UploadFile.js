import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Button from '../../Elements/Button/Button';
import Spinner from '../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../Modal/ErrorModal';
import { useHttpClient } from '../../Hooks/http-hook';
import * as actions from '../../../store/actions/index';

import './UploadFile.css';

const UploadFile = props => {

    const dispatch = useDispatch();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (isValid) {
            const dateButton = document.getElementById('invoiceDeadline');
            dateButton.addEventListener('focus', function () {
                this.setAttribute('type', 'date');
            });
            dateButton.addEventListener('blur', function () {
                this.setAttribute('type', 'text');
            });
        }
    }, [isValid, props.id]);

    const uploadedFileHandler = e => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput('uploadedFile', pickedFile, null, null, fileIsValid);
        props.displayModal(true);
        dispatch(actions.toggleBackdrop(true));
    }

    const inputChangeHandler = (e) => {
        let isValid = false;
        if (e.target.value && e.target.value !== ' ') {
            isValid = true;
        }
        props.onInput(e.target.id, e.target.value, null, null, isValid);
        props.displayModal(true);
    }

    const cancelUploadFileHandler = () => {
        props.displayModal(false);
        dispatch(actions.toggleBackdrop(false));
    }

    const uploadFileHandler = async () => {
        let formData = new FormData();
        let responseData;
        switch (props.documentType) {
            case 'invoice':
                formData.append('uploadedFile', props.formState.inputs.uploadedFile.value);
                formData.append('invoiceBalance', props.formState.inputs.invoiceBalance.value);
                formData.append('invoiceDeadline', new Date(props.formState.inputs.invoiceDeadline.value).toISOString());
                formData.append('name', props.name);
                formData.append('surname', props.surname);
                formData.append('mobile', props.mobile);
                formData.append('email', props.email);
                formData.append('invoiceEmail', props.invoiceEmail);
                formData.append('type', props.documentType);
                props.cleanFormStateInputs(true);
                setIsValid(false);
                break;
            case 'studentDocument':
                formData.append('uploadedFile', props.formState.inputs.uploadedFile.value);
                formData.append('name', props.name);
                formData.append('surname', props.surname);
                formData.append('mobile', props.mobile);
                formData.append('email', props.email);
                formData.append('invoiceEmail', props.invoiceEmail);
                formData.append('type', props.documentType);
                break;
            default:
                formData.append('uploadedFile', props.formState.inputs.uploadedFile.value);
                formData.append('invoiceBalance', props.formState.inputs.invoiceBalance.value);
                formData.append('invoiceDeadline', new Date(props.formState.inputs.invoiceDeadline.value).toISOString());
                formData.append('name', props.name);
                formData.append('surname', props.surname);
                formData.append('mobile', props.mobile);
                formData.append('email', props.email);
                formData.append('invoiceEmail', props.invoiceEmail);
                formData.append('type', props.documentType);
        }

        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + props.path + '/' + props.id,
                'PATCH',
                formData,
            );
            props.displayModal(false);
            dispatch(actions.toggleBackdrop(false));
            switch (props.documentType) {
                case 'invoice':
                    responseData = props.path === 'teachers' ? response.teacher.invoices : response.student.invoices;
                    break;
                case 'financialRates':
                    responseData = response.student.financialRates
                    break;
                case 'studentDocument':
                    responseData = response.student.documents
                    break;
                default: responseData = response.student.invoices;
            }
            props.documentStatusChanged(props.documentType, responseData);
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
        setIsValid(false);
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> :
                errorModalActive ? <ErrorModal
                    class='error-modal--active'
                    errorMessage={error}
                    errorHeaderMessage='Ups. Coś poszło nie tak.'
                    btnText='Zamknij'
                    click={errorModalCancelHandler} />
                    :
                    <React.Fragment>
                        <div className={`file-upload ${props.classFileUpload}`} id={props.uploadModalId}>
                            <div className={`file-upload__inputs-div ${props.documentType === 'studentDocument' ? 'file-upload__document' : ''}`}>
                                <input
                                    id='uploadedFile'
                                    ref={props.reference}
                                    type='file'
                                    accept='.pdf'
                                    style={{ display: 'none' }}
                                    onChange={uploadedFileHandler}
                                />
                                {isValid && <input
                                    type='number'
                                    id='invoiceBalance'
                                    className='file-upload__inputs'
                                    placeholder='Kwota do zapłaty'
                                    onChange={inputChangeHandler} />}
                                {isValid && <input
                                    type='text'
                                    id='invoiceDeadline'
                                    placeholder='Data płatności faktury'
                                    className='file-upload__inputs file-upload__payment-deadline'
                                    onChange={inputChangeHandler} />}
                            </div>
                            <div className='file-upload__buttons-div'>
                                <Button
                                    id='fileUploadCancelBtn'
                                    btnText='Anuluj'
                                    click={cancelUploadFileHandler}
                                    classButton={`file-upload__button file-upload__button-cancel finance-dashboard__rates-button ${props.classCancelBtn}`} />
                                <Button
                                    id='fileUploadAddFileBtn'
                                    btnText='Dodaj'
                                    click={uploadFileHandler}
                                    disabled={!props.formState.isValid}
                                    classButton={`file-upload__button file-upload__button-upload finance-dashboard__rates-button ${props.classSubmitBtn}`} />
                            </div>
                        </div>
                    </React.Fragment>}
        </React.Fragment >
    );
}

export default UploadFile;