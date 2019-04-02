const { exec } = require('child_process');

/**
 * Uses `gunzip` unix system tool to decompress `.gz` files
 * @param {string} fileName name of the file to be decompress
 * @param {function} callBack function to be executed when .gz file it's decompressed
 */ 
const unzip = (fileName, callBack = () => {}) => {
    console.log(`Decompressing ${fileName} ...!`);
    
    exec(`gunzip ${fileName} -f`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.log(`Something went wrong trying to decompress ${fileName} ...!`);
            throw new Error(error || stderr);
        }

        console.log(`Decompressed ${fileName} ...!`);
        callBack(fileName);
    });
};

/**
 * Generates a regex `-e 's|\("${key}"\s*:\s*"[^"]*\)${value}\([^"]*"\)|\1${replace}\2|g` rule
 * to be usesd with the `sed` unix system tool to replace a value for a json key
 * Recibes array: [{key: keyName, value: word to be replaced, replace: value to replace with}]
 * //TODO: validate inputs
 * @param {string} jsonKeys array with keys to be replaced
 * @param {string} fileName file to be replace values
 */
const genRegex = (jsonKeys) => {
    const regx = [];

    jsonKeys.forEach(element => {
        const { key, value, replace } = element;
        const exp = `-e 's|\\("${key}"\\s*:\\s*"[^"]*\\)${value}\\([^"]*"\\)|\\1${replace}\\2|g'`;
        regx.push(exp);
    });

    return regx.join(' ');
};

/**
 * Uses `sed` unix system tool to replace a value for a json key
 * Recibes array: [{key: keyName, value: word to be replaced, replace: value to replace with}]
 * //TODO: validate inputs
 * @param {string} jsonKeys array with { key, value, replace } options
 * @param {string} fileName file to replace values
 * @param {function} callBack function to be executed when `sed` replace it's complete
 */
const replace = (jsonKeys, fileName, callBack = () => {}) => {
    console.log(`Replacing ${fileName} ...!`);
    const rgx = genRegex(jsonKeys);

    exec(`sed -i '' ${rgx} ${fileName}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.log(`Something went wrong trying to decompress ${fileName} ...!`);
            throw new Error(error || stderr);
        }

        console.log(`Replaced ${fileName} ...!`);
        callBack(fileName);
    });
};

module.exports = {
    unzip,
    replace,
};