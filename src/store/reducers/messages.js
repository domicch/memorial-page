import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    messages: null,
    loading: false,
    error: null
};

const getMessagesSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        error: null,
        messages: action.messages
    });
}

const getMessagesFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const getMessagesStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null
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
        default:
            return state;
    }
}

export default reducer;