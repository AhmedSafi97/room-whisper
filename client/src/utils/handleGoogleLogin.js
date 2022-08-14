import axios from '../utils/axios';

const handleGoogleLogin = async (response, successCallback, errCallback) => {
  try {
    const { tokenId } = response;
    await axios.post('/login/google', { tokenId });
    successCallback();
  } catch (err) {
    errCallback();
  }
};

export default handleGoogleLogin;
