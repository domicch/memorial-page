import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    loading: false,
    error: null,
    updateArticleSuccess: false,
    article: null
};

const updateArticleReset = (state, action) => {
    return {
        loading: false,
        error: null,
        updateArticleSuccess: false,
        article: null
    }
}

const getArticleSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        article: action.article,
        error: null
    });
}

const getArticleFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        article: null,
        error: action.error
    });
}

const getArticleStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateArticleSuccess: false,
        article: null,
        error: null
    });
}

const updateArticleSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
        updateArticleSuccess: true
    });
}

const updateArticleFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateArticleSuccess: false,
        error: action.error
    });
}

const updateArticleStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateArticleSuccess: false,
        error: null
    });
}

const deleteArticleSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
        updateArticleSuccess: true
    });
}

const deleteArticleFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateArticleSuccess: false,
        error: action.error
    });
}

const deleteArticleStart = (state) => {
    return updateObject(state, {
        loading: true,
        updateArticleSuccess: false,
        error: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTICLE_SUCCESS:
            return getArticleSuccess(state, action);
        case actionTypes.GET_ARTICLE_FAILED:
            return getArticleFailed(state, action);
        case actionTypes.GET_ARTICLE_START:
            return getArticleStart(state, action);
        case actionTypes.UPDATE_ARTICLE_START:
            return updateArticleStart(state, action);
        case actionTypes.UPDATE_ARTICLE_SUCCESS:
            return updateArticleSuccess(state, action);
        case actionTypes.UPDATE_ARTICLE_FAILED:
            return updateArticleFailed(state, action);
        case actionTypes.UPDATE_ARTICLE_RESET:
            return updateArticleReset(state, action);
        case actionTypes.DELETE_ARTICLE_START:
            return deleteArticleStart(state, action);
        case actionTypes.DELETE_ARTICLE_SUCCESS:
            return deleteArticleSuccess(state, action);
        case actionTypes.DELETE_ARTICLE_FAILED:
            return deleteArticleFailed(state, action);
        default:
            return state;
    }
}

export default reducer;