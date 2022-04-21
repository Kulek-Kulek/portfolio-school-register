import * as actionTypes from './actionTypes';


export const addCourseToBasket = (courseName, price) => {
    return {
        type: actionTypes.ADD_COURSE_TO_BASKET,
        courseName,
        price
    }
}

// export const updateBasket = (courseType) => {
//     return {
//         type: actionTypes.UPDATE_BASKET,
//         courseType
//     }
// }