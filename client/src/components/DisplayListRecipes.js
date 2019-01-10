import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import DisplayOneRecipe from "./DisplayOneRecipe";

class DisplayListRecipes extends Component {
  render() {
    return (
      <div className="recipe-list">
        <h1>Recipes</h1>
        <Link to='recipes/new'>Enter New Recipe</Link>
        <ul>
          {this.props.recipes.map(recipe => {
            return (
              <div>
                <DisplayOneRecipe key={recipe.id} recipe={recipe} />
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
    recipes: recipesReducer.recipes,
    error: recipesReducer.error
  };
};

export default connect(mapStateToProps)(DisplayListRecipes);
