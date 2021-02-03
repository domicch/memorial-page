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

export const createMessageReset = () => {
    return {
        type: actionTypes.CREATE_MESSAGE_RESET
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

export const createMessage = (userId, message, imageFiles) => {
    return async dispatch => {
        dispatch(createMessageStart());

        const fileNamePrefix = userId + '-' + new Date().getTime();
        const messageImages = [];
        const messageCopy = {...message}

        for (let i = 0; i < imageFiles.length; i++) {
            let originalImage = imageFiles[i].original;
            let resizedImageBase64 = imageFiles[i].resized;

            if (originalImage) {
                let originalImageURL = null;
                let image = {};

                try {
                    originalImageURL = await uploadImage(
                        'messages/original/' + fileNamePrefix + '-' + i + '-ori',
                        originalImage,
                        originalImage.type,
                        false);

                    image['originalImageURL'] = originalImageURL;
                } catch (error) {
                    console.log("createMessage: uploadImage original["+i+"] error ", error);
                    dispatch(createMessageFailed(new Error('Upload original image '+i+' failed')));
                    return;
                }

                if (resizedImageBase64) {
                    let resizedImageURL = null;
                    resizedImageBase64 = resizedImageBase64.substring(resizedImageBase64.indexOf(',') + 1);

                    try {
                        resizedImageURL = await uploadImage(
                            'messages/resized/' + fileNamePrefix + '-' + i + '-r1',
                            resizedImageBase64,
                            // originalImage.type,
                            'image/jpeg',
                            true);

                        image['resizedImageURL'] = resizedImageURL;
                    } catch (error) {
                        console.log("createMessage: uploadImage original["+i+"] error ", error);
                        dispatch(createMessageFailed(new Error('Upload resized image '+i+' failed')));
                        return;
                    }
                }
                messageImages.push(image);
            }
        }

        messageCopy['imageFiles'] = messageImages;

        // add order and timestamp as server timestamp
        messageCopy['timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
        messageCopy['order'] = firebase.firestore.FieldValue.serverTimestamp();
        messageCopy['userId'] = userId;

        app.firestore().collection("messages").add(messageCopy)
            .then(response => {
                console.log("createMessage: success", response);
                dispatch(createMessageSuccess());
            })
            .catch(function (error) {
                console.log("createMessage: upload firestore failed", error);
                dispatch(createMessageFailed(new Error('Failed to create message')));
            });
    }
}