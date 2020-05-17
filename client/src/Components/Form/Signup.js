import React from 'react';
import axios from 'axios';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, message } from 'antd';

const Signup = ({ history }) => {
  const successResponse = async (response) => {
    try {
      const { tokenId } = response;
      await axios.post('/api/v1/login/google', { tokenId });
      message.success('sign up successfully');
      history.push('/');
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  const failureResponse = () => {
    message.error('Something went wrong, please try again later');
  };

  const onFinish = async ({ username, email, password }) => {
    try {
      await axios.post('/api/v1/signup', { username, email, password });
      await axios.post('/api/v1/login', { email, password });
      message.success('sign up successfully');
      history.push('/');
    } catch (err) {
      if (err.response) message.error(err.response.data.message);
      else message.error('Something went wrong, please try again later');
    }
  };

  const login = () => history.push('/login');

  return (
    <>
      <p>Sign Up</p>
      <Form name="signup" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
            {
              max: 12,
              min: 3,
            },
          ]}
        >
          <Input placeholder="Type your name" />
        </Form.Item>
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
        >
          <Input placeholder="Type your email" />
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
        >
          <Input.Password placeholder="Type your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>Or Sign Up Using</p>
      <GoogleLogin
        clientId="882324455984-i7obpjbjr79rug23t9aitmlc15cqvqtf.apps.googleusercontent.com"
        buttonText="Sign Up"
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy="single_host_origin"
      />
      <p>Have an account ?</p>
      <Button onClick={login}>Login</Button>
    </>
  );
};

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Signup;
