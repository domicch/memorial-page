import * as actionTypes from './actionTypes';
import axios from '../../network/axios';

export const createMessageSuccess = () => {
    return {
        type: actionTypes.CREATE_MESSAGE_SUCCESS
    };
};

export const createMessageFailed = (error) => {
    return {
        type: actionTypes.CREATE_MESSAGE_FAILED,
        error: error
    };
};

export const createMessageStart = () => {
    return {
        type: actionTypes.CREATE_MESSAGE_START
    };
}

export const createMessage = (message) => {
    return dispatch => {
        dispatch(createMessageStart());
        axios.post('messages.json', message)
            .then(response => {
                dispatch(createMessageSuccess());
            })
            .catch(error => {
                dispatch(createMessageFailed(error));
            })
    }
}