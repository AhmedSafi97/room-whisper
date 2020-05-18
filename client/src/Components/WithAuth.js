import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const WithAuth = ({ authStatus, children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('user');

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/v1/checkToken');
      if (typeof data === 'string') setLoading(false);
      else {
        if (data.role === 'admin') setRole('admin');
        setAuth(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  });
  if (loading) return <Spin />;
  if (authStatus === 'login') {
    return auth ? (
      <div>{React.cloneElement(children, { role })}</div>
    ) : (
      <Redirect to="/login" />
    );
  }
  return auth ? <Redirect to="/rooms" /> : children;
};

WithAuth.propTypes = {
  authStatus: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default WithAuth;
