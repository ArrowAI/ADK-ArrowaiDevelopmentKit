const {
    cosmo,
    mongo,
    redis,
    mysql,
    bigQuery }= require('./databases/index')
module.exports = {
    mongoDb: mongo,
    cosmoDb: cosmo,
    redisCacheDb: redis,
    sqlDb: mysql,
    bigQueryDb: bigQuery
}