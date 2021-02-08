import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import { app } from "../../base";

export const createArticleSuccess = () => {
    return {
        type: actionTypes.CREATE_ARTICLE_SUCCESS
    };
};

export const createArticleFailed = (error) => {
    return {
        type: actionTypes.CREATE_ARTICLE_FAILED,
        error: error
    };
};

export const createArticleStart = () => {
    return {
        type: actionTypes.CREATE_ARTICLE_START
    };
}

export const createArticleReset = () => {
    return {
        type: actionTypes.CREATE_ARTICLE_RESET
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

export const createArticle = (userId, article, imageFiles) => {
    return async dispatch => {
        dispatch(createArticleStart());

        const fileNamePrefix = userId + '-' + new Date().getTime();
        const articleImages = [];

        if(article.title || article.content){
            
            try{
                await app.firestore().collection("lifereview").add({
                    type: 'article',
                    title: article.title,
                    content: article.content,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    order: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: userId
                });
            }catch(error){
                console.log("createArticle: upload firestore failed", error);
                dispatch(createArticleFailed(new Error('Failed to create article')));
                return;
            }   
        }

        for (let i = 0; i < imageFiles.length; i++) {
            let originalImage = imageFiles[i].original;
            let resizedImageBase64 = imageFiles[i].resized;

            if (originalImage) {
                let originalImageURL = null;
                let image = {};

                try {
                    originalImageURL = await uploadImage(
                        'lifereview/original/' + fileNamePrefix + '-' + i + '-ori',
                        originalImage,
                        originalImage.type,
                        false);

                    image['originalImageURL'] = originalImageURL;
                    image['originalImageFilename'] = fileNamePrefix + '-'+i+'-ori';
                } catch (error) {
                    console.log("createArticle: uploadImage original["+i+"] error ", error);
                    dispatch(createArticleFailed(new Error('Upload original image '+i+' failed')));
                    return;
                }

                if (resizedImageBase64) {
                    let resizedImageURL = null;
                    resizedImageBase64 = resizedImageBase64.substring(resizedImageBase64.indexOf(',') + 1);

                    try {
                        resizedImageURL = await uploadImage(
                            'lifereview/resized/' + fileNamePrefix + '-' + i + '-r1',
                            resizedImageBase64,
                            // originalImage.type,
                            'image/jpeg',
                            true);

                        image['resizedImageURL'] = resizedImageURL;
                        image['resizedImageFilename'] = fileNamePrefix + '-'+i+'-r1';
                    } catch (error) {
                        console.log("createArticle: uploadImage original["+i+"] error ", error);
                        dispatch(createArticleFailed(new Error('Upload resized image '+i+' failed')));
                        return;
                    }
                }
                articleImages.push(image);
            }
        }

        if(articleImages.length > 0){
            for(const image of articleImages){
                try{
                    await app.firestore().collection("lifereview").add({
                    type: 'image',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    order: firebase.firestore.FieldValue.serverTimestamp(),
                    originalImageURL: image.originalImageURL,
                    originalImageFilename: image.originalImageFilename,
                    resizedImageURL: image.resizedImageURL,
                    resizedImageFilename: image.resizedImageFilename,
                    caption: article.caption,
                    userId: userId
                    });
                }catch(error){
                    console.log("createArticle: upload firestore failed", error);
                    dispatch(createArticleFailed(new Error('Failed to create article image')));
                    return;
                }
            }
        }

        dispatch(createArticleSuccess());
    }
}