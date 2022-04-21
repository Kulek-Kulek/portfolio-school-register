import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chooseTitle: '',
    groups: null,
    error: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_GROUPS:
            return {
                ...state,
                groups: action.loadedGroups,
                error: false,
                chooseTitle: action.chooseTitle
            }
        // case actionTypes.SELECT_INPUT_CHOOSE_TITLE:
        //     return {
        //         ...state,
        //         chooseTitle: action.chooseTitle
        //     }
        case actionTypes.LOADING_GROUPS_FAILED:
            return {
                ...state,
                error: true
            }
        default: return state;
    }
}


export default reducer;