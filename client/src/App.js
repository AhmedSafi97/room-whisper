import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import './App.css';

const successResponse = (response) => {
  const { tokenId } = response;
  console.log(tokenId);
  axios
    .post('/api/v1/login/google', { tokenId })
    .then(console.log)
    .catch(console.log);
};

const failureResponse = (response) => {
  console.log('error', response);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
      </header>
      <GoogleLogin
        clientId="882324455984-i7obpjbjr79rug23t9aitmlc15cqvqtf.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default App;
