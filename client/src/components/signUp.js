import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// import { FirebaseContext } from '../Firebase';
import { withFirebase } from './firebase';
import { compose } from 'recompose';  // manage higher order component



const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />

  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

   
  }

  
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    alert( 'JamesTsting');
    alert( email);

    console.log( 'test0: ' + email + passwordOne );

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
          alert('SingUp.js   create user SUCCESS');
        // this.setState({ ...INITIAL_STATE });
        //open right page after signup/in
        //this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log('SingUp.js   create user FAILED');
        alert('SingUp.js   create user FAILED');
        // this.setState({ error });
      });
      alert('SingUp.js   end of createUser ');
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  test = event => {
   
    console.log(this.props);
    console.log(this.props.firebase);

   
    this.props.firebase
    .doCreateUserWithEmailAndPassword("test@email.com", "edwsqa23#K")
       .then(authUser => {
        alert('SingUp.js   create user SUCCESS');
      // this.setState({ ...INITIAL_STATE });
      //open right page after signup/in
      //this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      console.log('SingUp.js   create user FAILED');
      alert('SingUp.js   create user FAILED');
      // this.setState({ error });
    });


  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <div>
      
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
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
        <button disabled={isInvalid} type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
      <button onClick = {this.test} > temp </button>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? 
    {/* <Link to={ROUTES.SIGN_UP}>Sign Up</Link> */}
  </p>
);

// without compose
//const SignUpForm = withFirebase(SignUpFormBase);

const SignUpForm = compose(
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };