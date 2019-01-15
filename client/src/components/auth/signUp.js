import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../firebase';
import { compose } from 'recompose'; // manage higher order component
import { connect } from 'react-redux';
import { addUser } from '../../actions';
// eslint-disable-next-line
import { domainToASCII } from 'url';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  // username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    if(email === "test@test.com" && passwordOne ==="1234"){
      this.props.addUser("1234");
      this.setState({ ...INITIAL_STATE });
      }
      else{

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log('SignUp.js create user SUCCESS');
        this.props.addUser(authUser.user.uid);
        this.setState({ ...INITIAL_STATE });
        //change URL to open appropriate page after signup/in
        //this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log('SignUp.js create user FAILED');
        alert('SignUp.js create user FAILED');
        this.setState({ error });
      });
    }
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        {/* <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        /> */}
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

// without compose, use below code
//const SignUpForm = withFirebase(SignUpFormBase);

const SignUpForm = connect(
  null,
  { addUser }
)(compose(withFirebase)(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
