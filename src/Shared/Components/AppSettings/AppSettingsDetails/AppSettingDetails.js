import React from 'react';
import { useSelector } from 'react-redux';

import AppSettSchoolYear from '../AppSettSchoolYear/AppSettSchoolYear';
import AppSettBankAccount from '../AppSetBankAccount/AppSetBankAccount';
import AppSettNewCourse from '../AppSettNewCourse/AppSettNewCourse';
import AppSettInternalMessage from '../AppSettInternalMessage/AppSettInternalMessage';
import AppSettRodo from '../AppSettRodo/AppSettRodo';

import './AppSettingDetail.css';


const AppSettingDetails = props => {

    const adminData = useSelector(state => state.adminData);

    let details;

    switch (adminData.settingsInfoType) {
        case 'rodo':
            details = <AppSettRodo />
            break;
        case 'courses':
            details = <AppSettNewCourse />
            break;
        case 'bankAccount':
            details = <AppSettBankAccount />
            break;
        case 'internalMessage':
            details = <AppSettInternalMessage />
            break;
        default: details = <AppSettSchoolYear />
    }


    return (
        <React.Fragment>
            {details}
        </React.Fragment>
    );
}

export default AppSettingDetails;