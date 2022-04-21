import React, { useEffect, useState } from 'react';

import Input from '../../../Shared/Elements/Input/Input';
import { useForm } from '../../Hooks/form-hook';
import { dataType } from '../../../Utility/dataModalData';
import './WeekdaysCheckbox.css';

const WeekdaysCheckbox = props => {

    const [dayChecked, setDayChecked] = useState([]);

    const [formState, inputHandler] = useForm({
        poniedziałekOd: { value: '' },
        wtorekOd: { value: '' },
        środaOd: { value: '' },
        czwartekOd: { value: '' },
        piątekOd: { value: '' },
        sobotaOd: { value: '' },
        niedzielaOd: { value: '' },
        poniedziałekDo: { value: '' },
        wtorekDo: { value: '' },
        środaDo: { value: '' },
        czwartekDo: { value: '' },
        piątekDo: { value: '' },
        sobotaDo: { value: '' },
        niedzielaDo: { value: '' },
        poniedziałek: { value: false },
        wtorek: { value: false },
        środa: { value: false },
        czwartek: { value: false },
        piątek: { value: false },
        sobota: { value: false },
        niedziela: { value: false },
    },
    );


    const { checkedDays } = props;
    useEffect(() => {
        let days = []
        for (let i of Object.keys(formState.inputs)) {
            if (formState.inputs[i].value) {
                days.push({ [i]: formState.inputs[i].value });
            }
        }
        checkedDays(days);
        setDayChecked(days);
    }, [checkedDays, formState.inputs, setDayChecked]);



    useEffect(() => {
        let days = []
        for (let key of dayChecked) {
            for (let i in key) {
                days.push(i)
            }
        }
        const timeInputs = [...document.querySelectorAll('.add-data-modal__time-input')];
        timeInputs.forEach(timeInput => {
            if (days.includes(timeInput.getAttribute('name'))) {
                timeInput.disabled = false;
            }
            else {
                timeInput.disabled = true;
            }
        })
    }, [dayChecked]);

    const checkbox = Object.keys(dataType.days).map((item, index) =>
        < div className='add-data-modal__day-times' key={index}>
            <Input
                input={dataType.days[item].input}
                id={dataType.days[item].id}
                name={dataType.days[item].name}
                type={dataType.days[item].type}
                onInput={inputHandler}
                validators={dataType.days[item].validators}
                errorText={dataType.days[item].errorText}
                classInput={dataType.days[item].class}
                label={dataType.days[item].label}
                inputWrapperClass='add-data-modal__checkbox-input-wrapper'
                classLabel={'add-data-modal__checkbox-input-label'}
            />
            <Input
                input={dataType.timeFrom[item].input}
                id={dataType.timeFrom[item].id}
                name={dataType.timeFrom[item].name}
                type={dataType.timeFrom[item].type}
                onInput={inputHandler}
                validators={dataType.timeFrom[item].validators}
                errorText={dataType.timeFrom[item].errorText}
                classInput={dataType.timeFrom[item].class}
                label={dataType.timeFrom[item].label}
                inputWrapperClass='add-data-modal__from-input-wrapper'
            />
            <Input
                input={dataType.timeTo[item].input}
                id={dataType.timeTo[item].id}
                name={dataType.timeTo[item].name}
                type={dataType.timeTo[item].type}
                onInput={inputHandler}
                validators={dataType.timeTo[item].validators}
                errorText={dataType.timeTo[item].errorText}
                classInput={dataType.timeTo[item].class}
                label={dataType.timeTo[item].label}
                inputWrapperClass='add-data-modal__to-input-wrapper'
            />
        </div >)

    return (
        <div className={props.checkboxWrapperClass}>
            <p className={props.classWeekdaysHeading}>{props.weekdaysHeading}</p>
            {checkbox}
        </div>
    );
}

export default WeekdaysCheckbox;