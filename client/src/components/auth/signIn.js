import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './signUp.js';
import { withFirebase } from '../firebase/index.js';
import { getUser } from '../../actions';
// import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
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
        console.log('PROPS', this.props);
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

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        localStorage.setItem('uid', user.user.uid);
        return user;
      })
      .then(res => {
        this.props.getUser();
        this.props.history.push('/recipes');
      })
      // .then(socialAuthUser => {
      //   console.log("Google USer obj = ", socialAuthUser.user);
      //   // Create a user in your Firebase Realtime Database too
      //   // return this.props.firebase
      //   //   .user(socialAuthUser.user.uid)
      //   //   .set({
      //   //     username: socialAuthUser.user.displayName,
      //   //     email: socialAuthUser.user.email,
      //   //     roles: [],
      //   //   });
      // })
      // .then(() => {
      //   this.setState({ error: null });
      // //  this.props.history.push(ROUTES.HOME);
      // })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
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

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignInForm = withRouter(
  connect(
    null,
    { getUser }
  )(compose(withFirebase)(SignInFormBase))
);

const SignInGoogle = withRouter(
  connect(
    null,
    { getUser }
  )(compose(withFirebase)(SignInGoogleBase))
);

const SignInFacebook = withRouter(
  connect(
    null,
    { getUser }
  )(compose(withFirebase)(SignInFacebookBase))
);

export default SignInPage;

export { SignInForm, SignInGoogle };
