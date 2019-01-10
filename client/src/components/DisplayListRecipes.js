import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayOneRecipe from './displayOneRecipe';

class DisplayListRecipes extends Component {
  render() {
    return (
      <div className="recipe-list">
        <h1>Recipes</h1>
        <ul>
          {this.props.recipes.map(recipe => {
            return (
              <div>
                <DisplayOneRecipe key={recipe.id} recipe={recipe.name} description={recipe.description} />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipesReducer } = state;
  return {
    recipes: state.recipes,
    error: state.error
  };
};

export default connect(mapStateToProps)(DisplayListRecipes);
