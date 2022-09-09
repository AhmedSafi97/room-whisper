const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const environment = require("../config/environment");

const { clientId } = environment.oauth.google;
const client = new OAuth2Client(clientId);

class AuthHelpers {
  static checkPassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static generateToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, environment.jwt.secretKey, (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
    });
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, environment.jwt.secretKey, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  static async verifyGoogleToken(token) {
    const options = {
      idToken: token,
      audience: clientId,
    };

    const ticket = await client.verifyIdToken(options);
    const payload = await ticket.getPayload();

    return payload;
  }
}

module.exports = AuthHelpers;
