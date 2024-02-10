
const env = process.env.ARROWAPI_NODE_ENV || 'production';
const config = require('./../config/config')[env];

const Mongoose = require("mongoose").Mongoose;
let mainMongoose = new Mongoose();
mainMongoose.connect(config.ARROWAPI_COSMO_HOST_URL, {
    "user": config.ARROWAPI_COSMO_USER,
    "pass": config.ARROWAPI_COSMO_PASSWORD,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mainMongoose.connection.once('open', function () {
    console.log('MongoDB event open');
    console.log('MongoDB connected');
    mainMongoose.connection.on('connected', function () {
        console.log('MongoDB event connected');
    });
    mainMongoose.connection.on('disconnected', function () {
        console.log('MongoDB event disconnected');
    });

    mainMongoose.connection.on('reconnected', function () {
        console.log('MongoDB event reconnected');
    });

    mainMongoose.connection.on('error', function (err) {
        logger.error('MongoDB event error: ' + err);
    });
});
mainMongoose.set('debug', true);


module.exports = mainMongoose;
