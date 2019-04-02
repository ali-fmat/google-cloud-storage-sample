#!/usr/bin/env node

const gs = require('./index');
const { argv, commands } = require('./conf/yargs');

const comand = argv._[0];

switch (comand) {
    case commands.LIST_BUCKET_FILES: {
        gs.listBucketFiles(argv.bucket, argv.prefix);
    }
    break;
    case commands.GET_BUCKET_FILES: {
        gs.getBucketFiles(argv.bucket, argv.destination, argv.prefix, argv.extension);
    }
    break;
    case commands.UPLOAD_BUCKET_FILE: {
        const conf = require(argv.file);
        gs.uploadBucketFile(conf.bucket, conf.file, conf.options);
    }
    break;
    case commands.UNZIP: {
        gs.unzip(argv.file);
    }
    break;
    case commands.REPLACE: {
        const conf = require(argv.file);
        gs.replace(conf.values, conf.file);
    }
    break;
    default:
        console.log('COMMAND NOT FOUND!');
}
