import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadedData: [],
    updatedData: null,
    infoType: null,
    settingsInfoType: null,
    studentId: null,
    teacherId: null,
    groupId: null,
    gradeId: null,
    topicId: null,
    loadData: [],
    sender: null,
    recipients: [],
    loading: false,
    imageFile: null,
    appSettings: [{
        schoolYearSchedlue: {
            schoolYearStart: "2020-09-01T00:00:00.000Z",
            firstTermEnd: "2021-01-17T00:00:00.000Z",
            schoolYearEnd: "2021-06-30T00:00:00.000Z",
        },
        rodo: [],
        cources: [],
        bankAccount: 'Brak danych'
    }]
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_IMAGE_FILE:
            return {
                ...state,
                imageFile: action.file
            }
        case actionTypes.INFO_TYPE_CHANGE:
            return {
                ...state,
                infoType: action.infoType
            }
        case actionTypes.SETTINGS_INFO_TYPE_CHANGE:
            return {
                ...state,
                settingsInfoType: action.settingsInfoType
            }
        case actionTypes.ADD_NEW_DATA:
            return {
                ...state,
                loadedData: state.loadedData.concat(action.updatedData)
            }
        case actionTypes.DELETE_DATA:
            return {
                ...state,
                ...state.loadedData,
                loadedData: state.loadedData.filter(item => item.id !== action.id)
            }
        case actionTypes.LOAD_DATA:
            return {
                ...state,
                loadData: action.loadedData || [],
            }
        case actionTypes.LOADED_DATA:
            return {
                ...state,
                loadedData: action.loadedData || [],
            }
        case actionTypes.UPDATED_DATA:
            return {
                ...state,
                updatedData: action.updatedData || [],
            }
        case actionTypes.UPDATE_LOADED_DATA:
            const updatedLoadedData = [...state.loadedData];
            const index = updatedLoadedData.findIndex(doc => doc._id === action.updatedData.id);
            updatedLoadedData.splice(index, 1, action.updatedData);
            return {
                ...state,
                ...state.loadedData,
                loadedData: updatedLoadedData,
            }
        case actionTypes.SEND_EMAIL_MESSAGE:
            return {
                ...state,
                sender: action.sender,
                recipients: action.recipients
            }
        case actionTypes.ID_PROVIDER:
            return {
                ...state,
                studentId: action.modifier ? state.studentId : null,
                teacherId: action.modifier ? state.teacherId : null,
                groupId: action.modifier ? state.groupId : null,
                [action.idType]: action.id
            }
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTypes.APP_SETTINGS:
            return {
                ...state,
                appSettings: action.appSettings
            }
        default: return state;
    }
}


export default reducer;