import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import Login from './Components/Form/Login';
import Signup from './Components/Form/Signup';

import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  const history = useHistory();
  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome</h1>
        <Button onClick={() => history.push('/login')}>Login</Button>
        <Button onClick={() => history.push('/signup')}>Sign Up</Button>

        <Switch>
          <Route path="/login">
            <Login history={history} />
          </Route>
          <Route path="/signup">
            <Signup history={history} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
