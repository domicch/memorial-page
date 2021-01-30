import * as actionTypes from './actionTypes';
import axios from '../../network/axios';
import firebase from 'firebase';
import { app } from "../../base";

export const createMessageSuccess = () => {
    return {
        type: actionTypes.CREATE_MESSAGE_SUCCESS
    };
};

export const createMessageFailed = (error) => {
    return {
        type: actionTypes.CREATE_MESSAGE_FAILED,
        error: error
    };
};

export const createMessageStart = () => {
    return {
        type: actionTypes.CREATE_MESSAGE_START
    };
}

const uploadImage = async (filename, file, contentType, isBase64) => {
    const storageRef = app.storage().ref();

    let fileRef = storageRef.child(filename);
    let downloadURL = null;

   
    if(isBase64){
        await fileRef.putString(file, 'base64', {contentType:contentType})
    }else{
        await fileRef.put(file);
    }
    downloadURL = await fileRef.getDownloadURL();
    
    return downloadURL;
}

export const createMessage = (userId, message, originalImage, resizedImageBase64) => {
    return dispatch => {
        dispatch(createMessageStart());

        let fileNamePrefix = userId + '-' + new Date().getTime();

        if(originalImage){
            let originalImageURL = null;
            
            try{
                originalImageURL = uploadImage(
                    fileNamePrefix+'-1',
                    originalImage,
                    originalImage.type,
                    false);
                
                message['originalImageURL'] = originalImageURL;
            }catch(error){
                console.log("uploadImage original error", error);
                dispatch(createMessageFailed(error));
                return;
            }

            if(resizedImageBase64){
                let resizedImageURL = null;
                
                try{
                    uploadImage(
                        fileNamePrefix+'-2',
                        resizedImageBase64,
                        originalImage.type,
                        true);
                    
                    message['resizedImageURL'] = resizedImageURL;
                }catch(error){
                    console.log("uploadImage resized error", error);
                    dispatch(createMessageFailed(error));
                    return;
                }
            }
            
        }

        // add order and timestamp as server timestamp
        message['timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
        message['order'] = firebase.firestore.FieldValue.serverTimestamp();


        app.firestore().collection("messages").add(message)
            .then(response => {
                console.log("createMessage: success", response);
                dispatch(createMessageSuccess());
            })
            .catch(function(error) {
                console.log("createMessage: failed", error);
                dispatch(createMessageFailed(error));
            });
    }
}