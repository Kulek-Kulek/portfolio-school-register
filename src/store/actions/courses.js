import * as actionTypes from './actionTypes';


export const loadCourses = (loadedCourses = [], chooseTitle) => {
    return {
        type: actionTypes.LOAD_COURSES,
        loadedCourses,
        chooseTitle
    }
}

export const loadingCoursesFailed = () => {
    return {
        type: actionTypes.LOADING_COURSES_FAILED
    }
}

export const fetchCourses = (chooseTitle) => {
    return dispatch => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'offers')
            .then(res => res.json())
            .then(data => dispatch(loadCourses(data.courses, chooseTitle)))
            .catch(err => {
                dispatch(loadingCoursesFailed());
            })
    }
}