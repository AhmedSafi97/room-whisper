const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

const signToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, environment.jwt.secretKey, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });

module.exports = signToken;
