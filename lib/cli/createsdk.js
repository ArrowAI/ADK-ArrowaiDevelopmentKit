const _ = require('lodash');
const fs = require('fs');
const nodeTree = require('nodetree');
const fstream = require('fstream');
const os = require('os');

const request=require('request');
const extract = require('extract-zip')
const ADDON_VERSION = require(`${__dirname}/template/template_info.json`).addon_version;

async function initTemplate(prjDir, template) {
    var dirPath, destPath;
    console.log(template);
    switch (template) {
        case 'ui':
            try {
                await extract(`${__dirname}/template/cache/uiModule.zip`, { dir: prjDir })
                console.log('run cd uiModule ');
                console.log('run adk startuisdk to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
            case 'web-chat-element':
            try {
                await extract(`${__dirname}/template/cache/webChatModule.zip`, { dir: prjDir })
                console.log('run cd webChatModule');
                console.log('run adk startwebchatsdk to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
        case 'element':
            try {
                await extract(`${__dirname}/template/cache/elementModule.zip`, { dir: prjDir })
                console.log('run cd elementModule');
                console.log('run adk startfrontend to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
        case 'channel':
            try {
                await extract(`${__dirname}/template/cache/channelModule.zip`, { dir: prjDir })
                console.log('run cd channelModule ');
                console.log('run adk startchannelsdk to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
        case 'bot':
            try {
                await extract(`${__dirname}/template/cache/botModule.zip`, { dir: prjDir })
                console.log('run cd botModule ');
                console.log('run adk startbotsdk to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
        case 'module':
            try {
                await extract(`${__dirname}/template/cache/apiModule.zip`, { dir: prjDir })
                console.log('run cd apiModule ');
                console.log('run adk startapisdk to run this module ')
            } catch (err) {
                console.log(err);
                // handle any errors
            }
            break;
    }
    nodeTree(process.cwd());
}

module.exports = {
    run: (prjDir, template) => {
        console.log(template)
        if (!_.isEmpty(fs.readdirSync(prjDir))) {
            console.log('The current directory is not empty. Run the command inside an empty directory or use the --app-dir option to specify the path to a new or empty directory.');
            process.exit(1);
        }
        initTemplate(prjDir, template);

    }
};