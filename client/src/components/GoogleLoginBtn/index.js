import React from 'react';
import propTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';

import './style.css';

import { handleGoogleLogin } from '../../utils';

const GoogleLoginBtn = ({ setAuth }) => {
  const onGoogleLoginFailure = () =>
    message.error('Something went wrong, please try again later');

  return (
    <GoogleLogin
      className="google-btn"
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login"
      onSuccess={(response) =>
        handleGoogleLogin(response, () => setAuth(true), onGoogleLoginFailure)
      }
      onFailure={onGoogleLoginFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

GoogleLoginBtn.propTypes = {
  setAuth: propTypes.func.isRequired,
};

export default GoogleLoginBtn;
