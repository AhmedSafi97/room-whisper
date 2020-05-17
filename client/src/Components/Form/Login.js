import React from 'react';
import axios from 'axios';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, message } from 'antd';

const Login = ({ history }) => {
  const successResponse = async (response) => {
    try {
      const { tokenId } = response;
      await axios.post('/api/v1/login/google', { tokenId });
      history.push('/');
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  const failureResponse = () => {
    message.error('Something went wrong, please try again later');
  };

  const onFinish = async ({ email, password }) => {
    try {
      await axios.post('/api/v1/login', { email, password });
      history.push('/');
    } catch (err) {
      if (err.response) message.error(err.response.data.message);
      else message.error('Something went wrong, please try again later');
    }
  };

  const signup = () => history.push('/signup');

  return (
    <>
      <p>Login</p>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              max: 50,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input valid email',
            },
          ]}
          placeholder="Type your email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              max: 20,
              min: 8,
            },
          ]}
          placeholder="Type your password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
      </Form>
      <p>Or Sign In Using</p>
      <GoogleLogin
        clientId="882324455984-i7obpjbjr79rug23t9aitmlc15cqvqtf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy="single_host_origin"
      />
      <p>Have not account yet ?</p>
      <Button onClick={signup}>SIGN UP</Button>
    </>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Login;
