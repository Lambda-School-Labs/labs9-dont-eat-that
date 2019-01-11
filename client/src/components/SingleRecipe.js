import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getRecipe, deleteRecipe } from '../actions';

const RecipeDescAndIngDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DeleteRecipeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  font-size: 1rem;
  padding: 15px;
`;

class SingleRecipe extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
  }
  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };
  render() {
    const { recipe } = this.props;
    if (recipe) {
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
              {}
              <ul>
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient.name}>{`${ingredient.name} ${
                    ingredient.quantity
                  } ${ingredient.unit}`}</li>
                ))}
              </ul>
            </div>
          </RecipeDescAndIngDiv>
          <DeleteRecipeButton onClick={this.deleteRecipe}>
            Delete Recipe
          </DeleteRecipeButton>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipesReducer.recipe
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, deleteRecipe }
)(SingleRecipe);
