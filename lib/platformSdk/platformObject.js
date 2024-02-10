const debug = require('debug')('lib:platform');
const config = require('./constants');
const request = require('request')
const platformLib = {
    messageReceived: (message, sessionId, integrationId) => {
        // console.log(JSON.stringify(message));
        message.sessionId = sessionId;
        message.integrationId = integrationId;
        // console.log(`${config.PLATFORM_URL}/messages/messageReceived`)
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/messages/messageReceived`,
                method: 'POST',
                json: message

            }, function (error, response, body) {
                if (error) {
                    reject(new Error(error))
                } else {
                    // console.log(body);
                    resolve(body);
                }
            });
        })
    },
    createSessionByChannelId: (applicationId, integration, channelId, integrationId) => {
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/messages/createSessionByChannelId`,
                method: 'POST',
                json: {
                    applicationId,
                    integration,
                    channelId,
                    integrationId
                }

            }, function (error, response, body) {
                if (response.statusCode == 500)
                    reject(body)
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(body);

                }
            });
        });
    },
    createUser: (applicationId, user, userUniqueId) => {
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/users/new`,
                method: 'POST',
                json: {
                    "data": {
                        "appId": applicationId,
                        "name": user.name || 'guest',
                        "source": [
                            user.integration,
                        ]
                    },
                    "deviceInfo": user.deviceInfo || {},
                    "applicationId": user.applicationId,
                    "channel": user.integration,
                    "userUniqueId": userUniqueId,
                    deviceInfo: user.deviceInfo,
                    integration:user.integration,
                    uniqueUserId: userUniqueId,
                    name: `custom user`,
                    integrationIdentifier: user.integrationId,
                    integrationId:user.integrationId

                }

            }, function (error, response, body) {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(body);

                }
            });
        })
    },
    saveIntegrationConfig: (applicationId, integration, config) => {
    },
    getIntegrationConfigByIntegrationId: (applicationId, integration, integrationId) => {
        console.log(`${config.PLATFORM_URL}/platform/getIntegrationConfigByIntegrationId`)
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/platform/getIntegrationConfigByIntegrationId`,
                method: 'POST',
                json: {
                    applicationId,
                    integration,
                    integrationId
                }

            }, function (error, response, body) {
                if (error) {
                    reject(new Error(error))
                } else {
                    // console.log(body);
                    resolve(body);
                }
            });
        })
    },
    saveUserConfig: (applicationId, integration, config) => {

    },
    getUserConfig: (applicationId, integration) => {

    },
    getSystemconfig: () => {

    },
    getUserBychannelId: () => {
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/getUserByChannelId`,
                method: 'POST',
                json: message

            }, function (error, response, body) {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(body);

                }
            });
        })

    },
    createSessionByChannelIdOld: (channelId) => {
        console.log("channel id received");
        return new Promise((resolve, reject) => {
            request({
                url: `${config.PLATFORM_URL}/messages/createSessionByChannelId`,
                method: 'POST',
                json: { channelId }

            }, function (error, response, body) {
                if (error) {
                    reject(new Error(error))
                } else {
                    // console.log(body);
                    resolve(body);
                }
            });
        })
    }
};
debug("module loaded");

module.exports = platformLib;
