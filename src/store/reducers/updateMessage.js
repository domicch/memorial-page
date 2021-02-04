import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false,
    error: null,
    updateMessageSuccess: false,
    message: null
};

const getMessageSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        message: action.message,
        error: null
    });
}

const getMessageFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: null,
        error: action.error
    });
}

const getMessageStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateMessageSuccess: false,
        message: null,
        error: null
    });
}

const updateMessageSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
        updateMessageSuccess: true
    });
}

const updateMessageFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateMessageSuccess: false,
        error: action.error
    });
}

const updateMessageStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateMessageSuccess: false,
        error: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGE_SUCCESS:
            return getMessageSuccess(state, action);
        case actionTypes.GET_MESSAGE_FAILED:
            return getMessageFailed(state, action);
        case actionTypes.GET_MESSAGE_START:
            return getMessageStart(state, action);
        case actionTypes.UPDATE_MESSAGE_START:
            return updateMessageStart(state, action);
        case actionTypes.UPDATE_MESSAGE_SUCCESS:
            return updateMessageSuccess(state, action);
        case actionTypes.UPDATE_MESSAGE_FAILED:
            return updateMessageFailed(state, action);
        default:
            return state;
    }
}

export default reducer;