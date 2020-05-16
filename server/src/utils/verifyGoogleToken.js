const { OAuth2Client } = require('google-auth-library');

const { CLIENT_ID } = process.env;

const client = new OAuth2Client(CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const userData = await ticket.getPayload();
  return userData;
};

module.exports = verifyGoogleToken;
