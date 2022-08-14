const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, environment.jwt.secretKey, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });

module.exports = verifyToken;
