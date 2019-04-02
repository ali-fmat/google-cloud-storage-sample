const { listBucketFiles, getBucketFiles, uploadBucketFile } = require('./google/google-storage');
const { unzip, replace, } = require('./utils/shell');

module.exports = {
    listBucketFiles,
    getBucketFiles,
    uploadBucketFile,
    unzip,
    replace,
};