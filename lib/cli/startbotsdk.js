var fs = require('fs');
var path_module = require('path');
const express = require('express');
const platformObject = require('../botsdk/botPlatformObject');
var child_process = require('child_process');
const bodyParser = require('body-parser');
const normalBodyParser = bodyParser.json();
const app = express();
const port = 3000;
const io = require('socket.io-client');
const socket = io.connect('https://apiserver.arrowai.in', {reconnect: true});
// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Socket Connected!');
});

module.exports = {
    run: (prjDir) => {
        console.log(__dirname + ' Directory Name');
        child_process.execSync('npm i --force' , { stdio: [0, 1, 2] });
        const botModule = require(prjDir);
        let botModuleObject = new botModule(platformObject);
        app.use((req, res, next) => {
            return normalBodyParser(req, res, next);
        });
        app.post('/', ((req, res) => {
            botModuleObject.sendMessage(req.body).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(500).send(error.message);
            })
        }))
        app.listen(port, () => console.log(`App Started at http://localhost:${port}`))
    }
};