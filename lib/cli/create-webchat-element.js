var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const child_process = require('child_process');
var fs = require('fs-extra');
const normalBodyParser = bodyParser.json();
const textBodyParser = bodyParser.text({ type: '*/*' });
const replace = require("replace");
var app = express();
const port = 5000;



module.exports = {
    run: (sdkDir) => {
        // child_process.execSync('npm i --force' , { stdio: [0, 1, 2] });
        child_process.execSync('npm run build:element:externals', { stdio: [0, 1, 2] });
        fs.copySync(path.resolve(`${sdkDir}/dist/main.js`), `${path.join(__dirname)}/../webChatSdk/main.js`);
        app.use(express.static(path.join(__dirname + '/../webChatSdk')));
        app.engine('html', require('ejs').renderFile);
        // view engine setup
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        // app.use('/', installationRouter)
        app.use((req, res, next) => {
            return normalBodyParser(req, res, next);
        });
        app.use(textBodyParser);
        app.use((req, res, next) => {
            next();
        });

        app.get('/', function (req, res) {
            console.log(path.join(__dirname));
            res.render(path.join(__dirname + `/../webChatSdk/index.html`));
        });
        app.listen(port, () => console.log(`App Started at http://localhost:${port}`))
    },
    createElement: (elementDir, type) => {
        switch (type) {
            case 'external':
                break;
            case 'widget':
                break
            case 'chat':
                break
        }
    }
};

