// THIS IS DRAFT Version -- structure of this page will be discussed 
// app.js is main component that contains three main part of display 
// Top Menu component include app logo, search bar and login/signup
// SideMenu component has list of menu including recipe, billing, setting...
// DisplayRecipesViewer will control/manage the main part of the service, including display list of recipes, 
// whole recipes, add/edit/delete, billing, setting...



import React, { Component } from 'react';

import './App.css';
// import SideMenu from "./components/sideMenu.js";
// import TopMenu from "./components/topMenu.js";
import DisplayRecipesViewer from "./viewer/DisplayRecipesViewer.js";
import SignUp from "./components/signUp";



class App extends Component {

  



  render() {
    return (
      <div className="App">
        {/* <SideMenu /> */}


        <SignUp />

        <DisplayRecipesViewer />

      </div>
    );
  }
}

export default App;
