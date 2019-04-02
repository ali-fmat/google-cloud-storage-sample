## Google Cloud Storage Sample

In order to run this sample you'll need to follow the next set of steps

#### Step 1 - Set the command
Since this is not an instalable node library (yet), you'll need to run the next command. Only if you want to use the this sample features on the console

On the folder sample
```
npm link
```

after you finish this step, you'll be able to use this sample features by using the command `gs` on the console

to unset the command you can need to run

```
npm unlink
```

to disable the command.

#### Step 2 - Set your credentials
Set your google cloud credentials

Open your terminal and run
```
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/googlecloud-credentials-file.json
```

#### Step 3 - Using the library

This plugin features can be used on the following ways:
- console (see step 1 or run it as `npm run cli.js ...`)
- js code (you'll need to import `index.js` see `test.js` to see a sample)

#### Features

- list - Lists content from a bucket 
- get - Gets content from a bucket
- upload - Uploads a file to a bucket
- unzip - Unzips a .gz file
- replace - Replace the value of a key in a json object file

##### - List

Obtains google storage bucket file list filtered by a prefix if it's present if not returns hole bucket file list
* @param {string} bucketName - google storage bucket to work with
* @param {string} prefix - prefix to filter files by
* @param {boolean} noPrint - used to avoid printing list in console. false by default
* @returns {bucket file list} the returned list of google bucket storage file objects

###### console

```
gs list

Lists content from a bucket

Opciones:
  --bucket, -b  Name of the bucket to work with                      [requerido]
  --prefix, -p  Prefix to filter a specific set of files
```

###### js code

```
const { listBucketFiles } = require (path/to/index.js);
listBucketFiles (bucketName, prefix, true);
```

##### - Get

Gets the bucket files
 * @param {string} bucketName - google storage bucket to work with
 * @param {string} saveTo - existing folder to save file
 * @param {string} prefix - prefix to filter files by
 * @param {string} extension - desired file extension to save downloaded file
 * @param {function} callBack - function to be executed when a file is downloaded

###### console

```
gs get

Gets content from a bucket

Opciones:
  --bucket, -b       Name of the bucket to work with                 [requerido]
  --destination, -d  Location to save downloaded file                [requerido]
  --prefix, -p       Prefix to filter a specific set of files
  --extension, -e    The file extension to save downloaded file with it
```

###### js code

```
const { getBucketFiles } = require (path/to/index.js);
getBucketFiles(bucketName, saveTo, prefix, extension, callBack);
```

##### - Upload

Uploads a file to a specific storage bucket
 * @param {string} bucketName - google storage bucket to work with
 * @param {string} fileName - file to be uploaded
 * @param {object} options - google storage file upload options configuration object

###### console

```
gs upload

Uploads a file to a bucket

Opciones:
  --file, -f  JSON configuration file with the next information:
              - bucket: Name of the bucket to upload file
              - file: Fullpath to file to be uploaded
              - options: Google storage file upload options configuration object
                                                                     [requerido]
```

###### js code

```
const { uploadBucketFile } = require (path/to/index.js);

// google storage file upload options configuration object
const options = {
    destination: 'results/' + name,
    resumable: true,
    gzip: true,
    validation: 'crc32c',
    metadata: {
        contentType: 'application/octet-stream',
    }
};

uploadBucketFile(bucketName, fileName, options);
```

##### - Unzip

Uses `gunzip` unix system tool to decompress `.gz` files
 * @param {string} fileName - name of the file to be decompress
 * @param {function} callBack - function to be executed when .gz file it's decompressed

###### console

```
gs unzip

Unzips a .gz file

Opciones:
  --file, -f  Fullpath to file we want to unzip                      [requerido]
```

###### js code

```
const { unzip } = require (path/to/index.js);
unzip(fileName, callBack);
```

##### - Replace

Uses `sed` unix system tool to replace a value for a json key.
 Recibes array: [{key: keyName, value: word to be replaced, replace: value to replace with}]
 * @param {string} jsonKeys - array with { key, value, replace } options
 * @param {string} fileName - file to replace values
 * @param {function} callBack - function to be executed when `sed` replace it's complete

###### console

```
gs replace

Replace the value of a key in a json object file

Opciones:
  --file, -f  JSON configuration file with the next information:
              - file: fullpath to json file we want to update
              - values: json array with the next format:
              values: [
              {
              key: key to replace its value
              value: the value that we want to replace
              replace: the new value to be setted
              }
              ]
                                                                     [requerido]
```

###### js code

```
const jsonKeys = [
    { key: 'page_url', value: 'google.com', replace: 'notgoogle.com' },
    { key: 'referrer_url', value: 'google.com', replace: 'notgoogle.com' },
];

const { replace } = require (path/to/index.js);
replace(jsonKeys, fileName, callBack);
```