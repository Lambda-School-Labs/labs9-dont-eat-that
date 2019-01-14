import React from 'react';
import { Redirect } from 'react-router-dom';

import { withFirebase } from '../firebase';

const SignOutButton = ({ firebase }) => {
  const onSignOut = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    firebase.doSignOut();
    history.push('/');
  };
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default withFirebase(SignOutButton);
