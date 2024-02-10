function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
var nodeEnv = process.env.APPLICATION_ENV || 'prod';
if (nodeEnv === 'staging') {
    define("PLATFORM_URL", "https://interaction-staging.arrowai.in");
} else {
    define("PLATFORM_URL", "https://interaction.arrowai.in");
}