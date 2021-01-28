import * as actionTypes from './actionTypes';
import axios from '../../network/axios';

export const getLifeReviewSuccess = (articleItems) => {
    return {
        type: actionTypes.GET_LIFEREVIEW_SUCCESS,
        articleItems: articleItems
    };
};

export const getLifeReviewFailed = (error) => {
    return {
        type: actionTypes.GET_LIFEREVIEW_FAILED,
        error: error
    };
};

export const getLifeReviewStart = () => {
    return {
        type: actionTypes.GET_LIFEREVIEW_START
    };
}

export const getLifeReview = () => {
    return dispatch => {
        dispatch(getLifeReviewStart());

        axios.get('/lifereview.json')
        .then(res => {
            const articleItems = [];

            for(const id in res.data){
                articleItems.push({ 
                    ...res.data[id],
                    id: id
                });
            }

            articleItems.sort((a,b) => {
                return a.order - b.order;
            });

            dispatch(getLifeReviewSuccess(articleItems));
        })
        .catch(err => {
            dispatch(getLifeReviewFailed());
        });
    }
}