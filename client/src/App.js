// THIS IS DRAFT Version -- structure of this page will be discussed
// app.js is main component that contains three main part of display
// Top Menu component include app logo, search bar and login/signup
// SideMenu component has list of menu including recipe, billing, setting...
// DisplayRecipesViewer will control/manage the main part of the service, including display list of recipes,
// whole recipes, add/edit/delete, billing, setting...

import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
// import SideMenu from "./components/sideMenu.js";
// import TopMenu from "./components/topMenu.js";
import DisplayRecipesViewer from './viewer/DisplayRecipesViewer.js';
import SingleRecipe from './components/SingleRecipe';
import SignUp from './components/signUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';

const NavDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavDiv>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">LogIn</NavLink>
          <NavLink to="/logout">LogOut</NavLink>
          <NavLink to="/recipes">Recipes List</NavLink>
          <NavLink to="/recipes/new">New Recipe</NavLink>
        </NavDiv>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/logout" component={LogOut} />
        <Route path="/recipes" component={DisplayRecipesViewer} />
        <Route exact path="/recipes/one/:id" component={SingleRecipe} />
      </div>
    );
  }
}

export default App;
