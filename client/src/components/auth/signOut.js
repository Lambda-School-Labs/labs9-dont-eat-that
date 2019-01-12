import React from 'react';

import { withFirebase } from '../firebase';

const SignOutButton = ({ firebase }) => {
  const onSignOut = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    firebase.doSignOut();
  };
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default withFirebase(SignOutButton);
