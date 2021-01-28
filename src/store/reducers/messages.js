import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    messages: [],
    loading: false
};

const getMessagesSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        messages: action.messages
    });
}

const getMessagesFailed = (state) => {
    return updateObject(state, {loading: false});
}

const getMessagesStart = (state) => {
    return updateObject(state, {loading: true});
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGES_SUCCESS:
            return getMessagesSuccess(state, action);
        case actionTypes.GET_MESSAGES_FAILED:
            return getMessagesFailed(state);
        case actionTypes.GET_MESSAGES_START:
            return getMessagesStart(state);
        default:
            return state;
    }
}

export default reducer;