import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import Login from './Components/Form/Login';
import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  const history = useHistory();
  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome</h1>
        <Button onClick={() => history.push('/login')}>Sign In</Button>

        <Switch>
          <Route path="/login">
            <Login history={history} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
