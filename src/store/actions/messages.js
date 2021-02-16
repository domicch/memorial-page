import * as actionTypes from './actionTypes';
import { app } from "../../base";

export const getMessagesSuccess = (messages, lastMessageSnapshot, hasMoreMessages) => {
    return {
        type: actionTypes.GET_MESSAGES_SUCCESS,
        messages: messages,
        lastMessageSnapshot: lastMessageSnapshot,
        hasMoreMessages: hasMoreMessages
    };
};

export const getMessagesFailed = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAILED,
        error: error
    };
};

export const getMoreMessagesSuccess = (messages, lastMessageSnapshot, hasMoreMessages) => {
    return {
        type: actionTypes.GET_MORE_MESSAGES_SUCCESS,
        messages: messages,
        lastMessageSnapshot: lastMessageSnapshot,
        hasMoreMessages: hasMoreMessages
    };
};

export const getMoreMessagesFailed = (error) => {
    return {
        type: actionTypes.GET_MORE_MESSAGES_FAILED,
        error: error
    };
};

export const getMessagesStart = () => {
    return {
        type: actionTypes.GET_MESSAGES_START
    };
}

export const getMoreMessagesStart = () => {
    return {
        type: actionTypes.GET_MORE_MESSAGES_START
    };
}

const BATCH_SIZE = 5;

export const getMessages = () => {
    return async dispatch => {
        dispatch(getMessagesStart());

        try{
            let snapshot = await app.firestore().collection("messages").orderBy("order").limit(BATCH_SIZE).get();
            const messages = [];
            let lastMessageSnapshot = null;
            let hasMoreMessages = false;

            snapshot.forEach(message => {
                messages.push({
                    ...message.data(),
                    id: message.id
                });
            });

            if(messages.length > 0){
                lastMessageSnapshot = snapshot.docs[snapshot.docs.length-1];
            }

            if(lastMessageSnapshot){
                snapshot = await app.firestore().collection("messages").where("order", ">", lastMessageSnapshot.data().order).get();
                if(!snapshot.empty){
                    hasMoreMessages = true;
                }
            }
            
            dispatch(getMessagesSuccess(messages, lastMessageSnapshot, hasMoreMessages));
            
        }catch(err){
            dispatch(getMessagesFailed(err));
        }
    }
}

export const getMoreMessages = () => {
    return async (dispatch, getState) => {
        let lastMessageSnapshot = getState().messages.lastMessageSnapshot;
        let hasMoreMessages = false;

        dispatch(getMoreMessagesStart());
        try{
            let snapshot = null;
            
            if(lastMessageSnapshot){
                snapshot = await app.firestore().collection("messages")
                    .orderBy("order")
                    .startAfter(lastMessageSnapshot)
                    .limit(BATCH_SIZE)
                    .get();
            }else{
                snapshot = await app.firestore().collection("messages")
                    .orderBy("order")
                    .limit(BATCH_SIZE)
                    .get();
            }
            
            const messages = [];

            snapshot.forEach(message => {
                messages.push({
                    ...message.data(),
                    id: message.id
                });
            });

            if(messages.length > 0){
                lastMessageSnapshot = snapshot.docs[snapshot.docs.length-1];
            }

            if(lastMessageSnapshot){
                snapshot = await app.firestore().collection("messages").where("order", ">", lastMessageSnapshot.data().order).get();
                if(!snapshot.empty){
                    hasMoreMessages = true;
                }
            }
            
            dispatch(getMoreMessagesSuccess(messages, lastMessageSnapshot, hasMoreMessages));
                
        }catch(err) {
            dispatch(getMoreMessagesFailed(err));
        }
    }
}