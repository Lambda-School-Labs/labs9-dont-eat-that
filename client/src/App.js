import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import styled from 'styled-components';
import AddFromWeb from './components/AddFromWeb';
import './App.css';
import DisplayListRecipes from './components/DisplayListRecipes';
import AddNewRecipeForm from './components/AddNewRecipeForm';
import { withFirebase } from './components/firebase';
import SingleRecipe from './components/SingleRecipe';
import EditRecipe from './components/EditRecipe';
import SignUp from './components/auth/signUp';
import SignIn from './components/auth/signIn';
import SignOut from './components/auth/signOut';
import CheckoutForm from './components/CheckoutForm';
import Settings from './components/Settings';
import ConditionalLanding from './components/Landing';
import MainDisplaySection from './mainDisplaySection';
import TopMenu from './components/menus/topMenu.js';
 import SideMenu from './components/menus/sideMenu.js';


const NavDiv = styled.div`
  justify-content: space-evenly;
`;

class App extends Component {
  // componentDidMount and componentWillUnmout is used to check if user is loggedin
  // it will make state changes when user login or out.
  // guide provide other way that remove this.  that require more higher order components.
  // but that method would be hard to use redux state management
  // it might be good to use higher order components and not using redux...

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      // will make change with redux
      authUser ? console.log('logged IN') : console.log('logged OUT');

      // ? this.setState({ authUser })
      // : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
  render() {
    if (localStorage.uid) {

    }
    return (
      <StripeProvider apiKey="pk_test_Alg5oAZ6fNYUyT65GQtla9et">
        <div className="App">
          <TopMenu />
          <SideMenu /> 
          <MainDisplaySection />

        </div>
      </StripeProvider>
    )
  }
}

export default withFirebase(App);
