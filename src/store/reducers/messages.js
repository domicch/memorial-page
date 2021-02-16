import * as actionTypes from '../actions/actionTypes';
import {updateObject, appendArray} from '../../utility/utility';

const initialState = {
    messages: null,
    lastMessageSnapshot: null,
    hasMoreMessages: false,
    loading: false,
    error: null,
    moreError: null
};

const getMessagesSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        error: null,
        messages: action.messages,
        lastMessageSnapshot: action.lastMessageSnapshot,
        hasMoreMessages: action.hasMoreMessages
    });
}

const getMessagesFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        messages: null,
        lastMessageSnapshot: null,
        hasMoreMessages: false
    });
}

const getMessagesStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
        messages: null,
        lastMessageSnapshot: null,
        hasMoreMessages: false
    });
}

const getMoreMessagesStart = (state) => {
    return updateObject(state,{
        moreError: null
    });
}

const getMoreMessagesSuccess = (state, action) => {
    const newMessages = appendArray(state.messages, action.messages);
    
    return updateObject(state, 
    {
        moreError: null,
        messages: newMessages,
        lastMessageSnapshot: action.lastMessageSnapshot,
        hasMoreMessages: action.hasMoreMessages
    });
}

const getMoreMessagesFailed = (state, action) => {
    return updateObject(state, {
        moreError: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGES_SUCCESS:
            return getMessagesSuccess(state, action);
        case actionTypes.GET_MESSAGES_FAILED:
            return getMessagesFailed(state, action);
        case actionTypes.GET_MESSAGES_START:
            return getMessagesStart(state, action);
        case actionTypes.GET_MORE_MESSAGES_START:
            return getMoreMessagesStart(state, action);
        case actionTypes.GET_MORE_MESSAGES_SUCCESS:
            return getMoreMessagesSuccess(state, action);
        case actionTypes.GET_MORE_MESSAGES_FAILED:
            return getMoreMessagesFailed(state, action);
        default:
            return state;
    }
}

export default reducer;