const config = {}

config.JWT_KEY = 'webservice_secret_key';
config.MONGO_URL = 'mongodb://localhost:27017/webservice';
config.SALT_ROUNDS = 13;

module.exports = config;