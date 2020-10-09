import axios from 'axios';

const handleGoogleLogin = async (response, successCallback, errCallback) => {
  try {
    const { tokenId } = response;
    await axios.post('/api/v1/login/google', { tokenId });
    successCallback();
  } catch (err) {
    errCallback();
  }
};

export default handleGoogleLogin;
