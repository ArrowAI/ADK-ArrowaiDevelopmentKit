const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var child_process = require('child_process');
var path = require('path');
const normalBodyParser = bodyParser.json();
const textBodyParser = bodyParser.text({ type: '*/*' });
const platformObject = require('./../platformSdk/platformObject');
const channelConfig = require('./../platformSdk/install');
const applicationConfig = require('./../platformSdk/manifest')
console.log(__dirname);


const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000', { reconnect: true });
// Add a connect listener

module.exports = {
    run: (prjDir) => {
        // child_process.execSync('npm i --force' , { stdio: [0, 1, 2] });
        const channelModule = require(prjDir);
        console.log(__dirname);
        let channelModuleObject = new channelModule(platformObject);
        app.set('views', path.join(__dirname + '/../platformSdk/web/views'));
        app.use(express.static(path.join(__dirname + '/../platformSdk/web')))
        app.set('view engine', 'ejs');
        app.use(express.urlencoded());
        app.use(express.json());
        app.use((req, res, next) => {
            return normalBodyParser(req, res, next);
        });
        app.get('/configuration/:applicationId/:integration', (req, res) => {
            res.render('configuration', {
                schema: channelConfig.manifest,
                config: {
                    applicationId: req.params.applicationId,
                    integration: req.params.integration
                }
            })
        });
        app.get('/automation/:applicationId/:integration', (req, res) => {
            res.render('automation', {
                schema: channelConfig.manifest,
                config: {
                    applicationId: req.params.applicationId,
                    integration: req.params.integration
                }
            })
        });

        app.post('/:applicationId/:integration/incoming/:integrationId', (req, res) => {
            try {
                let reqData = req;
                //  console.log(reqData);
                const integration = req.params.integration;
                const applicationId = req.params.applicationId;
                const integrationId = req.params.integrationId; //TODO: check if application support this
                channelModuleObject.receivedApiMessage(reqData, applicationId, integration, integrationId, new Date().getTime()).then((response => {
                    res.status(200).send(response);
                })).catch((error) => {
                    console.log(error);
                    res.status(500).send(error);
                })
            } catch (error) {
                console.log(error);
                res.status(500).send(error);

            }
        })
        app.post('/:applicationId/:integration/outgoing/:integrationId', (req, res) => {
            try {
                let reqData = req;
                // console.log(reqData);
                const integration = req.params.integration;
                const applicationId = req.params.applicationId;
                const integrationId = req.params.integrationId; //TODO: check if application support this
                reqData.integration = integration;
                reqData.applicationId = applicationId;
                reqData.integrationId = integrationId;
                channelModuleObject.sendMessage(reqData).then((response => {
                    res.status(200).send(response);
                })).catch((error) => {
                    res.status(500).send('something went wrong');
                })
            } catch (error) {
                console.log(error);
                res.status(500).send('something went wrong');
            }
        })
        app.post('/:applicationId/:integration/outgoingbulk/:integrationId', (req, res) => {
            try {
                const integration = req.params.integration;
                const applicationId = req.params.applicationId;
                const integrationId = req.params.integrationId; //TODO: check if application support this
                reqData.integration = integration;
                reqData.applicationId = applicationId;
                reqData.integrationId = integrationId;
                channelModuleObject.sendBulkMessage(reqData).then((response => {
                    res.status(200).send(response);
                })).catch((error) => {
                    res.status(500).send('something went wrong');
                })
            } catch (error) {
                console.log(error);
                res.status(500).send('something went wrong');
            }
        })
        
        app.post('/config', (req, res) => {
            try {
                let reqBody = req.body;
                console.log(reqBody);
                channelModuleObject.newChannelCreated(reqBody).then((response => {
                    res.status(200).send(response);
                })).catch((error) => {
                    res.status(200).send({message:'something went wrong'});
                })
            } catch (error) {
                // console.log(error);
                res.status(200).send({message:'something went wrong'});
            }
        })

        app.listen(port, () => console.log(`App Started at http://localhost:${port}`))
        console.warn('configure your channel here :http://localhost:3000/configuration/applicationId/integraton')
       
        console.warn('configure your channel Automation here :http://localhost:3000/automation/:applicationId/:integration')
        

        console.warn("webhook url is http://localhost:3000/:applicationId/:integration/incoming/:integrationId")
        socket.on(applicationConfig.manifest.namespace, function (data) {
            channelModuleObject.sendBulkMessage(data);
        });

    }
};