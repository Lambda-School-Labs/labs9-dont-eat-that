import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SideMenu from "./components/sideMenu.js";
import TopMenu from "./components/topMenu.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopMenu />
        <SideMenu />
        <DisplayRecipesViewer />
      </div>
    );
  }
}

export default App;
