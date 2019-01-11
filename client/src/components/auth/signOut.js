import React from 'react';

import { withFirebase } from '../firebase';

const SignOutButton = ({ firebase }) => (
  <div>
    <h1>Sign Out</h1>
    <button onClick={firebase.doSignOut}>Sign Out</button>
  </div>
);

export default withFirebase(SignOutButton);
