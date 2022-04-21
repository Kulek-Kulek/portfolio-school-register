import * as actionTypes from './actionTypes';


export const infoTypeChange = infoType => {
    return {
        type: actionTypes.INFO_TYPE_CHANGE,
        infoType
    }
}

export const settingsInfoType = settingsInfoType => {
    return {
        type: actionTypes.SETTINGS_INFO_TYPE_CHANGE,
        settingsInfoType
    }
}


export const addNewData = updatedData => {
    return {
        type: actionTypes.ADD_NEW_DATA,
        updatedData
    }
}
export const deleteData = id => {
    return {
        type: actionTypes.DELETE_DATA,
        id
    }
}


export const loadData = (loadedData) => {
    return {
        type: actionTypes.LOAD_DATA,
        loadedData,
    }
}

export const loadedData = loadedData => {
    return {
        type: actionTypes.LOADED_DATA,
        loadedData,
    }
}


export const updatedData = updatedData => {
    return {
        type: actionTypes.UPDATED_DATA,
        updatedData,
    }
}

export const updateLoadedData = updatedData => {
    return {
        type: actionTypes.UPDATE_LOADED_DATA,
        updatedData,
    }
}



export const loadImageFile = file => {
    return {
        type: actionTypes.LOAD_IMAGE_FILE,
        file
    }
}



export const idProvider = (id, idType, modifier) => {
    return {
        type: actionTypes.ID_PROVIDER,
        id,
        idType,
        modifier
    }
}

export const loading = loading => {
    return {
        type: actionTypes.LOADING,
        loading
    }
}

export const sendEmailMessage = (sender, recipients = []) => {
    return {
        type: actionTypes.SEND_EMAIL_MESSAGE,
        sender,
        recipients
    }
}



export const appSettings = (appSettings = []) => {
    return {
        type: actionTypes.APP_SETTINGS,
        appSettings
    }
}


export const fetchSettings = () => {
    return dispatch => {
        fetch(process.env.REACT_APP_BACKEND_URL + 'settings/')
            .then(res => res.json())
            .then(data => dispatch(appSettings(data.settings)))
            .catch(err => { })
    }
}