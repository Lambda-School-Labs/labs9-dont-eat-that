import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../actions';
// import {
//   DeleteRecipe,
//   DisplayListRecipes,
//   DisplayOneRecipe,
//   EditRecipe,
//   Login,
//   Nutrition,
//   UserSettings,
//   Sidebar,
//   SearchBar
// } from '../components';

// this will be for the actions
// import {

// }

class DisplayRecipeViewer extends Component {
  componentDidMount() {
    // getting all the notes function will go here
    this.props.getRecipes();
  }
  render() {
    return (
      <div className="recipe-view-container">
        <Route
          path="/"
          render={props => {
            <DisplayListRecipes />;
          }}
        />

        {/*         
        <header>
          <Route
            path="/"
            render={props => {
              <Login />;
            }}
          />
          <Route
            path="/"
            render={props => {
              <SearchBar />;
            }}
          />
        </header>
        <div className="recipe-body">
          <main className="recipe-list">
          <Route
            path="/"
            render={props => {
              <DisplayListRecipes />;
            }}
          />
          </main>
          <nav>
          <Route
            path="/"
            render={props => {
              <Sidebar />;
            }}
          />
          </nav>
        </div>
        <footer>license, disclaimers, links to profiles are here</footer>
      </div> */}
      </div>
    );
  }
}

export default DisplayRecipeViewer;
