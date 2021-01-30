import * as actionTypes from './actionTypes';
import axios from '../../network/axios';
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

        // axios.get('/messages.json')
        // .then(res => {
        //     const messages = [];

        //     for(const id in res.data){
        //         messages.push({ 
        //             ...res.data[id],
        //             id: id
        //         });
        //     }

        //     messages.sort((a,b) => {
        //         return a.order - b.order;
        //     });

        //     dispatch(getMessagesSuccess(messages));
        // })
        // .catch(err => {
        //     dispatch(getMessagesFailed());
        // });

        app.firestore().collection("messages").orderBy("order").get()
            .then(snapshot => {
                const messages = [];

                snapshot.forEach(message => {
                    
                    messages.push({
                        ...message.data(),
                        id: message.id
                    });
                });

                // messages.sort((a, b) => {
                //     return a.order - b.order;
                // });

                dispatch(getMessagesSuccess(messages));
            })
            .catch(err => {
                dispatch(getMessagesFailed());
            });
    }
}