var fs = require('fs');
var path_module = require('path');
const express = require('express');

var child_process = require('child_process');
const bodyParser = require('body-parser');

const normalBodyParser = bodyParser.json();
const app = express();
const port = 3000;
const platform = require('./../apimodulesdk/db')


module.exports = {
    run: (prjDir) => {
        console.log(__dirname + ' Directory Name');

        child_process.execSync('npm i --force' , { stdio: [0, 1, 2] });
        child_process.execSync(`npm link ${prjDir}`, { stdio: [0, 1, 2] });
        //modules.forEach(mainModule => {
        var router = require(`${prjDir}/index.js`)(platform);

        // });
        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            //Set it to * if content-type, lang blows things up
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,lang');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });

        app.use(express.json());
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        app.use(bodyParser.json())
        app.use(express.urlencoded({ extended: false }));



        app.use((req, res, next) => {
            return normalBodyParser(req, res, next);
        });
        app.use(`/api-module`, router);


        app.listen(port, () => console.log(`App Started at http://localhost:${port}`))
    }
};