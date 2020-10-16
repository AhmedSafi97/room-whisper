import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../context';

const PublicRoute = ({ children, path }) => {
  const { auth } = useContext(UserContext);

  return (
    <Route path={path}>{auth ? <Redirect to="/rooms" /> : children}</Route>
  );
};

PublicRoute.propTypes = {
  children: propTypes.node.isRequired,
  path: propTypes.string.isRequired,
};

export default PublicRoute;
