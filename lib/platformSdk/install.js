'use strict';


const fs = require('fs');
const process = require('process');
// const fileUtil = require('./utils/file-util');

const manifestFile = './install/main.json';

const charset = 'utf8';

let doc;

if (!fs.existsSync(manifestFile)) {
    console.log('Could not find the app manifest file in the current/specified directory.');
    return process.exit(1);
}
try {
    doc = JSON.parse(fs.readFileSync(manifestFile, charset));
} catch (e) {
    console.log(`Error while parsing manifest file ${e.message}`);
    console.log('Could not parse the app manifest file in the current/specified directory.');
    return process.exit(1);
}

console.log(`Reloading manifest with ${JSON.stringify(doc)}.`);

module.exports.manifest = doc;