import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false
};

const createMessageSuccess = (state) => {
    return updateObject(state, {loading: false});
}

const createMessageFailed = (state) => {
    return updateObject(state, {loading: false});
}

const createMessageStart = (state) => {
    return updateObject(state, {loading: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MESSAGE_START:
            return createMessageStart();
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            return createMessageSuccess();
        case actionTypes.CREATE_MESSAGE_FAILED:
            return createMessageFailed();
        default:
            return state;
    }
}

export default reducer;