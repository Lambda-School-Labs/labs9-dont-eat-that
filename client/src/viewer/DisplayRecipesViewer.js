import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllRecipes, getAllergies } from '../actions';

import DisplayListRecipes from '../components/DisplayListRecipes';

class DisplayRecipesViewer extends Component {
  componentDidMount() {
    // getting all the notes function will go here
    this.props.getAllRecipes();
    this.props.getAllergies();
  }
  render() {
    return (
      <div className="recipe-view-container">
        <Route exact path="/recipes" component={DisplayListRecipes} />
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
  { getAllRecipes, getAllergies }
)(DisplayRecipesViewer);
