import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../app/firebase';
import '../styles/Login.css';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/61p10BsEN-L.png"
          alt="chat-me"
        />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
