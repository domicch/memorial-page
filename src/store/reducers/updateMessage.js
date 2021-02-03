import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false,
    updateMessageError: null,
    updateMessageSuccess: false
};

const updateMessageSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        updateMessageSuccess: true,
        updateMessageError: null
    });
}

const updateMessageFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateMessageSuccess: false,
        updateMessageError: action.error
    });
}

const updateMessageStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateMessageSuccess: false,
        updateMessageError: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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