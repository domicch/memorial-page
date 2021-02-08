import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import { app } from "../../base";

export const getArticleSuccess = (article) => {
    return {
        type: actionTypes.GET_ARTICLE_SUCCESS,
        article: article
    };
};

export const getArticleFailed = (error) => {
    return {
        type: actionTypes.GET_ARTICLE_FAILED,
        error: error
    };
};

export const getArticleStart = () => {
    return {
        type: actionTypes.GET_ARTICLE_START
    };
}

export const getArticle = (articleId) => {
    return dispatch => {
        dispatch(getArticleStart());

        app.firestore().collection("lifereview").doc(articleId).get()
            .then(snapshot => {
                if (snapshot.exists) {
                    dispatch(getArticleSuccess(
                        {
                            ...snapshot.data(),
                            ...{ id: snapshot.id }
                        }
                    ));
                } else {
                    dispatch(getArticleFailed(new Error('errors.record_not_found')));
                }
            })
            .catch(err => {
                dispatch(getArticleFailed(err));
            });
    }
}

export const updateArticleSuccess = () => {
    return {
        type: actionTypes.UPDATE_ARTICLE_SUCCESS
    };
};

export const updateArticleFailed = (error) => {
    return {
        type: actionTypes.UPDATE_ARTICLE_FAILED,
        error: error
    };
};

export const updateArticleStart = () => {
    return {
        type: actionTypes.UPDATE_ARTICLE_START
    };
}

const uploadImage = async (filename, file, contentType, isBase64) => {
    const storageRef = app.storage().ref();

    let fileRef = storageRef.child(filename);
    let downloadURL = null;


    if (isBase64) {
        await fileRef.putString(file, 'base64', { contentType: contentType })
    } else {
        await fileRef.put(file);
    }
    downloadURL = await fileRef.getDownloadURL();

    return downloadURL;
}

const deleteImage = async (filename) => {
    const storageRef = app.storage().ref();
    let fileRef = storageRef.child(filename);

    await fileRef.delete();
}

export const updateArticleReset = () => {
    return {
        type: actionTypes.UPDATE_ARTICLE_RESET
    };
}

export const updateArticle = (userId, articleId, article, imageModified, imageFiles) => {
    return async dispatch => {
        dispatch(updateArticleStart());

        if (article.type === 'image') {
            const updateArticle = {};

            if (!imageModified) {
                dispatch(updateArticleSuccess());
                return;
            }

            if(imageFiles.length == 0){
                dispatch(updateArticleSuccess());
                return;
            }

            const fileNamePrefix = userId + '-' + new Date().getTime();
            let originalImage = imageFiles[0].original;
            let resizedImageBase64 = imageFiles[0].resized;

            if (originalImage) {
                let originalImageURL = null;

                try {
                    originalImageURL = await uploadImage(
                        'lifereview/original/' + fileNamePrefix + '-0-ori',
                        originalImage,
                        originalImage.type,
                        false);

                        updateArticle['originalImageURL'] = originalImageURL;
                        updateArticle['originalImageFilename'] = fileNamePrefix + '-0-ori';
                } catch (error) {
                    console.log("updateArticle: uploadImage original error ", error);
                    dispatch(updateArticleFailed(new Error('Upload original image failed')));
                    return;
                }

                if (resizedImageBase64) {
                    let resizedImageURL = null;
                    resizedImageBase64 = resizedImageBase64.substring(resizedImageBase64.indexOf(',') + 1);

                    try {
                        resizedImageURL = await uploadImage(
                            'lifereview/resized/' + fileNamePrefix + '-0-r1',
                            resizedImageBase64,
                            // originalImage.type,
                            'image/jpeg',
                            true);

                            updateArticle['resizedImageURL'] = resizedImageURL;
                            updateArticle['resizedImageFilename'] = fileNamePrefix + '-0-r1';
                    } catch (error) {
                        console.log("updateArticle: uploadImage original error ", error);
                        dispatch(updateArticleFailed(new Error('Upload resized image failed')));
                        return;
                    }
                }
            }

            updateArticle['update_timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
            updateArticle['caption'] = article.caption;

            try {
                await app.firestore().collection("lifereview").doc(articleId).update(updateArticle);
                dispatch(updateArticleSuccess());
            } catch (error) {
                console.log("updateArticle: upload firestore failed", error);
                dispatch(updateArticleFailed(new Error('Failed to update article')));
            }
            
        }else if(article.type === 'article'){
            try {
                await app.firestore().collection("lifereview").doc(articleId).update({
                    update_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    title: article.title,
                    content: article.content
                });
                dispatch(updateArticleSuccess());
            } catch (error) {
                console.log("updateArticle: upload firestore failed", error);
                dispatch(updateArticleFailed(new Error('Failed to update article')));
            }
        }
    }
}

export const deleteArticleSuccess = () => {
    return {
        type: actionTypes.DELETE_ARTICLE_SUCCESS
    };
};

export const deleteArticleFailed = (error) => {
    return {
        type: actionTypes.DELETE_ARTICLE_FAILED,
        error: error
    };
};

export const deleteArticleStart = () => {
    return {
        type: actionTypes.DELETE_ARTICLE_START
    };
}

export const deleteArticle = (articleId, article) => {
    return async dispatch => {
        dispatch(deleteArticleStart());

        if (article.type === 'image') {
            try {
                await deleteImage('lifereview/original/' +article.originalImageFilename);
                await deleteImage('lifereview/resized/' +article.resizedImageFilename);
                await app.firestore().collection("lifereview").doc(articleId).delete();
                dispatch(deleteArticleSuccess());
            } catch (error) {
                console.log(error);
                dispatch(deleteArticleFailed(error));
            }
            
        }else if(article.type === 'article'){
            try {
                await app.firestore().collection("lifereview").doc(articleId).delete();
                dispatch(deleteArticleSuccess());
            } catch (error) {
                console.log(error);
                dispatch(deleteArticleFailed(error));
            }
        }
    }
}