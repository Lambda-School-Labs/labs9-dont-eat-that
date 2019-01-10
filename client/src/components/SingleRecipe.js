import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const RecipeDescAndIngDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const SingleRecipe = props => {
  const id = props.match.params.id;
  if (props.recipes.length) {
    const recipe = props.recipes.find(recipe => `${recipe.id}` === id);
    return (
      <div>
        <h1>{recipe.name}</h1>
        <RecipeDescAndIngDiv>
          <div>
            <h5>Recipe Description</h5>
            <p>{recipe.description}</p>
          </div>
          <div>
            <h5>Ingredients</h5>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <li>{`${ingredient.name} ${ingredient.quantity} ${
                  ingredient.unit
                }`}</li>
              ))}
            </ul>
          </div>
        </RecipeDescAndIngDiv>
      </div>
    );
  }
  return <div>Loading...</div>;
};

const mapStateToProps = state => {
  return {
    recipes: state.recipesReducer.recipes
  };
};

export default connect(mapStateToProps)(SingleRecipe);
