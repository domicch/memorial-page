import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false,
    createArticleError: null,
    createArticleSuccess: false
};

const createArticleSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        createArticleSuccess: true,
        createArticleError: null
    });
}

const createArticleFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        createArticleSuccess: false,
        createArticleError: action.error
    });
}

const createArticleReset = (state, action) => {
    return updateObject(state, {
        loading: false,
        createArticleSuccess: false,
        createArticleError: null
    });
}

const createArticleStart = (state) => {
    return updateObject(state, {
        loading: true,
        createArticleSuccess: false,
        createArticleError: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ARTICLE_START:
            return createArticleStart(state, action);
        case actionTypes.CREATE_ARTICLE_SUCCESS:
            return createArticleSuccess(state, action);
        case actionTypes.CREATE_ARTICLE_FAILED:
            return createArticleFailed(state, action);
        case actionTypes.CREATE_ARTICLE_RESET:
            return createArticleReset(state, action);
        default:
            return state;
    }
}

export default reducer;