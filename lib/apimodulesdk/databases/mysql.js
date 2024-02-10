
const env = process.env.ARROWAPI_NODE_ENV || 'production';

const config = require('./../config/config')[env];

var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: config.ARROWAPI_MYSQL_HOST_URL,
//     port: config.ARROWAPI_MYSQL_PORT,
//     user: config.ARROWAPI_MYSQL_USER,
//     password: config.ARROWAPI_MYSQL_PASSWORD,
//     connectionLimit: 100,
//     queueLimit: 100,
//     acquireTimeout: 1000000
// });
// connection.connect(function (err) {
//     if (!err) {
//         console.log("Database is connected ... nn");
//     } else {
//         console.log("Error connecting database ... nn", err);
//     }
// });
// connection.reconnect = function () {
//     connection.connect().then(function (con) {

//     }, function (error) {

//     });
// };
var connection = mysql.createPool({
    connectionLimit: 10,
    host: config.ARROWAPI_MYSQL_HOST_URL,
    port: config.ARROWAPI_MYSQL_PORT,
    user: config.ARROWAPI_MYSQL_USER,
    password: config.ARROWAPI_MYSQL_PASSWORD,
});



module.exports = connection;

