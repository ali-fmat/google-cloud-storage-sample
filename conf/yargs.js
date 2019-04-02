const yargs = require('yargs');

const commands = {
    LIST_BUCKET_FILES: 'list',
    GET_BUCKET_FILES: 'get',
    UPLOAD_BUCKET_FILE: 'upload',
    UNZIP: 'unzip',
    REPLACE: 'replace'
};

yargs.command(commands.LIST_BUCKET_FILES, 'Lists content from a bucket', {
    bucket: {
        alias: 'b',
        describe: 'Name of the bucket to work with',
        demand: true,
    },
    prefix: {
        alias: 'p',
        describe: 'Prefix to filter a specific set of files',
    }
})
.command(commands.GET_BUCKET_FILES, 'Gets content from a bucket', {
    bucket: {
        alias: 'b',
        describe: 'Name of the bucket to work with',
        demand: true,
    },
    destination: {
        alias: 'd',
        describe: 'Location to save downloaded file',
        demand: true,
    },
    prefix: {
        alias: 'p',
        describe: 'Prefix to filter a specific set of files',
    },
    extension: {
        alias: 'e',
        describe: 'The file extension to save downloaded file with it',
    }
})
.command(commands.UPLOAD_BUCKET_FILE, 'Uploads a file to a bucket', {
    file: {
        alias: 'f',
        describe: `JSON configuration file with the next information:
        - bucket: Name of the bucket to upload file
        - file: Fullpath to file to be uploaded
        - options: Google storage file upload options configuration object`,
        demand: true,
    },
})
.command(commands.UNZIP, 'Unzips a .gz file', {
    file: {
        alias: 'f',
        describe: 'Fullpath to file we want to unzip',
        demand: true,
    },
})
.command(commands.REPLACE, 'Replace the value of a key in a json object file', {
    file: {
        alias: 'f',
        describe: `JSON configuration file with the next information:
        - file: fullpath to json file we want to update
        - values: json array with the next format:
            values: [
                {
                    key: key to replace its value
                    value: the value that we want to replace
                    replace: the new value to be setted
                }
            ]
        `,
        demand: true,
    },
})
.strict()
.help();

module.exports = {
    argv: yargs.argv,
    commands
};