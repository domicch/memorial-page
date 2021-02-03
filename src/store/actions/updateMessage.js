import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import { app } from "../../base";

export const updateMessageSuccess = () => {
    return {
        type: actionTypes.UPDATE_MESSAGE_SUCCESS
    };
};

export const updateMessageFailed = (error) => {
    return {
        type: actionTypes.UPDATE_MESSAGE_FAILED,
        error: error
    };
};

export const updateMessageStart = () => {
    return {
        type: actionTypes.UPDATE_MESSAGE_START
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

export const updateMessage = (userId, messageId, message, imageModified, imageFiles) => {
    return async dispatch => {
        dispatch(updateMessageStart());

        
        const updateMessage = {};

        if(imageModified){
            const fileNamePrefix = userId + '-' + new Date().getTime();   
            const messageImages = [];    

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
                        console.log("updateMessage: uploadImage original["+i+"] error ", error);
                        dispatch(updateMessageFailed(new Error('Upload original image '+i+' failed')));
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
                            console.log("updateMessage: uploadImage original["+i+"] error ", error);
                            dispatch(updateMessageFailed(new Error('Upload resized image '+i+' failed')));
                            return;
                        }
                    }
                    messageImages.push(image);
                }
            }

            updateMessage['imageFiles'] = messageImages;
        }

        // message['imageFiles'] = messageImages;

        // add order and timestamp as server timestamp
        // message['timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
        // message['order'] = firebase.firestore.FieldValue.serverTimestamp();
        // message['userId'] = userId;
        updateMessage['update_timestamp'] = firebase.firestore.FieldValue.serverTimestamp();
        updateMessage['content'] = message.content;
        updateMessage['author'] = message.author;

        app.firestore().collection("messages").doc(messageId).update(updateMessage)
            .then(response => {
                console.log("updateMessage: success", response);
                dispatch(updateMessageSuccess());
            })
            .catch(function (error) {
                console.log("updateMessage: upload firestore failed", error);
                dispatch(updateMessageFailed(new Error('Failed to update message')));
            });
    }
}