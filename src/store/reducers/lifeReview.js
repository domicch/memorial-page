import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    articleItems: [],
    loading: false
};

const getLifeReviewSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        articleItems: action.articleItems
    });
}

const getLifeReviewFailed = (state) => {
    return updateObject(state, {loading: false});
}

const getLifeReviewStart = (state) => {
    return updateObject(state, {loading: true});
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIFEREVIEW_SUCCESS:
            return getLifeReviewSuccess(state, action);
        case actionTypes.GET_LIFEREVIEW_FAILED:
            return getLifeReviewFailed(state);
        case actionTypes.GET_LIFEREVIEW_START:
            return getLifeReviewStart(state);
        default:
            return state;
    }
}

export default reducer;