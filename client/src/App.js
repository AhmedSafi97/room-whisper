import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Rooms from './Components/Rooms';
import Landing from './Components/Landing';
import WithAuth from './Components/WithAuth';
import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  const history = useHistory();
  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route exact path="/">
            <WithAuth authStatus="logout">
              <Landing history={history} />
            </WithAuth>
          </Route>
          <Route path="/login">
            <WithAuth authStatus="logout">
              <Login history={history} />
            </WithAuth>
          </Route>
          <Route path="/signup">
            <WithAuth authStatus="logout">
              <Signup history={history} />
            </WithAuth>
          </Route>
          <Route path="/rooms">
            <WithAuth authStatus="login">
              <Rooms history={history} />
            </WithAuth>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
