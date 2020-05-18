import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from 'antd';

const Landing = ({ history }) => {
  return (
    <>
      <h1>Welcome</h1>
      <Button onClick={() => history.push('/login')}>Login</Button>
      <Button onClick={() => history.push('/signup')}>Sign Up</Button>
    </>
  );
};

Landing.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Landing;
