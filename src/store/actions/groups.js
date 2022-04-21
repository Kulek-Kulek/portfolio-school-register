import * as actionTypes from './actionTypes';


export const loadGroups = (loadedGroups = [], chooseTitle) => {
    return {
        type: actionTypes.LOAD_GROUPS,
        loadedGroups,
        chooseTitle
    }
}

export const loadingGroupsFailed = () => {
    return {
        type: actionTypes.LOADING_GROUPS_FAILED
    }
}

export const fetchGroups = (chooseTitle) => {
    return dispatch => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'groups/' + false)
            .then(res => res.json())
            .then(data => dispatch(loadGroups(data.groups, chooseTitle)))
            .catch(err => {
                dispatch(loadingGroupsFailed());
            })
    }
}