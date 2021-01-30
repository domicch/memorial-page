import Resizer from 'react-image-file-resizer';

/**
 * 
 *  file, // Is the file of the image which will resized.
    maxWidth, // Is the maxWidth of the resized new image.
    maxHeight, // Is the maxHeight of the resized new image.
    compressFormat, // Is the compressFormat of the resized new image.
    quality, // Is the quality of the resized new image.
    rotation, // Is the degree of clockwise rotation to apply to uploaded image. 
    responseUriFunc,  // Is the callBack function of the resized new image URI.
    outputType,  // Is the output type of the resized new image.
    minWidth, // Is the minWidth of the resized new image.
    minHeight, // Is the minHeight of the resized new image.
 */
export const resizeImage = (imageFile, imageFormat, callback) => {
    try {
        Resizer.imageFileResizer(
            imageFile,
            1280,
            1280,
            imageFormat,
            90,
            0,
            callback,
            'base64'
        );
    } catch(err) {
        console.log(err)
    }
}