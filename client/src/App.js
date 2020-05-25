import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Rooms from './Components/Rooms';
import Landing from './Components/Landing';
import ChattingRoom from './Components/ChattingRoom';

import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  const history = useHistory();
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
      <div className="App-header">
        {auth ? (
          <Switch>
            <Route path="/rooms/:room">
              <ChattingRoom history={history} />
            </Route>
            <Route path="/rooms">
              <Rooms
                history={history}
                role={role}
                setRole={setRole}
                setAuth={setAuth}
              />
            </Route>
            <Route path="*">
              <Redirect to="rooms" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <Signup history={history} setAuth={setAuth} />
            </Route>
            <Route path="/login">
              <Login history={history} setAuth={setAuth} />
            </Route>
            <Route exact path="/">
              <Landing history={history} />
            </Route>
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
};

export default App;
