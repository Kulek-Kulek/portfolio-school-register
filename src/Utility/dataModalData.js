
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_PASSWORD,
} from '../Utility/form-validators';



export const dataType = {
    students: {
        name: {
            input: 'input',
            id: 'studentName',
            type: 'text',
            placeholder: '* Imię ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        surname: {
            input: 'input',
            id: 'studentSurname',
            type: 'text',
            placeholder: '* Nazwisko ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        email: {
            input: 'input',
            id: 'studentEmail',
            type: 'email',
            placeholder: '* Email ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        mobile: {
            input: 'input',
            id: 'studentMobile',
            type: 'number',
            placeholder: '*Telefon ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        password: {
            input: 'input',
            id: 'studentPassword',
            type: 'password',
            placeholder: '* Hasło ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD(8)],
            errorText: 'Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        birthday: {
            input: 'input',
            id: 'studentBirthday',
            type: 'date',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            // classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Data urodzenia ucznia.',
            initialIsValid: true
        },
        birthplace: {
            input: 'input',
            id: 'studentBirthplace',
            type: 'text',
            placeholder: 'Miejsce urodzenia',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressStreet: {
            input: 'input',
            id: 'studentAddressStreet',
            type: 'text',
            placeholder: 'Miejsce zamieszkania - ulica',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressPlaceNumber: {
            input: 'input',
            id: 'studentAddressPlaceNumber',
            type: 'number',
            placeholder: 'Numer domu',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressZipcode: {
            input: 'input',
            id: 'studentAddressZipcode',
            type: 'text',
            placeholder: 'Kod pocztowy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressCity: {
            input: 'input',
            id: 'studentAddressCity',
            type: 'text',
            placeholder: 'Miejscowość',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        supervisorOneNameSurname: {
            input: 'input',
            id: 'supervisorOneNameSurname',
            type: 'text',
            placeholder: 'Imię i nazwisko rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 liter.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorOneEmail: {
            input: 'input',
            id: 'supervisorOneEmail',
            type: 'email',
            placeholder: 'Email rodzica / przełożonego',
            validators: [VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorOneMobile: {
            input: 'input',
            id: 'supervisorOneMobile',
            type: 'number',
            placeholder: 'Telefon rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorOnePassword: {
            input: 'input',
            id: 'supervisorOnePassword',
            type: 'password',
            placeholder: 'Hasło rodzica / przełożonego',
            validators: [VALIDATOR_PASSWORD(8)],
            errorText: 'Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorTwoNameSurname: {
            input: 'input',
            id: 'supervisorTwoNameSurname',
            type: 'text',
            placeholder: 'Imię i nazwisko drugiego rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 liter.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorTwoEmail: {
            input: 'input',
            id: 'supervisorTwoEmail',
            type: 'email',
            placeholder: 'Email drugiego rodzica / przełożonego',
            validators: [VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorTwoMobile: {
            input: 'input',
            id: 'supervisorTwoMobile',
            type: 'number',
            placeholder: 'Telefon drugiego rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        supervisorTwoPassword: {
            input: 'input',
            id: 'supervisorTwoPassword',
            type: 'password',
            placeholder: 'Hasło drugiego rodzica / przełożonego',
            validators: [VALIDATOR_PASSWORD(8)],
            errorText: 'Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        course: {
            input: 'select',
            id: 'studentCourse',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            inputWrapperClass: 'add-data-modal__group-input-column',
            classLabel: 'add-data-modal__group-input-select-label',
            selectDefaultValue: 'Wybierz rodzaj kursu',
            label: 'Wybierz kurs',
        },
        invoiceDataCheckbox: {
            input: 'input',
            type: 'checkbox',
            id: 'invoiceDataCheckbox',
            name: 'invoiceDataCheckbox',
            initialIsValid: true,
            initialIsChecked: false,
            initialValue: false,
            label: 'Dane do faktury są inne niż dane ucznia.',
            class: 'basket__input-order-checkbox',
            inputWrapperClass: 'invoice-data-checkbox-wrapper',
            classError: 'basket__error-text',
            classLabel: 'invoice-data-checkbox-label'
        },
        invoiceNameSurname: {
            input: 'input',
            id: 'invoiceNameSurname',
            type: 'text',
            placeholder: 'Imię i nazwisko lub nazwa firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        },
        invoiceTaxNumber: {
            input: 'input',
            id: 'invoiceTaxNumber',
            type: 'number',
            placeholder: 'Numer NIP lub PESEL',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        },
        invoiceEmail: {
            input: 'input',
            id: 'invoiceEmail',
            type: 'email',
            placeholder: 'Email rodzica lub firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        },
        invoiceMobile: {
            input: 'input',
            id: 'invoiceMobile',
            type: 'number',
            placeholder: 'Telefon rodzica lub firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        },
        invoiceStreetPlaceNumber: {
            input: 'input',
            id: 'invoiceStreetPlaceNumber',
            type: 'text',
            placeholder: 'Ulica i numer budynku',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        },
        invoiceZipcodeCity: {
            input: 'input',
            id: 'invoiceZipcodeCity',
            type: 'text',
            placeholder: 'Kod pocztowy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper',
            initialIsValid: true
        }
    },
    updateStudent: {
        name: {
            input: 'input',
            id: 'updateStudentName',
            type: 'text',
            placeholder: 'Imię ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        surname: {
            input: 'input',
            id: 'updateStudentSurname',
            type: 'text',
            placeholder: 'Nazwisko ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        email: {
            input: 'input',
            id: 'updateStudentEmail',
            type: 'email',
            placeholder: 'Email ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',

        },
        mobile: {
            input: 'input',
            id: 'updateStudentMobile',
            type: 'number',
            placeholder: 'Telefon ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        birthday: {
            input: 'input',
            id: 'updateStudentBirthday',
            type: 'date',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Data urodzenia'
        },
        birthplace: {
            input: 'input',
            id: 'updateStudentBirthplace',
            type: 'text',
            placeholder: 'Miejsce urodzenia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        addressStreet: {
            input: 'input',
            id: 'updateStudentAddressStreet',
            type: 'text',
            placeholder: 'Miejsce zamieszkania - ulica',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressPlaceNumber: {
            input: 'input',
            id: 'updateStudentAddressPlaceNumber',
            type: 'number',
            placeholder: 'Numer domu',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressZipcode: {
            input: 'input',
            id: 'updateStudentAddressZipcode',
            type: 'text',
            placeholder: 'Kod pocztowy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        addressCity: {
            input: 'input',
            id: 'updateStudentAddressCity',
            type: 'text',
            placeholder: 'Miejscowość',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            initialIsValid: true
        },
        supervisorOneNameSurname: {
            input: 'input',
            id: 'updateStudentSupervisorOneNameSurname',
            type: 'text',
            placeholder: 'Imię i nazwisko rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 liter.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true,
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Dane pierwszego rodzica / pracodawcy'
        },
        supervisorOneEmail: {
            input: 'input',
            id: 'updateStudentSupervisorOneEmail',
            type: 'email',
            placeholder: 'Email rodzica / przełożonego',
            validators: [VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true
        },
        supervisorOneMobile: {
            input: 'input',
            id: 'updateStudentSupervisorOneMobile',
            type: 'number',
            placeholder: 'Telefon rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true
        },
        // supervisorOnePassword: {
        //     input: 'input',
        //     id: 'updateStudentSupervisorOnePassword',
        //     type: 'password',
        //     placeholder: 'Hasło rodzica / przełożonego',
        //     validators: [VALIDATOR_PASSWORD(8)],
        //     errorText: 'Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-',
        //     class: 'add-data-modal__input',
        //     inputWrapperClass: 'add-data-modal__group-input-column'
        // },
        supervisorTwoNameSurname: {
            input: 'input',
            id: 'updateStudentSupervisorTwoNameSurname',
            type: 'text',
            placeholder: 'Imię i nazwisko drugiego rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 liter.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true,
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Dane rodzica / pracodawcy'
        },
        supervisorTwoEmail: {
            input: 'input',
            id: 'updateStudentSupervisorTwoEmail',
            type: 'email',
            placeholder: 'Email drugiego rodzica / przełożonego',
            validators: [VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true
        },
        supervisorTwoMobile: {
            input: 'input',
            id: 'updateStudentSupervisorTwoMobile',
            type: 'number',
            placeholder: 'Telefon drugiego rodzica / przełożonego',
            validators: [VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane - minimum 6 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',
            disabled: true
        },
        // supervisorTwoPassword: {
        //     input: 'input',
        //     id: 'updateStudentSupervisorTwoPassword',
        //     type: 'password',
        //     placeholder: 'Hasło drugiego rodzica / przełożonego',
        //     validators: [VALIDATOR_PASSWORD(8)],
        //     errorText: 'Hasło musi mieć co najmnie 8 znaków, w tym co najmniej 1 dużą literę, 1 cyfrę i 1 znak specjalny,np. #?!@$%^&*-',
        //     class: 'add-data-modal__input',
        //     inputWrapperClass: 'add-data-modal__group-input-column'
        // },
        invoiceNameSurname: {
            input: 'input',
            id: 'updateInvoiceNameSurname',
            type: 'text',
            placeholder: 'Dane do faktury. Imię i nazwisko lub nazwa firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true,
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Dane do faktury - wypełnić, jeśli inne niż dane ucznia'
        },
        invoiceTaxNumber: {
            input: 'input',
            id: 'updateInvoiceTaxNumber',
            type: 'number',
            placeholder: 'Dane do faktury. Numer NIP lub PESEL',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true
        },
        invoiceEmail: {
            input: 'input',
            id: 'updateInvoiceEmail',
            type: 'email',
            placeholder: 'Dane do faktury. Email rodzica lub firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true
        },
        invoiceMobile: {
            input: 'input',
            id: 'updateInvoiceMobile',
            type: 'number',
            placeholder: 'Dane do faktury. Telefon rodzica lub firmy',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true
        },
        invoiceStreetPlaceNumber: {
            input: 'input',
            id: 'updateInvoiceStreetPlaceNumber',
            type: 'text',
            placeholder: 'Dane do faktury. Ulica i numer budynku',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true
        },
        invoiceZipcodeCity: {
            input: 'input',
            id: 'updateInvoiceZipcodeCity',
            type: 'text',
            placeholder: 'Dane do faktury. Kod pocztowy i miejscowość',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column invoice-data-input-wrapper invoice-data-input-wrapper--active',
            initialIsValid: true
        }
    },
    teachers: {
        name: {
            input: 'input',
            id: 'teacherName',
            type: 'text',
            placeholder: '* Imię lektora',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        surname: {
            input: 'input',
            id: 'teacherSurname',
            type: 'text',
            placeholder: '* Nazwisko lektora',
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        email: {
            input: 'input',
            id: 'teacherEmail',
            type: 'email',
            placeholder: '* Email lektora',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        mobile: {
            input: 'input',
            id: 'teacherMobile',
            type: 'number',
            placeholder: '* Telefon lektora',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        password: {
            input: 'input',
            id: 'teacherPassword',
            type: 'password',
            placeholder: '* Hasło lektora',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        bankaccount: {
            input: 'input',
            id: 'teacherBankaccount',
            type: 'number',
            placeholder: 'Numer rachunku bankowego lektora',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Nr rachunku bankowego składa się z 26 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomLink: {
            input: 'input',
            id: 'teacherZoomLink',
            type: 'text',
            placeholder: "Link do Zoom'a",
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomMeetingId: {
            input: 'input',
            id: 'teacherZoomMeetingId',
            type: 'number',
            placeholder: 'Zoom Meeting Id',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomPassword: {
            input: 'input',
            id: 'teacherZoomPassword',
            type: 'text',
            placeholder: 'Hasło do Zoom meeting',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
    },
    updateTeacher: {
        name: {
            input: 'input',
            id: 'updateTeacherName',
            type: 'text',
            placeholder: 'Imię ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        surname: {
            input: 'input',
            id: 'updateTeacherSurname',
            type: 'text',
            placeholder: 'Nazwisko ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        email: {
            input: 'input',
            id: 'updateTeacherEmail',
            type: 'email',
            placeholder: 'Email ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Niepoprawny email.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column',

        },
        mobile: {
            input: 'input',
            id: 'updateTeacherMobile',
            type: 'number',
            placeholder: 'Telefon ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        bankaccount: {
            input: 'input',
            id: 'updateTeacherBankaccount',
            type: 'number',
            placeholder: 'Numer rachunku bankowego lektora',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(0)],
            errorText: 'Nr rachunku bankowego składa się z 26 cyfr.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomLink: {
            input: 'input',
            id: 'updateTeacherZoomLink',
            type: 'text',
            placeholder: "Link do Zoom'a",
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomMeetingId: {
            input: 'input',
            id: 'updateTeacherZoomMeetingId',
            type: 'number',
            placeholder: 'Zoom Meeting Id',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
        zoomPassword: {
            input: 'input',
            id: 'updateTeacherZoomPassword',
            type: 'text',
            placeholder: 'Hasło do Zoom meeting',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        },
    },
    groups: {
        name: {
            input: 'input',
            id: 'groupName',
            type: 'text',
            placeholder: '* Nazwa grupy',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź nazwę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        lessonLength: {
            input: 'input',
            id: 'lessonLength',
            type: 'number',
            placeholder: '* Ile minut ma jedna lekcja?',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Podaj cyfrę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        courseLength: {
            input: 'input',
            id: 'courseLength',
            type: 'number',
            placeholder: '* Liczba godzin w tej grupie?',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Podaj cyfrę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        courseBook: {
            input: 'input',
            id: 'courseBook',
            type: 'text',
            placeholder: 'Podręcznik. Pole nieobowiązkowe.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź podręcznik.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        schoolYear: {
            input: 'input',
            id: 'groupSchoolYear',
            type: 'text',
            placeholder: '* Rok szkolny, np. 2021/2021. Dane do świadectwa.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)],
            errorText: 'Wprowadź nazwę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        certificateType: {
            input: 'select',
            type: 'text',
            validators: [VALIDATOR_REQUIRE()],
            id: 'certificateType',
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: '* Wybierz rodzaj świadectwa ukończenia kursu.',
            inputOptions: ['Certyficat dla dorosłych i młodzieży', 'Certyfikat dla dzieci']
        },
        groupLevel: {
            input: 'select',
            type: 'text',
            id: 'groupLevel',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: '* Poziom grupy. UWAGA - ta informacja zostanie umieszczona na świadectwie.',
            inputOptions: ['A1', 'A1 +', 'A2 -', 'A2', 'A2 +', 'B1 -', 'B1', 'B1 +', 'B2 -', 'B2', 'B2 +', 'C1 -', 'C1', 'C1 +', 'C2 -', 'C2']
        },
        course: {
            input: 'select',
            id: 'groupCourseName',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: '* Wybierz rodzaj kursu'
        }
    },
    updateGroup: {
        name: {
            input: 'input',
            id: 'updateGroupName',
            type: 'text',
            placeholder: 'Nazwa grupy',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź nazwę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        lessonLength: {
            input: 'input',
            id: 'updateGroupLessonLength',
            type: 'number',
            placeholder: 'Ile minut ma jedna lekcja?',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Podaj cyfrę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        courseLength: {
            input: 'input',
            id: 'updateGroupCourseLength',
            type: 'number',
            placeholder: 'Liczba godzin w tej grupie?',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Podaj cyfrę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        courseBook: {
            input: 'input',
            id: 'updateGroupCourseBook',
            type: 'text',
            placeholder: 'Podręcznik - pole nieobowiązkowe',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź podręcznik',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        schoolYear: {
            input: 'input',
            id: 'updateGroupGroupSchoolYear',
            type: 'text',
            placeholder: 'Rok szkolny, np. 2021/2021. Dane do świadectwa.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź nazwę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row'
        },
        certificateType: {
            input: 'select',
            type: 'text',
            validators: [VALIDATOR_REQUIRE()],
            id: 'updateGroupCertificateType',
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: 'Wybierz rodzaj świadectwa ukończenia kursu.',
            inputOptions: ['Certyficat dla dorosłych i młodzieży', 'Certyfikat pośredni', 'Certyfikat dla dzieci']
        },
        groupLevel: {
            input: 'select',
            type: 'text',
            id: 'updateGroupGroupLevel',
            placeholder: 'Poziom grupy. UWAGA - ta informacja zostanie umieszczona na świadectwie.',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: 'Wybierz docelowy poziom tej grupy',
            inputOptions: ['A1', 'A1 +', 'A2 -', 'A2', 'A2 +', 'B1 -', 'B1', 'B1 +', 'B2 -', 'B2', 'B2 +', 'C1 -', 'C1', 'C1 +', 'C2 -', 'C2']
        },
        course: {
            input: 'select',
            id: 'updateGroupGroupCourseName',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-row',
            classSelect: 'add-data-modal__select-certyficate',
            classError: 'basket__error-text',
            selectDefaultValue: 'Wybierz rodzaj kursu'
        }
    },
    partners: {
        name: {
            input: 'input',
            id: 'partnerName',
            type: 'text',
            placeholder: 'Imię ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-column'
        }
    },
    days: {
        monday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'poniedziałek',
            name: 'poniedziałek',
            label: 'poniedziałek',
            class: 'add-data-modal__checkbox'
        },
        tuesday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'wtorek',
            name: 'wtorek',
            label: 'wtorek',
            class: 'add-data-modal__checkbox'
        },
        wednesday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'środa',
            name: 'środa',
            label: 'środa',
            class: 'add-data-modal__checkbox'
        },
        thursday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'czwartek',
            name: 'czwartek',
            label: 'czwartek',
            class: 'add-data-modal__checkbox'
        },
        friday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'piątek',
            name: 'piątek',
            label: 'piątek',
            class: 'add-data-modal__checkbox'
        },
        saturday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'sobota',
            name: 'sobota',
            label: 'sobota',
            class: 'add-data-modal__checkbox'
        },
        sunday: {
            input: 'input',
            type: 'checkbox',
            validators: [VALIDATOR_REQUIRE()],
            id: 'niedziela',
            name: 'niedziela',
            label: 'niedziela',
            class: 'add-data-modal__checkbox'
        }
    },
    timeFrom: {
        monday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'poniedziałekOd',
            name: 'poniedziałek',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        tuesday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'wtorekOd',
            name: 'wtorek',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        wednesday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'środaOd',
            name: 'środa',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        thursday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'czwartekOd',
            name: 'czwartek',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        friday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'piątekOd',
            name: 'piątek',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        saturday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'sobotaOd',
            name: 'sobota',
            label: 'od',
            class: 'add-data-modal__time-input'
        },
        sunday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'niedzielaOd',
            name: 'niedziela',
            label: 'od',
            class: 'add-data-modal__time-input'
        }
    },
    timeTo: {
        monday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'poniedziałekDo',
            name: 'poniedziałek',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        tuesday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'wtorekDo',
            name: 'wtorek',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        wednesday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'środaDo',
            name: 'środa',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        thursday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'czwartekDo',
            name: 'czwartek',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        friday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'piątekDo',
            name: 'piątek',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        saturday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'sobotaDo',
            name: 'sobota',
            label: 'do',
            class: 'add-data-modal__time-input'
        },
        sunday: {
            input: 'input',
            type: 'time',
            validators: [VALIDATOR_REQUIRE()],
            id: 'niedzielaDo',
            name: 'niedziela',
            label: 'do',
            class: 'add-data-modal__time-input'
        }
    },
    updateGroups: {
        select: {
            input: 'select',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            id: 'updatedGroupName',
            inputWrapperClass: 'add-data-modal__group-input-select',
            classLabel: 'add-data-modal__group-input-select-label',
            label: 'Wybierz grupę',
            selectDefaultValue: 'Wybierz grupę',
        }
    },
    order: {
        name: {
            input: 'input',
            id: 'orderName',
            type: 'text',
            placeholder: 'Imię ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'basket__input-order',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text',
        },
        surname: {
            input: 'input',
            id: 'orderSurname',
            type: 'text',
            placeholder: 'Nazwisko ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'basket__input-order',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text'
        },
        email: {
            input: 'input',
            id: 'orderEmail',
            type: 'email',
            placeholder: 'Email ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'basket__input-order',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text'
        },
        mobile: {
            input: 'input',
            id: 'orderMobile',
            type: 'number',
            placeholder: 'Telefon ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'basket__input-order',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text'
        },
        birthday: {
            input: 'input',
            id: 'orderBirthday',
            type: 'text',
            validators: [VALIDATOR_REQUIRE()],
            placeholder: 'Data urodzenia ucznia',
            errorText: 'Wprowadź dane.',
            class: 'basket__input-order basket__input-order-date',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text'
        },
        orderCourseType: {
            input: 'select',
            type: 'text',
            validators: [VALIDATOR_REQUIRE()],
            id: 'orderCourseType',
            class: 'basket__input-order basket__input-order-select',
            classOption: 'basket__input-order-option',
            inputWrapperClass: 'basket__input-order-wrapper',
            classError: 'basket__error-text',
            selectDefaultValue: 'Wybierz tryb zajęć'
        },
        comments: {
            id: 'orderComments',
            name: 'studentComments',
            placeholder: 'Tutaj możesz wpisać woje uwagi.',
            initialIsValid: true,
            validators: [VALIDATOR_REQUIRE()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'basket__input-order',
            inputWrapperClass: 'basket__input-order-wrapper basket__input-order-wrapper-textarea',
            classError: 'basket__error-text'
        },
        courseRules: {
            input: 'input',
            type: 'checkbox',
            initialIsValid: false,
            id: 'orderCourseRules',
            name: 'courseRules',
            label: 'Oświadczam, że zapoznałem/łam się oraz akceptuję regulamin *',
            class: 'basket__input-order-checkbox',
            inputWrapperClass: 'basket__input-order-wrapper basket__input-order-wrapper-checkbox',
            classError: 'basket__error-text',
            classLabel: 'basket__input-order-label'
        },
        marketingRules: {
            input: 'input',
            type: 'checkbox',
            id: 'orderMarketingRules',
            name: 'marketingRules',
            initialIsValid: true,
            initialIsChecked: true,
            initialValue: true,
            label: 'Wyrażam zgodę na otrzymywanie na wskazany przeze mnie adres e-mail korespondencji handlowej zawierającej ofertę edukacyjną od Szkoły Języków Obcych OKAY. Przysługuje mi prawo cofnięcia zgody na przetwarzanie danych w każdym czasie, co nie będzie jednak miało wpływu na zgodność przetwarzania danych z prawem realizowanego przed cofnięciem zgody.',
            class: 'basket__input-order-checkbox',
            inputWrapperClass: 'basket__input-order-wrapper basket__input-order-wrapper-checkbox',
            classError: 'basket__error-text',
            classLabel: 'basket__input-order-label'
        },
    },
    contact: {
        name: {
            input: 'input',
            id: 'contactName',
            type: 'text',
            placeholder: 'Twoje imię i nazwisko',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper'
        },
        email: {
            input: 'input',
            id: 'contactEmail',
            type: 'email',
            name: 'email',
            placeholder: 'Twój adres email',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper'
        },
        tel: {
            input: 'input',
            id: 'contactTel',
            type: 'number',
            name: 'tel',
            placeholder: 'Telefon ucznia',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper'
        },
        textarea: {
            id: 'contactTextarea',
            name: 'textarea',
            placeholder: 'Tutaj możesz wpisać woje uwagi.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            initialIsValid: false,
            inputWrapperClass: 'pop-up-modal__input-wrapper basket__input-order-wrapper-textarea'
        },
    },
    createLesson: {
        date: {
            input: 'input',
            id: 'createLessonDate',
            type: 'date',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Wybierz dzień i godzinę zajęć.'
        },
        topic: {
            id: 'createLessonTopic',
            name: 'createLessonTextarea',
            placeholder: 'Wpisz temat zajęć.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input createLessonTextarea',
            initialIsValid: false,
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            rows: 6
        },
        homework: {
            id: 'createLessonHomework',
            name: 'createLessonTextarea',
            placeholder: 'Praca domowa.',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input createLessonTextarea',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            rows: 3
        }
    },
    updateCreateLesson: {
        date: {
            input: 'input',
            id: 'updateCreateLessonDate',
            type: 'date',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            classLabel: 'add-data-modal__group-createLesson-label',
            label: 'Wybierz dzień i godzinę zajęć.'
        },
        topic: {
            id: 'updateCreateLessonTopic',
            name: 'createLessonTextarea',
            placeholder: 'Wpisz temat zajęć.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input createLessonTextarea',
            initialIsValid: false,
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            rows: 6
        },
        homework: {
            id: 'updateCreateLessonHomework',
            name: 'createLessonTextarea',
            placeholder: 'Praca domowa.',
            validators: [VALIDATOR_MINLENGTH(0)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input createLessonTextarea',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            rows: 3
        }
    },
    createGrade: {
        forWhat: {
            input: 'select',
            id: 'createGradeForWhat',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-column',
            classLabel: 'add-data-modal__group-input-select-label',
            selectDefaultValue: 'Wybierz ocenianą umiejętność',
            classOption: 'basket__input-order-option',
            label: 'Wybierz ocenianą umiejętność',
        },
        forWhatDesc: {
            input: 'input',
            id: 'createGradeForWhatDesc',
            type: 'text',
            placeholder: 'Jeśli chcesz, napisz jednym zdaniem za co jest ta ocena.',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'grade-desc__input',
            inputWrapperClass: 'pop-up-modal__input-wrapper grade-desc',
            initialIsValid: true
        },
    },
    createTermEndGrade: {
        forWhatTermEndGrade: {
            input: 'select',
            id: 'createTermEndGradeForWhat',
            validators: [VALIDATOR_REQUIRE()],
            inputWrapperClass: 'add-data-modal__group-input-column',
            classLabel: 'add-data-modal__group-input-select-label',
            selectDefaultValue: 'Wybierz z listy',
            classOption: 'basket__input-order-option',
            label: 'Wybierz ocenianą umiejętność',
        },
        gradeTermEndGrade: {
            input: 'input',
            id: 'createTermEndGrade',
            type: 'text',
            placeholder: 'Wystaw ocenę słownie, np. bardzo dobry / bardzo dobry - / bardzo dobry +',
            validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'grade-desc__input term-end-grade',
            inputWrapperClass: 'pop-up-modal__input-wrapper grade-desc'
        }
    },
    updateGrade: {
        updateGrade: {
            input: 'input',
            id: 'updateGrade',
            name: 'updateGrade',
            type: 'number',
            placeholder: 'Wstaw poprawioną ocenę',
            validators: [VALIDATOR_MINLENGTH(1)],
            errorText: 'Wprowadź oceę',
            class: 'add-data-modal__input',
            inputWrapperClass: 'add-data-modal__group-input-row',
            classLabel: 'add-data-modal__group-input-select-label',
            label: 'Poprawiasz ',
        }
    },
    sendEmailMessage: {
        sendEmailSubject: {
            input: 'input',
            id: 'sendEmailSubject',
            name: 'sendEmailSubject',
            type: 'text',
            placeholder: 'Temat wiadomości',
            validators: [VALIDATOR_MINLENGTH(3)],
            errorText: 'Wpisz temat wiadomości',
            class: 'pop-up-modal__input pop-up-modal__sendmessage-input',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__sendmessage-input-div'
        },
        sendEmailMessageText: {
            id: 'sendEmailMessageText',
            name: 'sendEmailMessageText',
            placeholder: 'Twoja wiadomość',
            validators: [VALIDATOR_MINLENGTH(3)],
            errorText: 'Wprowadź poprawne dane.',
            class: 'pop-up-modal__input createLessonTextarea',
            inputWrapperClass: 'pop-up-modal__input-wrapper pop-up-modal__createLesson-wrapper',
            rows: 10
        }
    },
    sendEmailMessageRecipients: {
        input: 'input',
        id: 'sendEmailMessageRecipients',
        name: 'sendEmailMessageRecipients',
        type: 'checkbox',
        initialIsChecked: true,
        validators: [VALIDATOR_REQUIRE()],
        class: 'send-emailmessage__input'
    },
    sendSMSCheckbox: {
        input: 'input',
        id: 'sendSMSCheckbox',
        name: 'sendSMSCheckbox',
        type: 'checkbox',
        initialIsChecked: false,
        validators: [VALIDATOR_REQUIRE()],
        class: 'send-smsmessage__input',
        label: 'Wyślij również SMS'
    }
}