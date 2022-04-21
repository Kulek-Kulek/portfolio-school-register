import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dataAdminModal: false,
    authModal: false,
    warningModal: false,
    backdrop: false,
    warningModalPayload: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.TOGGLE_CONTACT_MODAL:
        //     return {
        //         ...state,
        //         [action.modalName]: !state[action.modalName]
        //     }
        case actionTypes.TOGGLE_MODAL:
            return {
                ...state,
                [action.modalName]: !state[action.modalName]
            }
        // case actionTypes.TOGGLE_DATA_ADMIN_MODAL:
        //     return {
        //         ...state,
        //         [action.modalName]: !state[action.modalName]
        //     }
        case actionTypes.TOGGLE_BACKDROP:
            return {
                ...state,
                backdrop: action.payload
            }
        // case actionTypes.TOGGLE_ADD_ADMIN_MODAL:
        //     return {
        //         ...state,
        //         [action.modalName]: !state[action.modalName]
        //     }
        case actionTypes.LOAD_WARNING_MODAL_PAYLOAD:
            return {
                ...state,
                warningModalPayload: action.payload,
            }
        default: return state;
    }
}


export default reducer;