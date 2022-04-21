import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Elements/Input/Input';
import { VALIDATOR_MINLENGTH } from '../../../Utility/form-validators';
import Spinner from '../../Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../Modal/ErrorModal';
import WeekdaysCheckbox from '../../Components/WeekdaysCheckbox/WeekdaysCheckbox';
import SendMessageToAll from '../../Components/SendMessageToAllCheckbox/SendMessageToAllCheckbox';
import SendSMSCheckbox from '../../Components/SendSMSCheckbox/SendSMSCheckbox';
import { useForm } from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { dataType } from '../../../Utility/dataModalData';
import { AuthContext } from '../../../Shared/Context/auth-context';

import Button from '../../Elements/Button/Button';
import * as actions from '../../../store/actions/index';
import './DataAdminModal.css';


const DataAdminModal = props => {
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const dataAdminModal = useSelector(state => state.modal.dataAdminModal);
    const adminData = useSelector(state => state.adminData);
    const loadedGroups = useSelector(state => state.group.groups);
    const loadedCourses = useSelector(state => state.course.courses);

    const [errorModalActive, setErrorModalActive] = useState(false);

    const { loading, error, sendRequest, clearError } = useHttpClient();

    const [weekDays, setWeekDays] = useState();

    const [sendEmailMessageToAll, setSendEmailMessageToAll] = useState();

    const [sendSMS, setSendSMS] = useState();

    const [invoiceInputsVisible, setInvoiceInputsVisible] = useState(false);

    const [formState, inputHandler, setFormData] = useForm({
        studentName: {
            value: '',
            isValid: false
        },
        studentSurname: {
            value: '',
            isValid: false
        },
        studentEmail: {
            value: '',
            isValid: false
        },
        studentBirthday: {
            value: '',
            isValid: true
        },
        studentBirthplace: {
            value: '',
            isValid: true
        },
        studentPassword: {
            value: '',
            isValid: false
        },
        studentMobile: {
            value: '',
            isValid: false
        },
        studentAddressStreet: {
            value: '',
            isValid: true
        },
        studentAddressPlaceNumber: {
            value: '',
            isValid: true
        },
        studentAddressZipcode: {
            value: '',
            isValid: true
        },
        studentAddressCity: {
            value: '',
            isValid: true
        },
        supervisorOneNameSurname: {
            value: '',
            isValid: true
        },
        supervisorOneEmail: {
            value: '',
            isValid: true
        },
        supervisorOneMobile: {
            value: '',
            isValid: true
        },
        supervisorOnePassword: {
            value: '',
            isValid: true
        },
        supervisorTwoNameSurname: {
            value: '',
            isValid: true
        },
        supervisorTwoEmail: {
            value: '',
            isValid: true
        },
        supervisorTwoMobile: {
            value: '',
            isValid: true
        },
        supervisorTwoPassword: {
            value: '',
            isValid: true
        },
        studentCourse: {
            value: '',
            isValid: false
        },
        invoiceDataCheckbox: {
            value: '',
            isValid: true,
            checked: false
        },
        invoiceNameSurname: {
            value: '',
            isValid: true
        },
        invoiceTaxNumber: {
            value: '',
            isValid: true
        },
        invoiceEmail: {
            value: '',
            isValid: true
        },
        invoiceMobile: {
            value: '',
            isValid: true
        },
        invoiceStreetPlaceNumber: {
            value: '',
            isValid: true
        },
        invoiceZipcodeCity: {
            value: '',
            isValid: true
        }
    },
        false
    );

    useEffect(() => {
        dispatch(actions.loading(loading));
    }, [dispatch, loading]);

    useEffect(() => {
        if (formState.inputs.invoiceDataCheckbox) {
            formState.inputs.invoiceDataCheckbox.checked ? setInvoiceInputsVisible(true) : setInvoiceInputsVisible(false);
        }
    }, [formState.inputs.invoiceDataCheckbox]);


    useEffect(() => {
        switch (adminData.infoType) {
            case 'students':
                setFormData({
                    studentName: {
                        value: '',
                        isValid: false
                    },
                    studentSurname: {
                        value: '',
                        isValid: false
                    },
                    studentEmail: {
                        value: '',
                        isValid: false
                    },
                    studentBirthday: {
                        value: '',
                        isValid: true
                    },
                    studentBirthplace: {
                        value: '',
                        isValid: true
                    },
                    studentPassword: {
                        value: '',
                        isValid: false
                    },
                    studentMobile: {
                        value: '',
                        isValid: false
                    },
                    studentAddressStreet: {
                        value: '',
                        isValid: true
                    },
                    studentAddressPlaceNumber: {
                        value: '',
                        isValid: true
                    },
                    studentAddressZipcode: {
                        value: '',
                        isValid: true
                    },
                    studentAddressCity: {
                        value: '',
                        isValid: true
                    },
                    supervisorOneNameSurname: {
                        value: '',
                        isValid: true
                    },
                    supervisorOneEmail: {
                        value: '',
                        isValid: true
                    },
                    supervisorOneMobile: {
                        value: '',
                        isValid: true
                    },
                    supervisorOnePassword: {
                        value: '',
                        isValid: true
                    },
                    supervisorTwoNameSurname: {
                        value: '',
                        isValid: true
                    },
                    supervisorTwoEmail: {
                        value: '',
                        isValid: true
                    },
                    supervisorTwoMobile: {
                        value: '',
                        isValid: true
                    },
                    supervisorTwoPassword: {
                        value: '',
                        isValid: true
                    },
                    studentCourse: {
                        value: '',
                        isValid: false
                    },
                    invoiceDataCheckbox: {
                        value: '',
                        isValid: true,
                        checked: false
                    },
                    invoiceNameSurname: {
                        value: '',
                        isValid: true
                    },
                    invoiceTaxNumber: {
                        value: '',
                        isValid: true
                    },
                    invoiceEmail: {
                        value: '',
                        isValid: true
                    },
                    invoiceMobile: {
                        value: '',
                        isValid: true
                    },
                    invoiceStreetPlaceNumber: {
                        value: '',
                        isValid: true
                    },
                    invoiceZipcodeCity: {
                        value: '',
                        isValid: true
                    }
                }, false);
                break;
            case 'groups':
                setFormData({
                    groupName: {
                        value: '',
                        isValid: false
                    },
                    lessonLength: {
                        value: '',
                        isValid: false
                    },
                    courseLength: {
                        value: '',
                        isValid: false
                    },
                    courseBook: {
                        value: '',
                        isValid: true
                    },
                    groupSchoolYear: {
                        value: '',
                        isValid: false
                    },
                    groupLevel: {
                        value: '',
                        isValid: false
                    },
                    certificateType: {
                        value: '',
                        isValid: false
                    },
                    groupCourseName: {
                        value: '',
                        isValid: false
                    }
                }, false);
                break;
            case 'teachers':
                setFormData({
                    teacherName: {
                        value: '',
                        isValid: false
                    },
                    teacherSurname: {
                        value: '',
                        isValid: false
                    },
                    teacherEmail: {
                        value: '',
                        isValid: false
                    },
                    teacherMobile: {
                        value: '',
                        isValid: false
                    },
                    teacherBankaccount: {
                        value: '',
                        isValid: true
                    },
                    teacherPassword: {
                        value: '',
                        isValid: false
                    },
                    teacherZoomLink: {
                        value: '',
                        isValid: true
                    },
                    teacherZoomMeetingId: {
                        value: '',
                        isValid: true
                    },
                    teacherZoomPassword: {
                        value: '',
                        isValid: true
                    },
                }, false);
                break;
            case 'updateGroups':
                setFormData({
                    updatedGroupName: {
                        value: '',
                        isValid: false
                    }
                }, false);
                break;
            case 'updateStudent':
                setFormData({
                    updateStudentName: {
                        value: adminData.loadData.name,
                        isValid: true
                    },
                    updateStudentSurname: {
                        value: adminData.loadData.surname,
                        isValid: true
                    },
                    updateStudentEmail: {
                        value: adminData.loadData.email,
                        isValid: true
                    },
                    updateStudentMobile: {
                        value: adminData.loadData.mobile,
                        isValid: true
                    },
                    updateStudentBirthday: {
                        value: adminData.loadData.birthday,
                        isValid: true
                    },
                    updateStudentBirthplace: {
                        value: adminData.loadData.birthplace,
                        isValid: true
                    },
                    updateStudentAddressStreet: {
                        value: adminData.loadData.address && adminData.loadData.address.street,
                        isValid: true
                    },
                    updateStudentAddressPlaceNumber: {
                        value: adminData.loadData.address && adminData.loadData.address.placeNumber,
                        isValid: true
                    },
                    updateStudentAddressZipcode: {
                        value: adminData.loadData.address && adminData.loadData.address.zipcode,
                        isValid: true
                    },
                    updateStudentAddressCity: {
                        value: adminData.loadData.address && adminData.loadData.address.city,
                        isValid: true
                    },
                    updateStudentSupervisorOneNameSurname: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[0].name,
                        isValid: true
                    },
                    updateStudentSupervisorOneEmail: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[0].email,
                        isValid: true
                    },
                    updateStudentSupervisorOneMobile: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[0].mobile,
                        isValid: true
                    },
                    // updateStudentSupervisorTwoNameSurname:{
                    //     value:,
                    //     isValid:true
                    // },
                    // updateStudentSupervisorTwoEmail:{
                    //     value:,
                    //     isValid:true
                    // },
                    // updateStudentSupervisorTwoMobile:{
                    //     value:,
                    //     isValid:true
                    // },
                    updateStudentSupervisorTwoNameSurname: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[1].name,
                        isValid: true
                    },
                    updateStudentSupervisorTwoEmail: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[1].email,
                        isValid: true
                    },
                    updateStudentSupervisorTwoMobile: {
                        value: adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 && adminData.loadData.supervisors[1].mobile,
                        isValid: true
                    },
                    // updateStudentSupervisorTwoNameSurname:{
                    //     value:,
                    //     isValid:true
                    // },
                    // updateStudentSupervisorTwoEmail:{
                    //     value:,
                    //     isValid:true
                    // },
                    // updateStudentSupervisorTwoMobile:{
                    //     value:,
                    //     isValid:true
                    // },
                    updateInvoiceNameSurname: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.name,
                        isValid: true
                    },
                    updateInvoiceTaxNumber: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.taxNo,
                        isValid: true
                    },
                    updateInvoiceEmail: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.email,
                        isValid: true
                    },
                    updateInvoiceMobile: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.mobile,
                        isValid: true
                    },
                    updateInvoiceStreetPlaceNumber: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.street,
                        isValid: true
                    },
                    updateInvoiceZipcodeCity: {
                        value: adminData.loadData.invoiceData && adminData.loadData.invoiceData.zipcode,
                        isValid: true
                    },
                },
                    true
                );
                break;
            case 'updateTeacher':
                setFormData({
                    updateTeacherName: {
                        value: adminData.loadData.name,
                        isValid: true
                    },
                    updateTeacherSurname: {
                        value: adminData.loadData.surname,
                        isValid: true
                    },
                    updateTeacherEmail: {
                        value: adminData.loadData.email,
                        isValid: true
                    },
                    updateTeacherMobile: {
                        value: adminData.loadData.mobile,
                        isValid: true
                    },
                    updateTeacherBankaccount: {
                        value: adminData.loadData.bankaccount,
                        isValid: true
                    },
                    updateTeacherZoomLink: {
                        value: adminData.loadData.zoom && adminData.loadData.zoom.link,
                        isValid: true
                    },
                    updateTeacherZoomMeetingId: {
                        value: adminData.loadData.zoom && adminData.loadData.zoom.meetingId,
                        isValid: true
                    },
                    updateTeacherZoomPassword: {
                        value: adminData.loadData.zoom && adminData.loadData.zoom.password,
                        isValid: true
                    }
                },
                    true
                );
                break;
            case 'updateGroup':
                setFormData({
                    updateGroupName: {
                        value: adminData.loadData.name,
                        isValid: adminData.loadData.name ? true : false
                    },
                    updateGroupLessonLength: {
                        value: adminData.loadData.lessonLength,
                        isValid: adminData.loadData.lessonLength ? true : false
                    },
                    updateGroupCourseLength: {
                        value: adminData.loadData.courseLength,
                        isValid: adminData.loadData.courseLength ? true : false
                    },
                    updateGroupCourseBook: {
                        value: adminData.loadData.courseBook,
                        isValid: true
                    },
                    updateGroupGroupSchoolYear: {
                        value: adminData.loadData.schoolYear,
                        isValid: adminData.loadData.courseLength ? true : false
                    },
                    updateGroupCertificateType: {
                        value: adminData.loadData.certificateType,
                        isValid: adminData.loadData.certificateType ? true : false
                    },
                    updateGroupGroupLevel: {
                        value: adminData.loadData.groupLevel,
                        isValid: adminData.loadData.groupLevel ? true : false
                    },
                    updateGroupGroupCourseName: {
                        value: adminData.loadData.groupCourseName,
                        isValid: adminData.loadData.groupLevel ? true : false
                    }
                },
                    false
                );
                break;
            case 'createLesson':
                const createLessonSetFormData = {
                    createLessonDate: {
                        value: '',
                        isValid: false
                    },
                    createLessonTopic: {
                        value: '',
                        isValid: false
                    },
                    createLessonHomework: {
                        value: '',
                        isValid: true
                    },
                }
                if (adminData.loadData) {
                    for (let key of adminData.loadData) {
                        createLessonSetFormData[key.studentId] = {
                            value: false,
                            isValid: true
                        }
                    }
                }
                setFormData(createLessonSetFormData,
                    false
                );
                break;
            case 'updateCreateLesson':
                const updateLessonSetFormData = {
                    updateCreateLessonDate: {
                        value: adminData.updatedData.lessonDate,
                        isValid: true
                    },
                    updateCreateLessonTopic: {
                        value: adminData.updatedData.topic,
                        isValid: true
                    },
                    updateCreateLessonHomework: {
                        value: adminData.updatedData.homework,
                        isValid: true
                    },
                }
                if (adminData.loadData) {
                    for (let key of adminData.loadData) {
                        updateLessonSetFormData[key.studentId] = {
                            value: false,
                            isValid: true
                        }
                    }
                }
                setFormData(updateLessonSetFormData,
                    false
                );
                break;
            case 'createGrade':
                const createGradeSetFormData = {
                    createGradeForWhat: {
                        value: '',
                        isValid: false
                    },
                    createGradeForWhatDesc: {
                        value: '',
                        isValid: true
                    }
                }
                if (adminData.loadData) {
                    for (let key of adminData.loadData) {
                        createGradeSetFormData[key.studentId] = {
                            value: '',
                            isValid: true,
                        }
                    }
                }
                setFormData(createGradeSetFormData,
                    false
                );
                break;
            case 'updateGrade':
                setFormData({
                    updateGrade: {
                        value: '',
                        isValid: false
                    },
                },
                    false
                );
                break;
            case 'createTermEndGrade':
                setFormData({
                    createTermEndGradeForWhat: {
                        value: '',
                        isValid: false
                    },
                    createTermEndGrade: {
                        value: '',
                        isValid: false
                    },
                },
                    false
                );
                break;
            case 'sendEmailMessage':
                setFormData({
                    sendEmailSubject: {
                        value: '',
                        isValid: false
                    },
                    sendEmailMessageText: {
                        value: '',
                        isValid: false
                    },
                },
                    false
                );
                break;
            default: setFormData({
                studentName: {
                    value: '',
                    isValid: false
                },
                studentSurname: {
                    value: '',
                    isValid: false
                },
                studentEmail: {
                    value: '',
                    isValid: false
                },
                studentPassword: {
                    value: '',
                    isValid: false
                },
                studentMobile: {
                    value: '',
                    isValid: false
                },
                studentBirthday: {
                    value: '',
                    isValid: false
                },
                studentBirthplace: {
                    value: '',
                    isValid: false
                },
                studentCourse: {
                    value: '',
                    isValid: false
                }
            },
                false
            );
        }
    }, [adminData.infoType, setFormData, adminData.loadData, adminData.loadData.courseLength, adminData.loadData.email, adminData.loadData.lessonLength, adminData.loadData.mobile, adminData.loadData.name, adminData.loadData.surname, adminData.loadedData.homework, adminData.loadedData.lessonDate, adminData.loadedData.topic, adminData.updatedData]);


    useEffect(() => {
        dispatch(actions.fetchGroups('Wybierz grupę'));
        dispatch(actions.fetchCourses('Wybierz kurs'));
    }, [dispatch]);



    const formSubmitHandler = async e => {
        e.preventDefault();
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(false));
        dispatch(actions.loadData(null));

        let path;
        let body;
        let method;

        switch (adminData.infoType) {
            case 'students':
                const birthday = formState.inputs.studentBirthday.value ? new Date(formState.inputs.studentBirthday.value).toISOString() : null;
                const invoiceData = {
                    name: formState.inputs.invoiceNameSurname.value !== '' ? formState.inputs.invoiceNameSurname.value : formState.inputs.studentName.value + ' ' + formState.inputs.studentSurname.value,
                    taxNo: formState.inputs.invoiceTaxNumber.value,
                    email: formState.inputs.invoiceEmail.value !== '' ? formState.inputs.invoiceEmail.value : formState.inputs.studentEmail.value,
                    mobile: formState.inputs.invoiceMobile.value !== '' ? formState.inputs.invoiceMobile.value : formState.inputs.studentMobile.value,
                    street: formState.inputs.invoiceStreetPlaceNumber.value !== '' ? formState.inputs.invoiceStreetPlaceNumber.value : formState.inputs.studentAddressStreet.value + ' ' + formState.inputs.studentAddressPlaceNumber.value,
                    zipcode: formState.inputs.invoiceZipcodeCity.value !== '' ? formState.inputs.invoiceZipcodeCity.value : formState.inputs.studentAddressZipcode.value + ' ' + formState.inputs.studentAddressCity.value
                }
                const supervisorOneData = {
                    name: formState.inputs.supervisorOneNameSurname.value,
                    mobile: formState.inputs.supervisorOneMobile.value,
                    email: formState.inputs.supervisorOneEmail.value,
                    password: formState.inputs.supervisorOnePassword.value
                }
                const supervisorTwoData = {
                    name: formState.inputs.supervisorTwoNameSurname.value,
                    mobile: formState.inputs.supervisorTwoMobile.value,
                    email: formState.inputs.supervisorTwoEmail.value,
                    password: formState.inputs.supervisorTwoPassword.value
                }
                path = adminData.infoType + '/signup';
                body = JSON.stringify({
                    name: formState.inputs.studentName.value,
                    surname: formState.inputs.studentSurname.value,
                    mobile: formState.inputs.studentMobile.value,
                    email: formState.inputs.studentEmail.value,
                    birthday,
                    birthplace: formState.inputs.studentBirthplace.value,
                    password: formState.inputs.studentPassword.value,
                    courseId: formState.inputs.studentCourse.value,
                    street: formState.inputs.studentAddressStreet.value,
                    zipcode: formState.inputs.studentAddressZipcode.value,
                    city: formState.inputs.studentAddressCity.value,
                    placeNumber: formState.inputs.studentAddressPlaceNumber.value,
                    invoiceData,
                    supervisorOneData,
                    supervisorTwoData
                });
                method = 'POST';
                break;
            case 'teachers':
                path = adminData.infoType + '/create-teacher';
                body = JSON.stringify({
                    name: formState.inputs.teacherName.value,
                    surname: formState.inputs.teacherSurname.value,
                    mobile: formState.inputs.teacherMobile.value,
                    email: formState.inputs.teacherEmail.value,
                    password: formState.inputs.teacherPassword.value,
                    zoomLink: formState.inputs.teacherZoomLink.value,
                    zoomPassword: formState.inputs.teacherZoomPassword.value,
                    zoomMeetinId: formState.inputs.teacherZoomMeetingId.value,
                    bankaccount: formState.inputs.teacherBankaccount.value
                });
                method = 'POST';
                break;
            case 'partners':
                path = adminData.infoType + '/create-partner';
                method = 'POST';
                break;
            case 'groups':
                path = adminData.infoType + '/create-group';
                body = JSON.stringify({
                    name: formState.inputs.groupName.value,
                    lessonLength: formState.inputs.lessonLength.value,
                    courseLength: formState.inputs.courseLength.value,
                    certificateType: formState.inputs.certificateType.value,
                    groupLevel: formState.inputs.groupLevel.value,
                    lessonDayTime: weekDays,
                    courseName: formState.inputs.groupCourseName.value,
                    schoolYear: formState.inputs.groupSchoolYear.value,
                    courseBook: formState.inputs.courseBook.value,
                });
                method = 'POST';
                break;
            case 'updateGroups':
                path = 'groups/' + formState.inputs.updatedGroupName.value;
                body = JSON.stringify({
                    studentId: adminData.studentId,
                    teacherId: adminData.teacherId
                });
                method = 'POST';
                break;
            case 'updateStudent':
                const updatedBirthday = formState.inputs.updateStudentBirthday.value ? new Date(formState.inputs.updateStudentBirthday.value).toISOString() : null;
                const updatedInvoiceData = {
                    name: formState.inputs.updateInvoiceNameSurname.value,
                    taxNo: formState.inputs.updateInvoiceTaxNumber.value,
                    email: formState.inputs.updateInvoiceEmail.value,
                    mobile: formState.inputs.updateInvoiceMobile.value,
                    street: formState.inputs.updateInvoiceStreetPlaceNumber.value,
                    zipcode: formState.inputs.updateInvoiceZipcodeCity.value
                }
                const address = {
                    street: formState.inputs.updateStudentAddressStreet.value,
                    placeNumber: formState.inputs.updateStudentAddressPlaceNumber.value,
                    zipcode: formState.inputs.updateStudentAddressZipcode.value,
                    city: formState.inputs.updateStudentAddressCity.value,
                }

                path = 'students/' + adminData.studentId;
                body = JSON.stringify({
                    name: formState.inputs.updateStudentName.value,
                    surname: formState.inputs.updateStudentSurname.value,
                    mobile: formState.inputs.updateStudentMobile.value,
                    email: formState.inputs.updateStudentEmail.value,
                    birthday: updatedBirthday,
                    birthplace: formState.inputs.updateStudentBirthplace.value,
                    address,
                    updatedInvoiceData,
                    updatedSupervisorOneNameSurname: formState.inputs.updateStudentSupervisorOneNameSurname.value,
                    updatedSupervisorOneMobile: formState.inputs.updateStudentSupervisorOneMobile.value,
                    updatedSupervisorOneEmail: formState.inputs.updateStudentSupervisorOneEmail.value,
                    updatedSupervisorTwoNameSurname: formState.inputs.updateStudentSupervisorTwoNameSurname.value,
                    updatedSupervisorTwoMobile: formState.inputs.updateStudentSupervisorTwoMobile.value,
                    updatedSupervisorTwoEmail: formState.inputs.updateStudentSupervisorTwoEmail.value,
                });
                method = 'PATCH';
                break;
            case 'updateTeacher':
                path = 'teachers/' + adminData.teacherId;
                body = JSON.stringify({
                    name: formState.inputs.updateTeacherName.value,
                    surname: formState.inputs.updateTeacherSurname.value,
                    mobile: formState.inputs.updateTeacherMobile.value,
                    email: formState.inputs.updateTeacherEmail.value,
                    bankaccount: formState.inputs.updateTeacherBankaccount.value,
                    zoomLink: formState.inputs.updateTeacherZoomLink.value,
                    zoomPassword: formState.inputs.updateTeacherZoomPassword.value,
                    zoomMeetinId: formState.inputs.updateTeacherZoomMeetingId.value
                });
                method = 'PATCH';
                break;
            case 'updateGroup':
                path = 'groups/' + adminData.groupId;
                body = JSON.stringify({
                    name: formState.inputs.updateGroupName.value,
                    courseLength: formState.inputs.updateGroupCourseLength.value,
                    lessonLength: formState.inputs.updateGroupLessonLength.value,
                    lessonDayTime: weekDays,
                    groupLevel: formState.inputs.updateGroupGroupLevel.value,
                    certificateType: formState.inputs.updateGroupCertificateType.value,
                    courseName: formState.inputs.updateGroupGroupCourseName.value,
                    schoolYear: formState.inputs.updateGroupGroupSchoolYear.value,
                    courseBook: formState.inputs.updateGroupCourseBook.value
                });
                method = 'PATCH';
                break;
            case 'createLesson':
                let presentStudents = [];
                let absentStudents = [];
                for (let key of Object.keys(formState.inputs)) {
                    for (let i of adminData.loadData) {
                        if (i.studentId === key && formState.inputs[key].value === true) {
                            presentStudents.push(key)
                        }
                        if (i.studentId === key && formState.inputs[key].value === false) {
                            absentStudents.push(key)
                        }
                    }
                }
                const date = new Date(formState.inputs.createLessonDate.value).toISOString();
                path = 'topics/create-topic';
                body = JSON.stringify({
                    topic: formState.inputs.createLessonTopic.value,
                    homework: formState.inputs.createLessonHomework.value,
                    lessonDate: date,
                    groupId: adminData.groupId,
                    teacherId: auth.userId,
                    presentStudents,
                    absentStudents
                });
                method = 'POST';
                break;
            case 'updateCreateLesson':
                let updatePresentStudents = [];
                let updateAbsentStudents = [];
                for (let key of Object.keys(formState.inputs)) {
                    for (let i of adminData.loadData) {
                        if (i.studentId === key && formState.inputs[key].value === true) {
                            updatePresentStudents.push(key)
                        }
                        if (i.studentId === key && formState.inputs[key].value === false) {
                            updateAbsentStudents.push(key)
                        }
                    }
                }
                const updateDate = new Date(formState.inputs.updateCreateLessonDate.value).toISOString();
                path = `topics/${adminData.topicId}`;
                body = JSON.stringify({
                    topic: formState.inputs.updateCreateLessonTopic.value,
                    homework: formState.inputs.updateCreateLessonHomework.value,
                    lessonDate: updateDate,
                    teacherId: auth.userId,
                    updatePresentStudents,
                    updateAbsentStudents
                });
                method = 'PATCH';
                break;
            case 'createGrade':
                const grades = [];
                for (let key of Object.keys(formState.inputs)) {
                    for (let i of adminData.loadData) {
                        if (i.studentId === key) {
                            grades.push({
                                studentId: key,
                                name: formState.inputs.createGradeForWhat,
                                gradeDesc: formState.inputs.createGradeForWhatDesc.value,
                                grade: formState.inputs[key].value,
                                createdBy: auth.userId
                            });
                        }
                    }
                }
                path = 'grades/create-grade';
                body = JSON.stringify({
                    grades,
                    groupId: adminData.groupId,
                    teacherId: auth.userId,
                });
                method = 'POST';
                break;
            case 'updateGrade':
                path = (`grades/${adminData.gradeId}/${adminData.studentId}`);
                body = JSON.stringify({
                    updatedGrade: formState.inputs.updateGrade.value
                });
                method = 'PATCH';
                break;
            case 'sendEmailMessage':
                path = 'send-email';
                body = JSON.stringify({
                    subject: formState.inputs.sendEmailSubject.value,
                    text: formState.inputs.sendEmailMessageText.value,
                    sender: adminData.sender,
                    recipients: sendEmailMessageToAll,
                    sendSMS
                });
                method = 'POST';
                break;
            case 'createTermEndGrade':
                let gradeCode;
                switch (formState.inputs.createTermEndGradeForWhat.value) {
                    case 'Ocena proponowana - pierwszy semestr':
                        gradeCode = 'A';
                        break;
                    case 'Ocena za pierwszy semestr':
                        gradeCode = 'B';
                        break;
                    case 'Ocena proponowana - drugi semestr':
                        gradeCode = 'C';
                        break;
                    case 'Ocena za drugi semestr':
                        gradeCode = 'D';
                        break;
                    case 'Ocena końcowa':
                        gradeCode = 'E';
                        break;
                    default: gradeCode = 'A';
                }
                path = 'students/' + adminData.studentId;
                body = JSON.stringify({
                    endStudentTermGrade: {
                        endTermGradeType: formState.inputs.createTermEndGradeForWhat.value,
                        grade: formState.inputs.createTermEndGrade.value,
                        createdBy: auth.userId,
                        creationDate: new Date().toISOString(),
                        gradeCode: gradeCode,
                        groupId: adminData.groupId
                    },
                    groupId: adminData.groupId
                });
                method = 'POST';
                break;
            default: path = 'signup';
                body = JSON.stringify({
                    name: formState.inputs.studentName.value,
                    surname: formState.inputs.studentSurname.value,
                    mobile: formState.inputs.studentMobile.value,
                    email: formState.inputs.studentEmail.value,
                    password: formState.inputs.studentPassword.value
                });
                method = 'POST';
        }

        try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + path,
                method,
                body,
                { 'Content-Type': 'application/json' }
            );
            adminData.infoType === 'students' && dispatch(actions.addNewData(responseData.student));
            adminData.infoType === 'groups' && dispatch(actions.addNewData(responseData.group));
            adminData.infoType === 'teachers' && dispatch(actions.addNewData(responseData.teacher));
            dispatch(actions.infoTypeChange(null));

            adminData.infoType === 'createTermEndGrade' && dispatch(actions.idProvider(null, 'studentId'));
            adminData.infoType === 'createTermEndGrade' && dispatch(actions.idProvider(null, 'groupId'));
            adminData.infoType === 'createTermEndGrade' && dispatch(actions.loadData(responseData.group));
            adminData.infoType === 'createLesson' && dispatch(actions.loadedData(responseData.teacherWithGroups));
            adminData.infoType === 'updateStudent' && (auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && dispatch(actions.loadedData(responseData.student));

        } catch (err) {
            setErrorModalActive(true);
            dispatch(actions.toggleBackdrop(true));
        }
    }


    const hideFormHandler = (e) => {
        e.preventDefault();
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.toggleBackdrop(false));
        dispatch(actions.infoTypeChange(''));
        dispatch(actions.loadData(null));
        setSendEmailMessageToAll(undefined);
        dispatch(actions.sendEmailMessage({}, []));
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
        dispatch(actions.infoTypeChange(null));
    }

    const checkedDays = useCallback((days) => {
        setWeekDays(days);
    }, []);

    const sendEmailMessageToAllRecipients = useCallback(recipients => {
        setSendEmailMessageToAll(recipients);
    }, []);

    const sendSMSHandler = useCallback(checked => {
        setSendSMS(checked)
    }, []);



    let updateInitialData = [];
    if (adminData.loadData) {
        updateInitialData = [adminData.loadData.name, adminData.loadData.surname, adminData.loadData.email, adminData.loadData.mobile, adminData.loadData.birthday, adminData.loadData.birthplace, adminData.loadData.address && adminData.loadData.address.street, adminData.loadData.address && adminData.loadData.address.placeNumber, adminData.loadData.address && adminData.loadData.address.zipcode, adminData.loadData.address && adminData.loadData.address.city, adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[0].name : '', adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[0].email : '', adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[0].mobile : '', adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[1].name : '', adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[1].email : '', adminData.loadData.supervisors && adminData.loadData.supervisors.length > 0 ? adminData.loadData.supervisors[1].mobile : '', adminData.loadData.invoiceData && adminData.loadData.invoiceData.name, adminData.loadData.invoiceData && adminData.loadData.invoiceData.taxNo, adminData.loadData.invoiceData && adminData.loadData.invoiceData.email, adminData.loadData.invoiceData && adminData.loadData.invoiceData.mobile, adminData.loadData.invoiceData && adminData.loadData.invoiceData.street, adminData.loadData.invoiceData && adminData.loadData.invoiceData.zipcode];
    }
    if (adminData.loadData && adminData.infoType === 'updateGroup') {
        updateInitialData = [adminData.loadData.name, adminData.loadData.lessonLength, adminData.loadData.courseLength, adminData.loadData.courseBook, adminData.loadData.schoolYear, adminData.loadData.certificateType, adminData.loadData.groupLevel, adminData.loadData.groupCourseName];
    }
    if (adminData.loadData && adminData.infoType === 'updateTeacher') {
        updateInitialData = [adminData.loadData.name, adminData.loadData.surname, adminData.loadData.email, adminData.loadData.mobile, adminData.loadData.bankaccount, adminData.loadData.zoom && adminData.loadData.zoom.link, adminData.loadData.zoom && adminData.loadData.zoom.meetingId, adminData.loadData.zoom && adminData.loadData.zoom.password];
    }
    if (adminData.updatedData && adminData.infoType === 'updateCreateLesson') {
        updateInitialData = [adminData.updatedData.lessonDate, adminData.updatedData.topic, adminData.updatedData.homework];
    }

    let options = [];
    if (adminData.infoType === 'updateGroups') {
        options = loadedGroups;
    }
    if (adminData.infoType === 'students' || adminData.infoType === 'groups' || adminData.infoType === 'updateGroup') {
        for (let c of loadedCourses) {
            options.push(c.courseTitle)
        }
    }

    if (adminData.infoType === 'createGrade') {
        options = ['Aktywność', 'Mówienie', 'Słuchanie', 'Czytanie', 'Słownictwo', 'Kartkówka', 'Forma pisemna', 'Praca domowa', 'Wiersz', 'Piosenka', 'Projekt', 'Test', 'Test semestralny', 'Test całoroczny'];
    }
    if (adminData.infoType === 'createTermEndGrade') {
        options = adminData.loadData
    }

    let data;

    if (adminData.infoType) {
        data = (
            Object.keys(dataType[adminData.infoType]).map((item, index) =>
                < React.Fragment key={index}>
                    <Input
                        input={dataType[adminData.infoType][item].input}
                        id={dataType[adminData.infoType][item].id}
                        name={dataType[adminData.infoType][item].name}
                        initialValue={updateInitialData[index]}
                        type={dataType[adminData.infoType][item].type}
                        placeholder={dataType[adminData.infoType][item].placeholder}
                        label={dataType[adminData.infoType][item].label}
                        accept={dataType[adminData.infoType][item].accept}
                        rows={dataType[adminData.infoType][item].rows}
                        classLabel={dataType[adminData.infoType][item].classLabel}
                        onInput={inputHandler}
                        validators={dataType[adminData.infoType][item].validators}
                        errorText={dataType[adminData.infoType][item].errorText}
                        classInput={dataType[adminData.infoType][item].class}
                        options={dataType[adminData.infoType][item].inputOptions ? dataType[adminData.infoType][item].inputOptions : options}
                        selected={adminData.loadData && adminData.infoType === 'updateGroup' && updateInitialData[3]}
                        selectDefaultValue={dataType[adminData.infoType][item].selectDefaultValue}
                        disabled={auth.userStatus === 'student' && dataType[adminData.infoType][item].disabled}
                        classOption='add-data-modal__option'
                        classSelect={dataType[adminData.infoType][item].classSelect ? dataType[adminData.infoType][item].classSelect : 'add-data-modal__select'}
                        inputWrapperClass={`${dataType[adminData.infoType][item].inputWrapperClass} ${invoiceInputsVisible && 'invoice-data-input-wrapper--active'}`}
                        initialIsValid={dataType[adminData.infoType][item].initialIsValid}
                    />
                </ React.Fragment>
            )
        )
    };

    let attendance;
    if (adminData.loadData && (adminData.infoType === 'createLesson' || adminData.infoType === 'updateCreateLesson')) {
        attendance = (
            adminData.loadData.map(input => (
                <Input
                    key={input.studentId}
                    input='input'
                    type='checkbox'
                    label={input.name}
                    onInput={inputHandler}
                    id={input.studentId}
                    name='createLesson'
                    inputWrapperClass='form__inputWrapperClass-checkbox-div'
                    classLabel='form__checkbox-label'
                />
            ))
        )
    }
    if (adminData.loadData && adminData.infoType === 'createGrade') {
        attendance = (
            adminData.loadData.map(input => (
                <Input
                    key={input.studentId}
                    input='input'
                    type='number'
                    label={input.name}
                    onInput={inputHandler}
                    id={input.studentId}
                    name='createGrade'
                    inputWrapperClass='form__inputWrapperClass-checkbox-div'
                    classLabel='form__checkbox-label'
                    classInput='form__create-grade'
                    validators={[VALIDATOR_MINLENGTH(0)]}
                />
            ))
        )
    }

    let checklistActionName = 'Wstaw ocenę';
    if (adminData.infoType === 'createLesson' || adminData.infoType === 'updateCreateLesson') {
        checklistActionName = 'Sprawdź obecność'
    }
    if (adminData.infoType === 'updateCreateLesson') {
        checklistActionName = 'UWAGA - ponownie sprawdź obecność przed dodaniem.'
    }

    return (
        <React.Fragment>
            {loading ? <Spinner classSpinner='spinner-centered' /> : (
                errorModalActive ? <ErrorModal
                    class='error-modal--active'
                    errorMessage={error}
                    errorHeaderMessage='Ups. Coś poszło nie tak.'
                    btnText='Zamknij'
                    click={errorModalCancelHandler}
                /> :
                    (
                        <form
                            onSubmit={formSubmitHandler}
                            className={`add-data-modal ${props.classForm} ${adminData.infoType === 'students' && 'add-data-modal__add-new-student'} ${adminData.infoType === 'updateStudent' && 'add-data-modal__add-new-student'} ${(adminData.infoType === 'updateGroup' || adminData.infoType === 'updateTeacher') && 'add-data-modal-top'} ${dataAdminModal && 'add-data-modal--active'} ${adminData.infoType === 'sendEmailMessage' && 'add-data-modal__sendEmailMessage'} ${adminData.infoType === 'updateGroups' && 'add-data-modal__addStudentToGroup'} ${adminData.infoType === 'groups' && 'add-data-modal__groups'} ${adminData.infoType === 'teachers' && 'add-data-modal__teachers'} ${adminData.infoType === 'createTermEndGrade' && 'add-data-modal__createTermEndGrade'} ${(adminData.infoType === 'createLesson' || adminData.infoType === 'createGrade' || adminData.infoType === 'sendEmailMessage' || adminData.infoType === 'updateCreateLesson') && 'add-data-modal__createLesson'} `}>
                            <div className='add-data-modal__heading'></div>
                            {auth.userStatus === 'HeadTeacher' && adminData.infoType === 'sendEmailMessage' && <SendSMSCheckbox
                                wrapSendSMS='send-message-to-all-div send-SMS-div' infoType={adminData.infoType}
                                sendSMS={sendSMSHandler}
                            />}
                            <div>{props.chosenCourseTitle}</div>
                            <div className='add-data-modal__group-info'>
                                {data}
                            </div>
                            {(adminData.infoType === 'groups' || adminData.infoType === 'updateGroup') && <WeekdaysCheckbox
                                checkboxWrapperClass={'add-data-modal__checkbox-wrapper'}
                                checkedDays={checkedDays}
                                weekdaysHeading={props.weekdaysHeading}
                                classWeekdaysHeading='add-data-modal__schedlue' />}
                            {attendance && <div className='form__checklist'>
                                <span className='form__checklist-span'>{checklistActionName}
                                </span>
                                {attendance}
                            </div>
                            }
                            {
                                adminData.infoType === 'sendEmailMessage' && <SendMessageToAll
                                    recipients={adminData.recipients}
                                    wrapDivClass='send-message-to-all-div'
                                    sendEmailMessageToAllRecipients={sendEmailMessageToAllRecipients}
                                />
                            }
                            <div className='add-data-modal__buttons'>
                                <Button
                                    type='submit'
                                    btnText={adminData.infoType === 'sendEmailMessage' ? 'Wyślij' : 'Dodaj'}
                                    disabled={!formState.isValid}
                                    classButton='add-data-modal__button'
                                />
                                <Button
                                    type='text'
                                    btnText='Anuluj'
                                    click={hideFormHandler}
                                    classButton='add-data-modal__button'
                                />
                            </div>
                        </form>
                    )
            )
            }
        </React.Fragment>
    );
}

export default DataAdminModal;