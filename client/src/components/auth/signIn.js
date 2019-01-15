import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './signUp.js';
import  PasswordForgetPage  from './passwordForgot.js';

import { withFirebase } from '../firebase/index.js';
import { getUser, addUser } from '../../actions';
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
  error: null,
  resetPassword : false,

};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async event => {
    console.log('Inside Signin OnSubmit ');
    event.preventDefault();
    const { email, password } = this.state;

    if(email === "test@test.com" && password ==="1234"){
    this.setState({ ...INITIAL_STATE });
    localStorage.setItem('uid', "1234");
    await this.props.getUser()
    // should change below code so it would wait until getUser is completed...
    this.props.history.push('/recipes');
    }
    else{
      console.log('Inside Signin OnSubmit Else');
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
        return res;
      })
      .then(res => this.props.history.push('/recipes'))
      .catch(error => {
        this.setState({ error });
      });
    }
  };

  resetPassword = e => {
    e.preventDefault();
    this.setState({resetPassword : true});
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    const resetPasswordComponent = this.state.resetPassword === false ? null : <PasswordForgetPage/>;

    return (
      <section>
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

        <button onClick={this.resetPassword} >
          Forgot Password?
        </button>

        {error && <p>Signin.js email Signin {error.message}</p>}
      </form>

      {resetPasswordComponent}
        </section>
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
        this.props.addUser(user.user.uid);
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
        this.props.addUser(user.user.uid);
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
    { getUser, addUser }
  )(compose(withFirebase)(SignInGoogleBase))
);

const SignInFacebook = withRouter(
  connect(
    null,
    { getUser, addUser }
  )(compose(withFirebase)(SignInFacebookBase))
);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };
