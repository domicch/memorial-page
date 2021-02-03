import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    authenticated: false,
    loading: false,
    authProvider: null,
    userId: null
};

const loginSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        authenticated: true,
        authProvider: action.authProvider,
        userId: action.userId
    });
}

const loginFailed = (state) => {
    return updateObject(state, {
        loading: false,
        authenticated: false,
        authProvider: null,
        userId: null
    });
}

const loginStart = (state) => {
    return updateObject(state, {
        loading: true,
        authenticated: false,
        authProvider: null,
        userId: null
    });
}

const logoutSuccess = (state, action) => {
    return updateObject(state, 
    {
        loading: false,
        authenticated: false,
        authProvider: null,
        userId: null
    });
}

const logoutFailed = (state) => {
    return updateObject(state, {loading: false});
}

const logoutStart = (state) => {
    return updateObject(state, {loading: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state);
        case actionTypes.LOGIN_START:
            return loginStart(state);
        case actionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        case actionTypes.LOGOUT_FAILED:
            return logoutFailed(state);
        case actionTypes.LOGOUT_START:
            return logoutStart(state);
        default:
            return state;
    }
}

export default reducer;