import * as actionTypes from './actionTypes';
import { app } from "../../base";

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

        app.firestore().collection("lifereview").orderBy("order").get()
            .then(snapshot => {
                const articleItems = [];

                snapshot.forEach(articleItem => {
                    
                    articleItems.push({
                        ...articleItem.data(),
                        id: articleItem.id
                    });
                });

                dispatch(getLifeReviewSuccess(articleItems));
            })
            .catch(err => {
                dispatch(getLifeReviewFailed(err));
            });
    }
}