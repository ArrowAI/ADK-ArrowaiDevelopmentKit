const env = process.env.ARROWAPI_NODE_ENV || 'production';
const config = require('./../config/config')[env];

var redis = require('redis');
var client = redis.createClient(config.ARROWAPI_REDIS_HOST_PORT, config.ARROWAPI_REDIS_HOST_URL, {
    auth_pass: config.ARROWAPI_REDIS_HOST_PASSWORD,
    // tls: {servername: redisURLHost},
    no_ready_check: true,
    retryStrategy: function (times) {
        console.log('Lost Redis connection, reattempting');
        return Math.min(times * 2, 2000);
    },
    retry_strategy: function (options) {
        console.log('Lost Redis connection, reattempting retry_strategy');
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            // return new Error('The server refused the connection');
            console.log("ECONNREFUSED");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            console.log("retry Limit increased");
            // return new Error('Retry time exhausted');
        }
        console.log(options.attempt);
        // if (options.attempt > 10) {
        // End reconnecting with built in error
        // return undefined;
        // }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
    reconnectOnError: function (err) {
        if (err.message.slice(0, targetError.length) === 'READONLY') {
            // When a slave is promoted, we might get temporary errors saying
            // READONLY You can't write against a read only slave. Attempt to
            // reconnect if this happens.
            console.log('ElastiCache returned a READONLY error, reconnecting');
            return 2; // `1` means reconnect, `2` means reconnect and resend
            // the failed command
        }
    },
    socket_keepalive: true
});
client.on('ready', function () {
    console.log('Redis ready');
}).on('error', function (err) {
    console.log('Redis error', err);
});

module.exports=client;