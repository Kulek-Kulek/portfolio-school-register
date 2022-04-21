import React, { useEffect } from 'react';

import Input from '../../../Shared/Elements/Input/Input';
import { useForm } from '../../Hooks/form-hook';
import { dataType } from '../../../Utility/dataModalData';

import './sendMessageToAll.css';


const SendMessageToAllCheckbox = props => {


    const [formState, inputHandler, setFormData] = useForm();

    useEffect(() => {
        if (props.recipients) {
            const sendEmailMessageRecipients = {
                recipient: {
                    value: '',
                    mobile: '',
                    checked: true,
                    isValid: true
                }
            }
            for (let recipient of props.recipients) {
                sendEmailMessageRecipients[recipient.id] = {
                    value: recipient.email,
                    mobile: recipient.mobile,
                    checked: true,
                    isValid: true
                }
            }
            setFormData(sendEmailMessageRecipients, true)
        }
    }, [setFormData, props.recipients]);


    const { sendEmailMessageToAllRecipients } = props;
    useEffect(() => {
        if (formState.inputs) {
            const recipients = [];
            const recipientsEmailArray = Object.values(formState.inputs);
            for (let email of recipientsEmailArray) {
                if (email.value) {
                    recipients.push({
                        email: email.value,
                        mobile: email.mobile
                    });
                }
            }
            sendEmailMessageToAllRecipients(recipients);
        }
    }, [formState.inputs, sendEmailMessageToAllRecipients]);


    let checkboxRecipients;
    if (props.recipients) {
        checkboxRecipients = props.recipients.map((recipient, index) => (
            <Input
                key={recipient.id}
                input={dataType.sendEmailMessageRecipients.input}
                id={recipient.id}
                name={recipient.email}
                type={dataType.sendEmailMessageRecipients.type}
                onInput={inputHandler}
                validators={dataType.sendEmailMessageRecipients.validators}
                classInput={dataType.sendEmailMessageRecipients.class}
                label={index + 1 + '. ' + recipient.name}
                inputWrapperClass='add-data-modal__checkbox-input-wrapper send-message-to-all-input-wrapper'
                classLabel={'add-data-modal__checkbox-input-label'}
                initialIsChecked={dataType.sendEmailMessageRecipients.initialIsChecked}
                disabled={props.recipients.length < 2 ? true : false}
            />
        ))
    }


    return (
        <div className={props.wrapDivClass}>
            {checkboxRecipients}
        </div>

    );
}

export default SendMessageToAllCheckbox;