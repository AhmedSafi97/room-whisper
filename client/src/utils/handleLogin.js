import axios from '../utils/axios';

const handleLogin = async (credentials, successCallback, errCallback) => {
  try {
    await axios.post('/login', credentials);
    successCallback();
  } catch (err) {
    let errMessage;

    if (err.response.status) {
      errMessage = err.response.data.message;
    } else {
      errMessage = 'Something went wrong, please try again later';
    }

    errCallback(errMessage);
  }
};

export default handleLogin;
