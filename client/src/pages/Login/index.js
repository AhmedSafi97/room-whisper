import React from 'react';
import propTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.css';
import { handleGoogleLogin, handleLogin } from '../../utils';

const Login = ({ setAuth }) => {
  const history = useHistory();

  const onGoogleLoginFailure = () =>
    message.error('Something went wrong, please try again later');

  const onFinish = (credentials) =>
    handleLogin(credentials, () => setAuth(true), message.error);

  return (
    <div className="login__wrapper">
      <Form className="login__form" name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input valid email',
            },
          ]}
        >
          <Input size="large" placeholder="Type your email" />
        </Form.Item>

        <Form.Item
          name="password"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
            },
          ]}
        >
          <Input.Password size="large" placeholder="Type your password" />
        </Form.Item>

        <Form.Item>
          <Button
            className="login__btn"
            size="large"
            type="primary"
            htmlType="submit"
          >
            LOGIN
          </Button>
        </Form.Item>
      </Form>
      <div className="login__btns-wrapper">
        <GoogleLogin
          className="login__google-btn"
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={(response) =>
            handleGoogleLogin(
              response,
              () => setAuth(true),
              onGoogleLoginFailure
            )
          }
          onFailure={onGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
        <Button
          size="large"
          className="login__signup-btn"
          onClick={() => history.push('/signup')}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAuth: propTypes.func.isRequired,
};

export default Login;
