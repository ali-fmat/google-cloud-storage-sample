const gs = require('./index');
const path = require('path');

/** this is a sample */
const test = async (bucketName, saveTo, prefix, extension) => {
    const upload = (fileName) => {
        let name = fileName.split('/');
        name = name[name.length - 1];

        const options = {
            destination: 'results/' + name,
            resumable: true,
            gzip: true,
            validation: 'crc32c',
            metadata: {
                contentType: 'application/octet-stream',
            }
        };

        gs.uploadBucketFile(bucketName, fileName, options)
        .catch(e => { console.log(e); });
    };

    const replace = (fileName) => {
        const jsonKeys = [
            { key: 'page_url', value: 'google.com', replace: 'notgoogle.com' },
            { key: 'referrer_url', value: 'google.com', replace: 'notgoogle.com' },
        ];

        const name = fileName.substring(0, fileName.length - extension.length);
        gs.replace(jsonKeys, name, upload);
    };

    const unzip = (fileName) => {
        gs.unzip(fileName, replace);
    };

    gs.getBucketFiles(bucketName, saveTo, prefix, extension, unzip);
};

const workSpace = path.resolve('./results');
const bucketName = 'bucketName';
test(bucketName, workSpace, 'filterPrefixSample', '.gz');