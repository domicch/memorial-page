import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState = {
    articleItems: null,
    loading: false,
    error: null
};

const getLifeReviewSuccess = (state, action) => {
    
    return updateObject(state, 
    {
        loading: false,
        error: null,
        articleItems: action.articleItems
    });
}

const getLifeReviewFailed = (state, action) => {
    console.log('lifeReview reducer error: ',action.error);
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const getLifeReviewStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null
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
        default:
            return state;
    }
}

export default reducer;