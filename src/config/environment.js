/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
const dotenv = require("dotenv");

dotenv.config();

const { DATABASE_URL, PORT, NODE_ENV, CLIENT_ID, SECRET_KEY } = process.env;

const config = {
  database: {
    uri: DATABASE_URL,
  },
  jwt: {
    secretKey: SECRET_KEY,
  },
  oauth: {
    google: {
      clientId: CLIENT_ID,
    },
  },
  port: PORT || 3000,
  nodeEnv: NODE_ENV || "development",
};

module.exports = config;
