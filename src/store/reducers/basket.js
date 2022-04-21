import * as actionTypes from '../actions/actionTypes';

const initialState = {
    courseName: null,
    price: null,
    courseType: null
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COURSE_TO_BASKET:
            return {
                ...state,
                courseName: action.courseName,
                price: action.price
            }
        // case actionTypes.UPDATE_BASKET:
        //     return {
        //         ...state,
        //         courseType: action.courseType
        //     }

        default: return state;
    }
}


export default reducer;