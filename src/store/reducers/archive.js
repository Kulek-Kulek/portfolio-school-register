import * as actionTypes from '../actions/actionTypes';

const initialState = {
    archiveMode: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ARCHIVE_MODE:
            return {
                ...state,
                archiveMode: action.data
            }
        default: return state;
    }
}


export default reducer;