// THIS IS DRAFT Version -- structure of this page will be discussed
// app.js is main component that contains three main part of display
// Top Menu component include app logo, search bar and login/signup
// SideMenu component has list of menu including recipe, billing, setting...
// DisplayRecipesViewer will control/manage the main part of the service, including display list of recipes,
// whole recipes, add/edit/delete, billing, setting...

import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
// import SideMenu from "./components/sideMenu.js";
// import TopMenu from "./components/topMenu.js";
<<<<<<< HEAD
import DisplayRecipesViewer from "./viewer/DisplayRecipesViewer.js";
import SignInPage from "./components/auth/signIn.js";
import SignOutButton from "./components/auth/signOut.js";
import { withFirebase } from './components/firebase';

class App extends Component {
  

// componentDidMount and componentWillUnmout is used to check if user is loggedin
// it will make state changes when user login or out.
// guide provide other way that remove this.  that require more higher order components.
// but that method would be hard to use redux state management
// it might be good to use higher order components and not using redux... 


  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
 
        // will make change with redux
        authUser
          ? console.log("logged IN")
          : console.log("logged OUT")

          // ? this.setState({ authUser })
          // : this.setState({ authUser: null });
      },
    );
  }
  componentWillUnmount() {
    this.listener();
  }

  
  
=======
import DisplayRecipesViewer from './viewer/DisplayRecipesViewer.js';
import SingleRecipe from './components/SingleRecipe';
import SignUp from './components/signUp';

class App extends Component {
>>>>>>> dev
  render() {
    return (
      <div className="App">
        <SignInPage />
        <SignOutButton />
        <NavLink to="/recipes">Recipes List</NavLink>
        <NavLink to="/recipes/new">New Recipe</NavLink>
        <Route path="/recipes" component={DisplayRecipesViewer} />
        <Route exact path="/recipes/one/:id" component={SingleRecipe} />
      </div>
    );
  }
}

export default withFirebase(App);
