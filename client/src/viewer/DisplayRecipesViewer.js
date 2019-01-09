import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../actions';
import DisplayListRecipes from "../components/DisplayListRecipes";
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
         component={DisplayListRecipes}
          
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

const mapStateToProps = state => {
  const { getRecipes } = state;
  return {
    recipes: state.recipes,
    error: state.error
  };
};
export default connect(mapStateToProps, {getRecipes})(DisplayRecipeViewer);
