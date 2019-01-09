import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class DisplayListRecipes extends Component {
  render() {
    return (
      <div className="recipe-list">
        <h1>Recipes</h1>
        <ul>
          {this.props.recipes.map(recipe => {
            return (
              <div>
                <Recipe
                  key={recipe.id}
                  recipe={recipes.name}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { recipesReducer} = state;
    return {
        recipes: recipesReducer.recipes,
        error: recipesReducer.error
    };
};

export default connect(mapStateToProps)(DisplayListRecipes);