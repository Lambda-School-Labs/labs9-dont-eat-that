import React from 'react';
import { withFirebase } from './firebase';
import { compose } from 'recompose';

class LogOut extends React.Component {
  onLogOut = e => {
    e.preventDefault();
    this.props.firebase
      .doSignOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>LogOut</h1>
        <button onClick={this.onLogOut}>LogOut</button>
      </div>
    );
  }
}

export default compose(withFirebase)(LogOut);
