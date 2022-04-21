import * as actionTypes from './actionTypes';


// export const toggleContactModal = (modalName) => {
//     return {
//         type: actionTypes.TOGGLE_CONTACT_MODAL,
//         modalName
//     }
// }


export const toggleModal = modalName => {
    return {
        type: actionTypes.TOGGLE_MODAL,
        modalName
    }
}
// export const toggleAuthtModal = (modalName) => {
//     return {
//         type: actionTypes.TOGGLE_AUTH_MODAL,
//         modalName
//     }
// }


export const toggleDataAdminModal = modalName => {
    return {
        type: actionTypes.TOGGLE_DATA_ADMIN_MODAL,
        modalName
    }
}

export const toggleBackdrop = payload => {
    return {
        type: actionTypes.TOGGLE_BACKDROP,
        payload
    }
}


export const loadWarningModalPayload = payload => {
    return {
        type: actionTypes.LOAD_WARNING_MODAL_PAYLOAD,
        payload
    }
}

// export const toggleAddAdminModal = (modalName) => {
//     return {
//         type: actionTypes.TOGGLE_ADD_ADMIN_MODAL,
//         modalName
//     }
// }