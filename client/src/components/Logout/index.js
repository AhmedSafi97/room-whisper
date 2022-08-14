import React, { useContext } from 'react';
import { Button, message } from 'antd';

import axios from '../../utils/axios';
import UserContext from '../../context';

const Logout = () => {
  const { removeCurrentUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get('/logout');
      removeCurrentUser();
    } catch (err) {
      message.error('Something went wrong, please try again later');
    }
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
