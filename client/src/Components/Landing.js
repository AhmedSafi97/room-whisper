import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const history = useHistory();

  return (
    <>
      <h1>Welcome</h1>
      <Button onClick={() => history.push('/login')}>Login</Button>
      <Button onClick={() => history.push('/signup')}>Sign Up</Button>
    </>
  );
};

export default Landing;
