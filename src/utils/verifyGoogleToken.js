const { OAuth2Client } = require('google-auth-library');
const environment = require('../config/environment');

const { clientId } = environment.oauth.google;

const client = new OAuth2Client(clientId);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const userData = await ticket.getPayload();
  return userData;
};

module.exports = verifyGoogleToken;
