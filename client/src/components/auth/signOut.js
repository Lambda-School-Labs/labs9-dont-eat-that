import React from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../firebase';

const SignOutButton = withRouter(({ firebase, history }) => {
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
});

export default withFirebase(SignOutButton);
