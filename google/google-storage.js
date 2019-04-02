const { Storage } = require('@google-cloud/storage');

/**
 * Obtains google storage bucket file list filtered by a prefix if it's present
 * if not returns hole bucket file list
 * @param {string} bucketName google storage bucket to work with
 * @param {string} prefix prefix to filter files by
 * @param {boolean} noPrint used to avoid printing list in console. false by default
 * @returns {bucket file list} the returned list of google bucket storage file objects
 */
const listBucketFiles = async (bucketName, prefix, noPrint = false) => {
    const options = {};

    if( prefix) {
        options.prefix = prefix;
    }

    // Creates a client
    const storage = new Storage();

    // Lists files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles(options);

    if (noPrint) {
        return files;
    }

    files.forEach(file => {
        const { name, size, contentType } = file.metadata;
        console.log(`${name} Content-Length: ${size} Content-Type: ${contentType}`);
    });

    return files;
};

/**
 * Downloads a google cloud storage bucket file on a specified folder
 * @param {google storage file object} file file to be downloaded
 * @param {string} saveTo existing folder to save file
 * @param {extension} extension desired file extension to save downloaded file
 * @param {function} callBack callback function to be executed when a file is downloaded
 */
const download = async (file, saveTo, extension = '', callBack = () => {}) => {
    const { name } = file;
    const nameWithExtension = name + extension;

    let fPath = nameWithExtension.split('/');
    fPath = fPath[fPath.length - 1];
    fPath = saveTo + '/' + fPath;

    console.log(`Downloading ${name} ...!`);
    await file.download({ destination: fPath });
    console.log(`Downloaded ${name} ...!`);
    callBack(fPath);
};

/**
 * Gets the bucket files
 * @param {string} bucketName google storage bucket to work with
 * @param {string} saveTo existing folder to save file
 * @param {string} prefix prefix to filter files by
 * @param {string} extension desired file extension to save downloaded file
 * @param {function} callBack callback function to be executed when a file is downloaded
 */
const getBucketFiles = async (bucketName, saveTo, prefix, extension, callBack) => {
    const files = await listBucketFiles(bucketName, prefix, true);

    files.forEach((file) => {
        download(file, saveTo, extension, callBack);
    });
};

/**
 * Uploads a file to a specific storage bucket
 * @param {string} bucketName google storage bucket to work with
 * @param {string} fileName file to be uploaded
 * @param {object} options google storage file upload options configuration object
 */
const uploadBucketFile = async (bucketName, fileName, options = {}) => {
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    
    console.log(`Uploading ${fileName} to ${bucketName} ...!`);
    const file = await bucket.upload(fileName, options);
    console.log(`${fileName} Uploaded ${bucketName} ...!`);
    return file;
};

module.exports = {
    listBucketFiles,
    getBucketFiles,
    uploadBucketFile,
};