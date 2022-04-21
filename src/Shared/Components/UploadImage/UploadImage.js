import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useHttpClient } from '../../../Shared/Hooks/http-hook';
import * as actions from '../../../store/actions/index';

import Button from '../../Elements/Button/Button';


import './UploadImage.css';


const UploadImage = props => {

    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState();

    const [image, setImage] = useState();

    const { loading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        props.uploadingImageStatus(loading, undefined);
    }, [props, loading]);

    useEffect(() => {
        if (error) {
            props.uploadingImageStatus(false, error);
        }
    }, [props, error]);

    useEffect(() => {
        !props.errorModalActive && clearError();
    }, [props, clearError]);

    const pickedImageHandler = e => {
        let pickedFile;

        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            dispatch(actions.loadImageFile(pickedFile));
            setIsValid(true);
            setImage(pickedFile);
        } else {
            setIsValid(false);
        }
    }


    const cancelPickedImageHandler = () => {
        dispatch(actions.loadImageFile(null));
        setIsValid(false);
    }

    const updateProfileImageHandler = async () => {
        setIsValid(false);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('userId', props.userId);
            await sendRequest(process.env.REACT_APP_BACKEND_URL + props.path,
                'POST',
                formData
            );
        } catch (err) {
            dispatch(actions.toggleBackdrop(true));
        }
    }

    return (
        <div className={'uploadImg'}>
            <input
                id={props.id}
                ref={props.reference}
                style={{ display: 'none' }}
                type='file'
                accept={'.jpg, .png, .jpeg'}
                onChange={pickedImageHandler}
            />
            {isValid &&
                <div className='uploadImg__btn-div'>
                    <Button
                        btnText='Anuluj'
                        classButton='uploadImg__btn'
                        type='button'
                        click={cancelPickedImageHandler}
                    />
                    <Button
                        btnText='Wybierz'
                        classButton='uploadImg__btn'
                        type='button'
                        click={updateProfileImageHandler}
                    />
                </div>
            }
        </div>
    );
}

export default UploadImage;