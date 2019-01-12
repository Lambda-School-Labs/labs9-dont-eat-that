import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRecipes, getRecipe } from '../actions';

import DisplayListRecipes from '../components/DisplayListRecipes';

class DisplayRecipesViewer extends Component {
  componentDidMount() {
    // getting all the notes function will go here
    this.props.getAllRecipes();
  }
  render() {
    return (
      <div className="recipe-view-container">
        <Route exact path="/recipes" component={DisplayListRecipes} />
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
  return {
    recipes: state.recipesReducer.recipes,
    error: state.recipesReducer.error
  };
};
export default connect(
  mapStateToProps,
  { getAllRecipes, getRecipe }
)(DisplayRecipesViewer);
