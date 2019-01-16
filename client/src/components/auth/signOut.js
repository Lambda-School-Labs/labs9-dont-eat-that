import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUser } from '../../actions';

import { withFirebase } from '../firebase';

const SignOutButton = withRouter(({ firebase, history, removeUser }) => {
  const onSignOut = () => {
    localStorage.removeItem('uid');
    firebase.doSignOut();
    removeUser();
    history.push('/');
  };
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
});

export default connect(
  null,
  { removeUser }
)(withFirebase(SignOutButton));
