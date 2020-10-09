import axios from 'axios';

const handleSignup = async (data, successCallback, errCallback) => {
  try {
    await axios.post('/api/v1/signup', data);
    await axios.post('/api/v1/login', data);
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

export default handleSignup;
