import React, { useEffect } from 'react';

import Input from '../../Elements/Input/Input';
import { useForm } from '../../Hooks/form-hook';
import { dataType } from '../../../Utility/dataModalData';

import './SendSMSCheckbox.css';


const SendSMSCheckbox = props => {


    const [formState, inputHandler, setFormData] = useForm({});

    useEffect(() => {
        if (props.infoType === 'sendEmailMessage') {
            setFormData({
                sendSMSCheckbox: {
                    value: '',
                    checked: false,
                    isValid: true
                }
            }, true);
        }
    }, [setFormData, props.infoType]);


    const { sendSMS } = props;
    useEffect(() => {
        if (formState.inputs && formState.inputs.sendSMSCheckbox)
            sendSMS(formState.inputs.sendSMSCheckbox.checked);
    }, [sendSMS, formState]);

    return (
        <div className={props.wrapSendSMS}>
            <Input
                key={dataType.sendSMSCheckbox.id}
                input={dataType.sendSMSCheckbox.input}
                id={dataType.sendSMSCheckbox.id}
                name={dataType.sendSMSCheckbox.name}
                type={dataType.sendSMSCheckbox.type}
                onInput={inputHandler}
                validators={dataType.sendSMSCheckbox.validators}
                classInput={dataType.sendSMSCheckbox.class}
                label={dataType.sendSMSCheckbox.label}
                initialIsChecked={props.initialIsChecked}
                inputWrapperClass='add-data-modal__checkbox-input-wrapper send-SMS-input-wrapper'
                classLabel='send-SMS-label'
            />
            <span className={`send-SMS-span ${formState.inputs && formState.inputs.sendSMSCheckbox && formState.inputs.sendSMSCheckbox.checked && 'send-SMS-span--active'}`}>PRZYBLIŻONY koszt wysłania SMS to $ 0,038/osoba</span>
        </div>

    );
}

export default SendSMSCheckbox;