import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false,
    createMessageError: null,
    createMessageSuccess: false
};

const createMessageSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        createMessageSuccess: true,
        createMessageError: null
    });
}

const createMessageFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        createMessageSuccess: false,
        createMessageError: action.error
    });
}

const createMessageReset = (state, action) => {
    return updateObject(state, {
        loading: false,
        createMessageSuccess: false,
        createMessageError: null
    });
}

const createMessageStart = (state) => {
    return updateObject(state, {
        loading: true,
        createMessageSuccess: false,
        createMessageError: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MESSAGE_START:
            return createMessageStart(state, action);
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            return createMessageSuccess(state, action);
        case actionTypes.CREATE_MESSAGE_FAILED:
            return createMessageFailed(state, action);
        case actionTypes.CREATE_MESSAGE_RESET:
            return createMessageReset(state, action);
        default:
            return state;
    }
}

export default reducer;