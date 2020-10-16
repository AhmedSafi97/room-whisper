import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import './style.css';

import UserContext from '../../context';
import { handleSignup } from '../../utils';
import { GoogleLoginBtn } from '../../components';

const Signup = () => {
  const history = useHistory();
  const { setAuth } = useContext(UserContext);

  const onFinish = (data) =>
    handleSignup(data, () => setAuth(true), message.error);

  return (
    <div className="signup__wrapper">
      <Form className="signup__form" name="signup" onFinish={onFinish}>
        <Form.Item
          name="username"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
            {
              max: 12,
              min: 3,
            },
          ]}
        >
          <Input size="large" placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          name="email"
          validateTrigger="onSubmit"
          rules={[
            {
              required: true,
              max: 50,
              message: 'Please input your email',
            },
            {
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
              message: 'Please input your password',
            },
            {
              max: 20,
              min: 8,
            },
          ]}
        >
          <Input.Password size="large" placeholder="Type your password" />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            className="signup__btn"
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div className="signup__btns-wrapper ">
        <GoogleLoginBtn setAuth={setAuth} />
        <Button
          size="large"
          className="signup__login-btn"
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
