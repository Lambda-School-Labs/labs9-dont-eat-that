import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { SignUpLink } from './signUp.js';
import { withFirebase } from '../firebase/index.js';
import { getUser } from '../../actions';
// import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        localStorage.setItem('uid', user.user.uid);
        return user;
      })
      .then(res => {
        this.props.getUser();
        this.props.history.push('/recipes');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = connect(
  null,
  { getUser }
)(compose(withFirebase)(SignInFormBase));

export default SignInPage;

export { SignInForm };
