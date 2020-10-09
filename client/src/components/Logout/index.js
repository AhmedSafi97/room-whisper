import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';

const Logout = ({ setAuth, setRole }) => {
  const logout = async () => {
    try {
      await axios.get('/api/v1/logout');
      setAuth(false);
      setRole('user');
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  return <Button onClick={logout}>Logout</Button>;
};

Logout.propTypes = {
  setRole: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};

export default Logout;
