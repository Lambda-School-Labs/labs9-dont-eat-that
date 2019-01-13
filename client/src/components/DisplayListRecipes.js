import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DisplayOneRecipe from './DisplayOneRecipe';

const DisplayListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CreateRecipeDiv = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

class DisplayListRecipes extends Component {
  displayDiv = () => {
    return this.props.recipes.map(recipe => {
      // returns a JSX element
      const outerBoolArr = recipe.ingredients.map(ingredient => {
        // mapping through ingredient array
        const innerBoolArr = this.props.allergies.map(
          allergy => allergy === ingredient.name
        );
        return innerBoolArr.includes(true);
      });
      if (outerBoolArr.includes(true)) {
        return <DisplayOneRecipe key={recipe.id} recipe={recipe} allergy />;
      } else {
        return <DisplayOneRecipe key={recipe.id} recipe={recipe} />;
      }
    });
  };
  render() {
    return (
      <div className="recipe-list">
        <h1>Recipes</h1>
        <DisplayListDiv>
          <Link to="/recipes/new" style={{ textDecoration: 'none' }}>
            <CreateRecipeDiv>
              <h3>Create a Recipe</h3>
            </CreateRecipeDiv>
          </Link>
          {this.displayDiv()}
        </DisplayListDiv>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipesReducer } = state;
  return {
    recipes: recipesReducer.recipes,
    error: recipesReducer.error,
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(mapStateToProps)(DisplayListRecipes);
