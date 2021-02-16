import * as actionTypes from './actionTypes';
import { app } from "../../base";

export const getLifeReviewSuccess = (articleItems, lastArticleSnapshot, hasMoreArticles) => {
    return {
        type: actionTypes.GET_LIFEREVIEW_SUCCESS,
        articleItems: articleItems,
        lastArticleSnapshot: lastArticleSnapshot,
        hasMoreArticles: hasMoreArticles
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

const BATCH_SIZE = 5;

export const getLifeReview = () => {
    return async dispatch => {
        dispatch(getLifeReviewStart());

        try{
            let snapshot = await app.firestore()
                .collection("lifereview")
                .orderBy("order")
                .limit(BATCH_SIZE)
                .get();

            const articleItems = [];
            let lastArticleSnapshot = null;
            let hasMoreArticles = false;

            snapshot.forEach(articleItem => {
                articleItems.push({
                    ...articleItem.data(),
                    id: articleItem.id
                });
            });

            if(articleItems.length > 0){
                lastArticleSnapshot = snapshot.docs[snapshot.docs.length - 1];
            }

            if(lastArticleSnapshot){
                snapshot = await app.firestore()
                    .collection("lifereview")
                    .where("order", ">", lastArticleSnapshot.data().order)
                    .get();
                if(!snapshot.empty){
                    hasMoreArticles = true;
                }
            }

            dispatch(getLifeReviewSuccess(articleItems, lastArticleSnapshot, hasMoreArticles));
            
        }catch(err){
            dispatch(getLifeReviewFailed(err));
        }
    }
}


export const getMoreLifeReviewSuccess = (articleItems, lastArticleSnapshot, hasMoreArticles) => {
    return {
        type: actionTypes.GET_MORE_LIFEREVIEW_SUCCESS,
        articleItems: articleItems,
        lastArticleSnapshot: lastArticleSnapshot,
        hasMoreArticles: hasMoreArticles
    };
};

export const getMoreLifeReviewFailed = (error) => {
    return {
        type: actionTypes.GET_MORE_LIFEREVIEW_FAILED,
        error: error
    };
};

export const getMoreLifeReviewStart = () => {
    return {
        type: actionTypes.GET_MORE_LIFEREVIEW_START
    };
}

export const getMoreLifeReview = () => {
    return async (dispatch, getState) => {
        let lastArticleSnapshot = getState().lifeReview.lastArticleSnapshot;
        let hasMoreArticles = false;

        dispatch(getMoreLifeReviewStart());
        try{
            let snapshot = null;
            
            if(lastArticleSnapshot){
                snapshot = await app.firestore().collection("lifereview")
                    .orderBy("order")
                    .startAfter(lastArticleSnapshot)
                    .limit(BATCH_SIZE)
                    .get();
            }else{
                snapshot = await app.firestore().collection("lifereview")
                    .orderBy("order")
                    .limit(BATCH_SIZE)
                    .get();
            }
            
            const articleItems = [];

            snapshot.forEach(message => {
                articleItems.push({
                    ...message.data(),
                    id: message.id
                });
            });

            if(articleItems.length > 0){
                lastArticleSnapshot = snapshot.docs[snapshot.docs.length-1];
            }

            if(lastArticleSnapshot){
                snapshot = await app.firestore()
                .collection("lifereview")
                .where("order", ">", lastArticleSnapshot.data().order)
                .get();

                if(!snapshot.empty){
                    hasMoreArticles = true;
                }
            }
            
            dispatch(getMoreLifeReviewSuccess(articleItems, lastArticleSnapshot, hasMoreArticles));
                
        }catch(err) {
            dispatch(getMoreLifeReviewFailed(err));
        }
    }
}