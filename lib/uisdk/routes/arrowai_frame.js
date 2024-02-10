'use strict';
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const manifest = require('../manifest');

var expressWs = require('express-ws-routes');

var express = expressWs.extendExpress();

var iframeRouter = express.Router();
const staticMiddleware = express.static('./app');

function iframeAPIHandler(req, res) {

    const appDetails = {
        displayName: process.cwd().split(path.sep).pop(),
        manifest: manifest.manifest
    };
    res.send(appDetails);
}
iframeRouter.use('/iframe', (req, res, next) => {
    const fullPath = `./app${req.path}`;
    console.log("path", fullPath);
    if (req.method === 'GET') {
        if (req.path.endsWith('.js')) {
            console.log(`Responding with contents of ${req.path}`);
            return res.send(fs.readFileSync(fullPath, 'utf8'));
        }
        if (req.path.endsWith('.html')) {
            console.log(`Responding with contents of ${req.path}`);
            return res.send(fs.readFileSync(fullPath, 'utf8'));
        }
    }
    return staticMiddleware(req, res, next);
});
iframeRouter.get('/iframe/api', iframeAPIHandler);

module.exports = iframeRouter;