import * as actionTypes from './actionTypes';
import { app } from "../../base";

export const getMessagesSuccess = (messages) => {
    return {
        type: actionTypes.GET_MESSAGES_SUCCESS,
        messages: messages
    };
};

export const getMessagesFailed = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAILED,
        error: error
    };
};

export const getMessagesStart = () => {
    return {
        type: actionTypes.GET_MESSAGES_START
    };
}

export const getMessages = () => {
    return dispatch => {
        dispatch(getMessagesStart());

        app.firestore().collection("messages").orderBy("order").get()
            .then(snapshot => {
                const messages = [];

                snapshot.forEach(message => {
                    
                    messages.push({
                        ...message.data(),
                        id: message.id
                    });
                });
                
                dispatch(getMessagesSuccess(messages));
            })
            .catch(err => {
                dispatch(getMessagesFailed(err));
            });
    }
}