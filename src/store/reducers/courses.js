import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chooseTitle: '',
    courses: [],
    error: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_COURSES:
            return {
                ...state,
                courses: action.loadedCourses,
                error: false,
                chooseTitle: action.chooseTitle
            }
        case actionTypes.LOADING_COURSES_FAILED:
            return {
                ...state,
                error: true
            }
        default: return state;
    }
}


export default reducer;