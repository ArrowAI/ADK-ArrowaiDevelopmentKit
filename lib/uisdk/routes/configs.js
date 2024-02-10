'use strict';
const Router = require('express').Router;
const installationRouter = new Router();

function customIParamsPage(req, res) {
    return res.render('configuration.html');
}
installationRouter.get('/installation', customIParamsPage);

module.exports = installationRouter;