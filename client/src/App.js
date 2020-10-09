import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import { Home, Signup, Login, Rooms, ChattingRoom } from './pages';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user');

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/v1/checkToken');
      if (data === 'un-auth') setLoading(false);
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
  }, [auth]);

  if (loading) {
    return <Spin />;
  }
  return (
    <div className="App">
      {auth ? (
        <Switch>
          <Route path="/rooms/:room">
            <ChattingRoom />
          </Route>
          <Route path="/rooms">
            <Rooms role={role} setRole={setRole} setAuth={setAuth} />
          </Route>
          <Route path="*">
            <Redirect to="rooms" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup">
            <Signup setAuth={setAuth} />
          </Route>
          <Route path="/login">
            <Login setAuth={setAuth} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
