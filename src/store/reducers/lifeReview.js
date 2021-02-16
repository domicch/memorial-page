import * as actionTypes from '../actions/actionTypes';
import {appendArray, updateObject} from '../../utility/utility';

const initialState = {
    articleItems: null,
    loading: false,
    error: null,
    lastArticleSnapshot: null,
    hasMoreArticles: false,
    moreError: null
};

const getLifeReviewSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        error: null,
        articleItems: action.articleItems,
        lastArticleSnapshot: action.lastArticleSnapshot,
        hasMoreArticles: action.hasMoreArticles
    });
}

const getLifeReviewFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        articleItems: null,
        lastArticleSnapshot: null,
        hasMoreArticles: false
    });
}

const getLifeReviewStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
        articleItems: null,
        lastArticleSnapshot: null,
        hasMoreArticles: false
    });
}

const getMoreLifeReviewSuccess = (state, action) => {
    const newArticles = appendArray(state.articleItems, action.articleItems);
    
    return updateObject(state, 
    {
        moreError: null,
        articleItems: newArticles,
        lastArticleSnapshot: action.lastArticleSnapshot,
        hasMoreArticles: action.hasMoreArticles
    });
}

const getMoreLifeReviewFailed = (state, action) => {
    return updateObject(state, {
        moreError: action.error
    });
}

const getMoreLifeReviewStart = (state) => {
    return updateObject(state, {
        moreError: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIFEREVIEW_SUCCESS:
            return getLifeReviewSuccess(state, action);
        case actionTypes.GET_LIFEREVIEW_FAILED:
            return getLifeReviewFailed(state, action);
        case actionTypes.GET_LIFEREVIEW_START:
            return getLifeReviewStart(state, action);
        case actionTypes.GET_MORE_LIFEREVIEW_SUCCESS:
            return getMoreLifeReviewSuccess(state, action);
        case actionTypes.GET_MORE_LIFEREVIEW_FAILED:
            return getMoreLifeReviewFailed(state, action);
        case actionTypes.GET_MORE_LIFEREVIEW_START:
            return getMoreLifeReviewStart(state, action);
        default:
            return state;
    }
}

export default reducer;