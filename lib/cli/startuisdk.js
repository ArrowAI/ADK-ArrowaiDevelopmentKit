var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./../uisdk/routes/arrowai_frame');
let installationRouter = require('./../uisdk/routes/configs')

const httpUtil = require('../uisdk/utils/http-util');
const istanbulBodyParser = bodyParser.json({ limit: '50MB' });
const normalBodyParser = bodyParser.json();
const textBodyParser = bodyParser.text({ type: '*/*' });
var child_process = require('child_process');
var app = express();
const port = 3000;
const io = require('socket.io-client');
const socket = io.connect('https://apiserver.arrowai.in', {reconnect: true});
// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Socket Connected!');
});
module.exports = {
    run: (prjDir) => {
        // child_process.execSync('npm i --force' , { stdio: [0, 1, 2] });
        // view engine setup
        app.set('views', path.join(__dirname + '/../uisdk/views'));
        app.set('view engine', 'pug');
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
            httpUtil.enableCORS(res, req);
            next();
        });
        app.use(indexRouter);
        app.listen(port, () => console.log(`App Started at http://localhost:${port}`))
    }
};