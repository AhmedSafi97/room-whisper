import React, { useContext } from 'react';
import axios from 'axios';
import { Button, message } from 'antd';

import UserContext from '../../context';

const Logout = () => {
  const { removeCurrentUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get('/api/v1/logout');
      removeCurrentUser();
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
