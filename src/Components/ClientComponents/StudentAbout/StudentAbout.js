import React, { useContext, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../Shared/Elements/Button/Button';
import DataAdminModal from '../../../Shared/Components/Modal/DataAdminModal';
import ErrorModal from '../../../Shared/Components//Modal/ErrorModal';
import Spinner from '../../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import UploadFile from '../../../Shared/Components/UploadFile/UploadFile';
import UploadImage from '../../../Shared/Components/UploadImage/UploadImage';
import Invoice from '../../SharedComponents/Invoice';
import Rodo from '../../../Shared/Rodo/Rodo/rodo';
import { AuthContext } from '../../../Shared/Context/auth-context';
import { useHttpClient } from '../../../Shared/Hooks/http-hook';
import { useForm } from '../../../Shared/Hooks/form-hook';
import manImg from '../../../images/man-face.jpg';
import womanImg from '../../../images/woman-face.jpg';
import * as actions from '../../../store/actions/index';
import './StudentAbout.css';


const StudentAbout = props => {
    const auth = useContext(AuthContext);

    const file = useSelector(state => state.adminData.imageFile);

    const filePickerRef = useRef();

    const dispatch = useDispatch();

    const rodoList = useSelector(state => state.adminData.appSettings[0].rodo);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [documents, setDocuments] = useState(false);

    const [toggleModal, setToggleModal] = useState(false);

    const [uploadingImg, setUploadingImg] = useState();

    const [imageUploadingError, setImageUploadingError] = useState(false);

    const [previewUrl, setPreviewUrl] = useState();


    const [formState, inputHandler] = useForm({
        uploadedFile: {
            value: null,
            isValid: false
        }
    },
        false
    );

    useEffect(() => {
        const fileUploadModal = document.getElementById('studentDocument');
        if (fileUploadModal) {
            toggleModal ? fileUploadModal.classList.add('file-picked') : fileUploadModal.classList.remove('file-picked');
        }
    }, [toggleModal]);


    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file]);


    useEffect(() => {
        if (props.documents) {
            setDocuments(props.documents);
        }
    }, [props.documents]);



    const updateButtonHandler = async () => {
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `students/student/${auth.userId}`);

            const address = {
                street: response.student.address ? response.student.address.street : null,
                zipcode: response.student.address ? response.student.address.zipcode : null,
                city: response.student.address ? response.student.address.city : null,
                placeNumber: response.student.address ? response.student.address.placeNumber : null
            }

            const invoiceData = {
                name: response.student.invoiceData ? response.student.invoiceData.name : null,
                taxNo: response.student.invoiceData ? response.student.invoiceData.taxNo : null,
                email: response.student.invoiceData ? response.student.invoiceData.email : null,
                mobile: response.student.invoiceData ? response.student.invoiceData.mobile : null,
                street: response.student.invoiceData ? (response.student.invoiceData.street !== ' ' ? response.student.invoiceData.street : null) : null,
                zipcode: response.student.invoiceData ? (response.student.invoiceData.zipcode !== ' ' ? response.student.invoiceData.zipcode : null) : null
            }

            dispatch(actions.loadData({
                name: response.student.name,
                surname: response.student.surname,
                mobile: response.student.mobile,
                email: response.student.email,
                birthday: response.student.birthday,
                birthplace: response.student.birthplace,
                address,
                invoiceData,
                supervisors: response.student.supervisors.length > 0 && response.student.supervisors
            }));
            dispatch(actions.idProvider(response.student.id, 'studentId'));
            dispatch(actions.infoTypeChange('updateStudent'));
            dispatch(actions.toggleBackdrop(true));
            dispatch(actions.toggleModal('dataAdminModal'));
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

    let courses;
    if (props.courses) {
        courses = props.courses.map((course, index) => <li key={course.id + index} className='student__courses-item'>{course.courseTitle}</li>);
    }

    let invoiceDetails = (
        <React.Fragment>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>Nazwa:</p>
                <p className='student__invoice-item'>{`${props.name} ${props.surname}`}</p>
            </div>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>NIP:</p>
                <p className='student__invoice-item'>Nie podano</p>
            </div>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>Email:</p>
                <p className='student__invoice-item'>{props.email}</p>
            </div>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>Telefon:</p>
                <p className='student__invoice-item'>{props.mobile}</p>
            </div>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>Ulica:</p>
                <p className='student__invoice-item'>{props.address && ((props.address.street && props.address.placeNumber ? props.address.street + ' ' + props.address.placeNumber : 'Brak danych - uzupełnij.'))}</p>
            </div>
            <div className='student__invoice-item-div'>
                <p className='student__invoice-item-name'>Miejscowość:</p>
                <p className='student__invoice-item'>{props.address && ((props.address.zipcode && props.address.city ? props.address.zipcode + ' ' + props.address.city : 'Brak danych - uzupełnij.'))}</p>
            </div>
        </React.Fragment>
    );

    if (props.invoiceData) {
        invoiceDetails = (
            <React.Fragment>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>Nazwa:</p>
                    <p className='student__invoice-item'>{props.invoiceData.name !== ' ' ? props.invoiceData.name : `${props.name} ${props.surname}`}</p>
                </div>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>NIP:</p>
                    <p className='student__invoice-item'>{props.invoiceData.taxNo || 'Brak danych - uzupełnij.'}</p>
                </div>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>Email:</p>
                    <p className='student__invoice-item'>{props.invoiceData.email || props.email}</p>
                </div>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>Telefon:</p>
                    <p className='student__invoice-item'>{props.invoiceData.mobile || props.mobile}</p>
                </div>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>Ulica:</p>
                    <p className='student__invoice-item'>{(props.invoiceData && props.invoiceData.street && props.invoiceData.street !== ' ') ? props.invoiceData.street : (props.address && props.address.street && props.address.placeNumber ? (`${props.address.street} ${props.address.placeNumber}`) : 'Brak danych - uzupełnij.')}</p>
                </div>
                <div className='student__invoice-item-div'>
                    <p className='student__invoice-item-name'>Miejscowość:</p>
                    <p className='student__invoice-item'>{(props.invoiceData && props.invoiceData.zipcode && props.invoiceData.zipcode !== ' ') ? props.invoiceData.zipcode : (props.address && props.address.zipcode && props.address.city ? (`${props.address.zipcode} ${props.address.city}`) : 'Brak danych - uzupełnij.')}</p>
                </div>
            </React.Fragment>
        )
    }

    const pickFileHandler = () => {
        filePickerRef.current.click();
    }

    const toggleModalHandler = isValid => {
        setToggleModal(isValid);
    }

    const documentStatusChangedHandler = (documentType, updatedDocuments) => {
        setDocuments(updatedDocuments);
    }


    let infoDocuments = <h5>Brak dokumentów spersonalizowanych</h5>;

    if (documents && documents.length > 0) {
        infoDocuments = documents.map((doc, index) => (
            <Invoice key={doc + index}
                invoiceURL={process.env.REACT_APP_BACKEND_URL + `invoices/${doc.key}`
                }
                name={doc.originalname}
                classPayBtn='document-patymentBtn'
                classStudentBtn='student__download-invoice-btn'
                documentType='studentDocument'
            />
        ))
    }

    let generalDocuments;
    if (props.generalDocuments && props.generalDocuments.length > 0) {
        generalDocuments = props.generalDocuments.map((doc, index) => (
            <Invoice key={doc + index}
                invoiceURL={process.env.REACT_APP_BACKEND_URL + `invoices/${doc.key}`
                }
                name={doc.originalname}
                classPayBtn='document-patymentBtn'
                classStudentBtn='student__download-invoice-btn'
                documentType={doc.type}
            />
        ))
    }

    const uploadingImageHandler = (loading, uploadingError) => {
        setUploadingImg(loading);
        uploadingError && setErrorModalActive(true);
        uploadingError && setImageUploadingError(uploadingError);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }


    const image = props.name && props.name.trim().slice(-1) === 'a' ? womanImg : manImg;

    return (
        <React.Fragment>
            <DataAdminModal />
            {errorModalActive && <ErrorModal
                class={errorModalActive && ['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error || imageUploadingError}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}
            <div className='student__infotype-type student__infotype-type--active student__infotype-about'>
                <div className='student__general-info'>
                    {props.name &&
                        <React.Fragment>
                            {uploadingImg ? <Spinner /> : !props.loading &&
                                <div className='student__profileImg-div'>
                                    <img
                                        className={`${auth.userStatus === 'student' ? 'student__profileImg-div-user student__profileImg-img' : 'student__profileImg-img'}`}
                                        src={previewUrl ? previewUrl : (props.profileImgPath ? props.profileImgPath : image)} alt='teacher-img'
                                        onClick={auth.userId === props.id ? pickImageHandler : undefined}
                                    />
                                </div>}
                            {auth.userStatus === 'student' && <UploadImage
                                reference={filePickerRef}
                                path='student-image'
                                userId={props.id}
                                uploadingImageStatus={uploadingImageHandler}
                                errorModalActive={errorModalActive}
                            />}
                        </React.Fragment>
                    }
                    <div className='student__personal-data'>
                        <span className='student__name'>{props.name}</span>
                        <span className='student__surname'>{props.surname}</span>
                        <p className='student__greeting'>dzień dobry</p>
                    </div>
                    {loading ? <Spinner /> :
                        <div className='student__contact-details'>
                            <span className='student__span-data'>{`ulica: ${props.address && props.address.street && props.address.placeNumber ? props.address.street + ' ' + props.address.placeNumber : 'Nie podano - uzupełnij'}`}</span>
                            <span className='student__span-data'>{`miejscowość: ${props.address && props.address.city && props.address.zipcode ? props.address.zipcode + ' ' + props.address.city : 'Nie podano - uzupełnij'}`}</span>
                            <span className='student__span-data'>{`telefon: ${props.mobile}`}
                            </span>
                            <span className='student__span-data'>{`email: ${props.email}`}

                                {(auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && <Button
                                    classButton='student__button-update'
                                    btnText='Aktualizuj'
                                    click={updateButtonHandler}
                                    id='updateStudentEmail'
                                />}
                            </span>
                        </div>}

                    <div className='student__document-div'>

                        {rodoList && rodoList.length > 0 && <div className='student__rodo'>
                            <p className='student__rodo-heading'>zgody formalne ucznia</p>
                            <Rodo rodoList={rodoList} studentId={props.id} />
                        </div>}
                        <p className="student__rodo-heading">{auth.userStatus === 'student' ? 'Twoje dokumenty' : 'Dokumenty ogólne ucznia'}</p>
                        {auth.userStatus === 'HeadTeacher' && (
                            <>
                                <div className='student__upload-btn-div'>
                                    <Button
                                        btnText='Dodaj dokument .pdf'
                                        click={pickFileHandler}
                                        classButton='student__add-course-button student__upload-btn'
                                    />
                                </div>
                                <UploadFile
                                    reference={filePickerRef}
                                    onInput={inputHandler}
                                    displayModal={toggleModalHandler}
                                    classFileUpload='admin-main__file-upload'
                                    classCancelBtn='finance-dashboard__rates-button-cancel'
                                    classSubmitBtn='finance-dashboard__rates-button-upload'
                                    path='students'
                                    name={props.name}
                                    surname={props.surname}
                                    mobile={props.mobile}
                                    email={props.email}
                                    id={props.id}
                                    formState={formState}
                                    documentType='studentDocument'
                                    invoiceEmail={props.invoiceEmail || props.email}
                                    uploadModalId='studentDocument'
                                    documentStatusChanged={documentStatusChangedHandler}
                                />
                            </>
                        )}
                        <ul className='student__courses-list student__documents-list'>
                            {generalDocuments}
                            <h5>Dokumenty spersonalizowane</h5>
                            {infoDocuments}
                        </ul>
                    </div>
                    <ul className='student__courses-list'>{auth.userStatus === 'student' ? 'Twoje kursy' : 'Kursy ucznia'}
                        {courses}
                    </ul>
                    <div className='student__invoice-div'>
                        <span className='student__invoice-heading'>Rozliczenia
                            <span className='student__invoice-heading student__invoice-span'>finansowe</span>
                        </span>
                        {invoiceDetails}
                    </div>
                    <a href={process.env.REACT_APP_COMPANY_PAGE_URL} className='student__add-course-button-a'><Button
                        classButton='student__add-course-button'
                        btnText='Dodaj nowy kurs'
                        disabled={auth.userStatus === 'HeadTeacher'}
                    /></a>
                </div>
            </div>
        </React.Fragment>
    );
}

export default StudentAbout;