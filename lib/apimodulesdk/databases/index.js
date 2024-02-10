const env = process.env.ARROWAPI_NODE_ENV || 'production';
const bigQuery = require('./bigquery');
const cosmo = require('./cosmo');
const mongo = require('./mongo');
const mysql = require('./mysql');
const redis = require('./redis');

module.exports = {
    bigQuery,
    cosmo,
    mongo,
    mysql,
    redis
}