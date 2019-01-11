import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getRecipe } from '../actions';

const RecipeDescAndIngDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

class SingleRecipe extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
  }
  render() {
    const { recipe } = this.props;
    console.log(this.props);
    console.log(recipe);
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
                  <li>{`${ingredient.name} ${ingredient.quantity} ${
                    ingredient.unit
                  }`}</li>
                ))}
              </ul>
            </div>
          </RecipeDescAndIngDiv>
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
  { getRecipe }
)(SingleRecipe);
