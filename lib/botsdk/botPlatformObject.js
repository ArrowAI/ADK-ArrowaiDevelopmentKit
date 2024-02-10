let platformObject = {
    getSystemConfig: () => {
        return {
            applicationEnv: process.env.APPLICATION_ENV || 'production'
        }
    }
}


module.exports = platformObject;
