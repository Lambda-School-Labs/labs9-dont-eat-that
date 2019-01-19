import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Button, Rating } from 'semantic-ui-react';
import styled from 'styled-components';
import {
  getRecipe,
  deleteRecipe,
  getNutrition,
  removeNutrition,
  getUser,
  addRecipe,
  ratingChange
} from '../actions';

const RecipeDescAndIngDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: left;
`;

const CopyRecipeSpan = styled.span`
  cursor: pointer;
  border: 1px solid black;
`;

class SingleRecipe extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
    this.props.getUser();
  }

  getNutrition = () => {
    const { name, ingredients } = this.props.recipe;
    const ingrArr = ingredients.map(
      ingr =>
        `${ingr.quantity ? ingr.quantity : ''} ${ingr.unit ? ingr.unit : ''} ${
          ingr.name
        }`
    );
    this.props.getNutrition(name, ingrArr); // gets nutritional value of recipe from Edamam
  };

  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };

  copyRecipe = recipe => {
    this.props.addRecipe({
      name: recipe.name,
      description: recipe.description,
      firebaseid: localStorage.getItem('uid'),
      ingredients: recipe.ingredients
    });
  };

  ratingsFunc = recipe => {
    // gets all ratings for recipe
    console.log(recipe);
    if (!recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  rateFunc = (e, data, recipeid) => {
    // processes rating from user for recipe
    this.props.ratingChange(recipeid, data.rating);
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
          <h1>
            {recipe.name}{' '}
            {localStorage.getItem('uid') ? (
              <CopyRecipeSpan
                onClick={() => {
                  this.copyRecipe(recipe);
                  this.props.history.push('/recipes');
                }}
              >
                Copy Recipe
              </CopyRecipeSpan>
            ) : null}
          </h1>
          <div>
            <Rating
              icon="star"
              rating={this.ratingsFunc(recipe)}
              onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
              maxRating={5}
            />
            {this.props.recipe.ratings.length}
          </div>
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
              <Button color="green">Edit Recipe</Button>
            </Link>
          )}
          {recipe.user_id === this.props.user.id && (
            <Button color="red" onClick={this.deleteRecipe}>
              Delete Recipe
            </Button>
          )}
        </div>
      );
    } else if (recipe && nutrition) {
      // copy of the above code except showing nutrition info when they're a subscriber
      return (
        <div>
          <h1>
            {recipe.name}{' '}
            {localStorage.getItem('uid') ? (
              <Button
                onClick={() => {
                  this.copyRecipe(recipe);
                  this.props.history.push('/recipes');
                }}
              >
                Copy Recipe
              </Button>
            ) : null}
          </h1>
          <div>
            <Rating
              icon="star"
              rating={this.ratingsFunc()}
              onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
              maxRating={5}
            />
            {this.props.recipe.ratings.length}
          </div>
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
                  <li key={ingr.name}>{`${ingr.quantity ? ingr.quantity : ''} ${
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
            <p> </p>
            <h5>Macronutrients</h5>
            <p>
              Carbohydrates:{' '}
              {nutrition.totalNutrients.CHOCDF
                ? `${nutrition.totalNutrients.CHOCDF.quantity} ${
                    nutrition.totalNutrients.CHOCDF.unit
                  }`
                : '0 g'}
            </p>
            <p>
              Protein:{' '}
              {nutrition.totalNutrients.PROCNT
                ? `${nutrition.totalNutrients.PROCNT.quantity} ${
                    nutrition.totalNutrients.PROCNT.unit
                  }`
                : '0 g'}
            </p>
            <p>
              Fat:{' '}
              {nutrition.totalNutrients.FAT
                ? `${nutrition.totalNutrients.FAT.quantity} ${
                    nutrition.totalNutrients.FAT.unit
                  }`
                : '0 g'}
            </p>
          </div>
          {(recipe.user_id === this.props.user.id ||
            this.props.user.id === 1) && (
            <Link to={`/recipes/edit/${this.props.match.params.id}`}>
              <Button color="green">Edit Recipe</Button>
            </Link>
          )}
          {(recipe.user_id === this.props.user.id ||
            this.props.user.id === 1) && (
            <Button color="red" onClick={this.deleteRecipe}>
              Delete Recipe
            </Button>
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
    user: state.usersReducer.user,
    rating: state.recipesReducer.rating
  };
};

export default connect(
  mapStateToProps,
  {
    getRecipe,
    deleteRecipe,
    getNutrition,
    removeNutrition,
    getUser,
    addRecipe,
    ratingChange
  }
)(SingleRecipe);
