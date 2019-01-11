import React from 'react';
import { withFirebase } from './firebase';
import { compose } from 'recompose';

class LogIn extends React.Component {
  state = {
    email: '',
    password: ''
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res', res);
        this.setState({ email: '', password: '' });
        this.props.history.push('/recipes');
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>LogIn</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.onInputChange}
        />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default compose(withFirebase)(LogIn);
