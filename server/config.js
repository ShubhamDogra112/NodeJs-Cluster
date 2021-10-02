let env = process.env.NODE_ENV;
require('dotenv').config();
const config = {
    dev: {
        db : {
            host: 'mongodb://localhost:27017/test',
        }
    },
    prod: {
        db: {
            host: process.env.DB_HOST_PROD,
        }
    }
}
module.exports = config[env.trim()];    