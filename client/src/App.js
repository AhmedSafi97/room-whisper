import React from 'react';
import { Switch } from 'react-router-dom';
import { Spin } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import UserContext from './context';
import { useAuth } from './utils';
import { Home, Signup, Login, Rooms, ChattingRoom } from './pages';
import { PublicRoute, PrivateRoute } from './components';

const App = () => {
  const { loading, auth, setAuth, username, removeCurrentUser } = useAuth();

  if (loading) {
    return <Spin />;
  }
  return (
    <UserContext.Provider
      value={{ auth, setAuth, username, removeCurrentUser }}
    >
      <div className="App">
        <Switch>
          <PublicRoute exact path="/">
            <Home />
          </PublicRoute>
          <PublicRoute path="/signup">
            <Signup />
          </PublicRoute>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/rooms/:room">
            <ChattingRoom />
          </PrivateRoute>
          <PrivateRoute path="/rooms">
            <Rooms />
          </PrivateRoute>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;
