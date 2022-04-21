import * as actionTypes from './actionTypes';


export const archiveMode = data => {
    return {
        type: actionTypes.ARCHIVE_MODE,
        data
    }
}