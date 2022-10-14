/* Constants */
import { MainServerURL } from "src/constants/addresses/apis/main.api";

/**
 * The function of converting a URI to a Blob object
 * @param {string} dataURI - URI
 * @returns {Blob} - Blob
 */
export const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

/**
 * Function for checking a link as a URL to a resource
 * @param {string} dataURI - URL for checking
 * @returns {boolean} - result
 */
export const isDataURL = (dataURI, address = MainServerURL) => {
    return dataURI.includes(address);
}