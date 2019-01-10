import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRecipes } from '../actions';
import DisplayListRecipes from '../components/DisplayListRecipes';
import CreateRecipe from '../components/CreateRecipe';

class DisplayRecipesViewer extends Component {
  componentDidMount() {
    // getting all the notes function will go here
    this.props.getAllRecipes();
  }
  render() {
    return (
      <div className="recipe-view-container">
        <Route exact path="/" component={DisplayListRecipes} />
        <Route path="/create" component={CreateRecipe} />
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
  { getAllRecipes }
)(DisplayRecipesViewer);
