import React, { useState, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../Shared/Elements/Button/Button';
import ErrorModal from '../../Shared/Components//Modal/ErrorModal';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import UploadImage from '../../Shared/Components/UploadImage/UploadImage';
import { AuthContext } from '../../Shared/Context/auth-context';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import zoom from '../../images/logos/zoom-logo.png';
import manImg from '../../images/man-face.jpg';
import womanImg from '../../images/woman-face.jpg';
import * as actions from '../../store/actions/index';

import './LoadedTeacherAbout.css';


const LoadedTeacherAbout = props => {

    const auth = useContext(AuthContext);

    const dispatch = useDispatch();

    const file = useSelector(state => state.adminData.imageFile);

    const filePickerRef = useRef();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [errorModalActive, setErrorModalActive] = useState(false);

    const [previewUrl, setPreviewUrl] = useState();

    const [uploadingImg, setUploadingImg] = useState();

    const [imageUploadingError, setImageUploadingError] = useState(false);

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

    const updateButtonHandler = async (e) => {
        e.persist()
        try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `teachers/teacher/${auth.userId}`);
            dispatch(actions.loadData(response.teacher));
            dispatch(actions.idProvider(response.teacher.id, 'teacherId'));
            dispatch(actions.infoTypeChange('updateTeacher'));
            dispatch(actions.toggleBackdrop(true));
            dispatch(actions.toggleModal('dataAdminModal'));
            window.scrollTo(0, 50);
        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }


    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
        // setImageUploadingError(false);
    }


    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    const uploadingImageHandler = (loading, uploadingError) => {
        setUploadingImg(loading);
        uploadingError && setErrorModalActive(true);
        uploadingError && setImageUploadingError(uploadingError);
    }



    const image = props.name && props.name.trim().slice(-1) === 'a' ? womanImg : manImg;

    return (
        <React.Fragment>

            {errorModalActive && <ErrorModal
                class={errorModalActive && ['error-modal--active', 'student__error-modal-dashboard'].join(' ')}
                errorMessage={error || imageUploadingError}
                errorHeaderMessage='Błąd sieciowy.'
                btnText='Zamknij'
                click={errorModalCancelHandler} />}

            <div className='student__infotype-type'>
                <div className='student__general-info'>
                    {props.name &&
                        <React.Fragment>
                            {uploadingImg ? <Spinner /> : !props.loading &&
                                <div className='student__profileImg-div'>
                                    <img
                                        className={'student__profileImg-div-user student__profileImg-img'}
                                        src={previewUrl ? previewUrl : (props.profileImgPath ? props.profileImgPath : image)} alt='teacher-img'
                                        onClick={auth.userId === props.id ? pickImageHandler : undefined}
                                    />
                                </div>}
                            {auth.userStatus === 'teacher' && <UploadImage
                                reference={filePickerRef}
                                path='teacher-image'
                                userId={props.id}
                                uploadingImageStatus={uploadingImageHandler}
                                errorModalActive={errorModalActive}
                            />
                            }
                        </React.Fragment>
                    }
                    <div className='student__personal-data'>
                        <span className='student__name'>{props.name}</span>
                        <span className='student__surname'>{props.surname}</span>
                        <p className='student__greeting'>dzień dobry</p>
                    </div>
                    {loading ? <Spinner /> : <div className='student__contact-details'>
                        <span className='student__span-data'>{`telefon: ${props.mobile}`}
                            <Button
                                classButton={`student__button-update ${auth.userStatus === 'HeadTeacher' && 'student__group-info'}`}
                                btnText='Aktualizuj'
                                id='updateTeacherEmail'
                                click={updateButtonHandler}
                            />
                        </span>
                        <span className='student__span-data'>{`email: ${props.email}`}
                        </span>
                        {props.zoomLink && <a className='student__span-data' href={props.zoomLink} target="_blank" rel="noopener noreferrer">
                            <img className='student__zoom-img' src={zoom} alt='zoom-logo' />
                        </a>}
                        {props.zoomPassword && <span className='student__span-data'>{`Password: ${props.zoomPassword}`}
                        </span>}
                        {props.zoomMeetingId && <span className='student__span-data'>{`Id: ${props.zoomMeetingId}`}</span>}
                    </div>}
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoadedTeacherAbout;