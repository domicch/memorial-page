import * as actionTypes from './actionTypes';
import { app } from "../../base";

export const getMessageSuccess = (message) => {
    return {
        type: actionTypes.GET_MESSAGE_SUCCESS,
        message: message
    };
};

export const getMessageFailed = (error) => {
    return {
        type: actionTypes.GET_MESSAGE_FAILED,
        error: error
    };
};

export const getMessageStart = () => {
    return {
        type: actionTypes.GET_MESSAGE_START
    };
}

export const getMessage = (messageId) => {
    return dispatch => {
        dispatch(getMessageStart());

        app.firestore().collection("messages").doc(messageId).get()
            .then(snapshot => {
                if(snapshot.exists) {
                    dispatch(getMessageSuccess(
                        {
                            ...snapshot.data(),
                            ...{id: snapshot.id}
                        }
                    ));
                }else{
                    dispatch(getMessageFailed(new Error('errors.record_not_found')));
                }
            })
            .catch(err => {
                dispatch(getMessageFailed(err));
            });
    }
}