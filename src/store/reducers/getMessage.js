import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    message: null,
    loading: false,
    error: null
};

const getMessageSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        error: null,
        message: action.message
    });
}

const getMessageFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        message: null
    });
}

const getMessageStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
        message: null
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
        default:
            return state;
    }
}

export default reducer;