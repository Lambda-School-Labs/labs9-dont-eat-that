import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import styled from 'styled-components';
import {
  getRecipe,
  deleteRecipe,
  getNutrition,
  removeNutrition,
  getUser
} from '../actions';

const RecipeDescAndIngDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: left;
`;

const DeleteRecipeButton = styled.button`
  position: absolute;
  top: 40px;
  right: 10px;
  background: red;
  font-size: 1rem;
  padding: 15px;
`;

const EditRecipeButton = styled.button`
  position: absolute;
  top: 40px;
  left: 10px;
  background: green;
  font-size: 1rem;
  padding: 15px;
`;

class SingleRecipe extends React.Component {
  state = {};
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
    this.props.getUser();
  }
  getNutrition = () => {
    const { name, ingredients } = this.props.recipe;
    const ingrArr = ingredients.map(
      ingr => `${ingr.quantity} ${ingr.unit ? ingr.unit : ''} ${ingr.name}`
    );
    this.props.getNutrition(name, ingrArr); // gets nutritional value of recipe from Edamam
  };
  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };
  componentWillUnmount() {
    this.props.removeNutrition(); // removes nutrition from state
  }
  render() {
    const { recipe, nutrition } = this.props;
    if (recipe && !nutrition) {
      this.getNutrition();
      return (
        <div>
          <h1>{recipe.name}</h1>
          <RecipeDescAndIngDiv>
            <div>
              <h3>Recipe Description</h3>
              <p>{Parser(recipe.description)}</p>
            </div>
            <div>
              <h3>Ingredients</h3>
              {}
              <ul>
                {recipe.ingredients.map(ingr => (
                  <li key={ingr.name}>{`${ingr.quantity} ${
                    ingr.unit ? ingr.unit : ''
                  } ${ingr.name}`}</li>
                ))}
              </ul>
            </div>
          </RecipeDescAndIngDiv>
          {recipe.user_id === this.props.user.id && (
            <Link to={`/recipes/edit/${this.props.match.params.id}`}>
              <EditRecipeButton>Edit Recipe</EditRecipeButton>
            </Link>
          )}
          {recipe.user_id === this.props.user.id && (
            <DeleteRecipeButton onClick={this.deleteRecipe}>
              Delete Recipe
            </DeleteRecipeButton>
          )}
        </div>
      );
    } else if (recipe && nutrition) {
      // fix when going live
      // change when altering editrecipe or singlerecipe
      return (
        <div>
          <h1>{recipe.name}</h1>
          <RecipeDescAndIngDiv>
            <div>
              <h3>Recipe Description</h3>
              <p>{Parser(recipe.description)}</p>
            </div>
            <div>
              <h3>Ingredients</h3>
              {}
              <ul>
                {recipe.ingredients.map(ingr => (
                  <li key={ingr.name}>{`${ingr.quantity} ${
                    ingr.unit ? ingr.unit : ''
                  } ${ingr.name}`}</li>
                ))}
              </ul>
            </div>
          </RecipeDescAndIngDiv>
          <div>
            <h3>Nutrition Facts</h3>
            <p>Calories: {nutrition.calories}</p>
            <p>Servings: {nutrition.yield}</p>
            <h5>Macronutrients</h5>
            <p>
              Carbohydrates:{' '}
              {`${nutrition.totalNutrients.CHOCDF.quantity} ${
                nutrition.totalNutrients.CHOCDF.unit
              }`}
            </p>
            <p>
              Protein:{' '}
              {`${nutrition.totalNutrients.PROCNT.quantity} ${
                nutrition.totalNutrients.PROCNT.unit
              }`}
            </p>
            <p>
              Fat:{' '}
              {`${nutrition.totalNutrients.FAT.quantity} ${
                nutrition.totalNutrients.FAT.unit
              }`}
            </p>
          </div>
          {recipe.user_id === this.props.user.id && (
            <Link to={`/recipes/edit/${this.props.match.params.id}`}>
              <EditRecipeButton>Edit Recipe</EditRecipeButton>
            </Link>
          )}
          {recipe.user_id === this.props.user.id && (
            <DeleteRecipeButton onClick={this.deleteRecipe}>
              Delete Recipe
            </DeleteRecipeButton>
          )}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipesReducer.recipe,
    nutrition: state.nutritionReducer.nutrition,
    user: state.usersReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, deleteRecipe, getNutrition, removeNutrition, getUser }
)(SingleRecipe);
