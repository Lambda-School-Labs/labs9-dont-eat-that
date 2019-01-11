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
          {this.props.recipes.map(recipe => {
            return <DisplayOneRecipe key={recipe.id} recipe={recipe} />;
          })}
        </DisplayListDiv>
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
