import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Button, Rating, Table } from 'semantic-ui-react';
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

  displayRecipe = recipe => {
    return (
      <React.Fragment>
        <h1>{recipe.name}</h1>
        {localStorage.getItem('uid') && (
          <Button
            onClick={() => {
              this.copyRecipe(recipe);
              this.props.history.push('/recipes');
            }}
          >
            Copy Recipe
          </Button>
        )}
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
        <div>
          <Rating
            icon="star"
            rating={this.ratingsFunc(recipe)}
            onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
            maxRating={5}
            disabled={!localStorage.getItem('uid')}
          />
          {this.props.recipe.ratings.length}
        </div>
        <div>
          <h3>
            <strong>Ingredients</strong>
          </h3>
          <ul>
            {recipe.ingredients.map(ingr => (
              <li key={ingr.name}>{`${ingr.quantity} ${
                ingr.unit ? ingr.unit : ''
              } ${ingr.name}`}</li>
            ))}
          </ul>
        </div>
        <br />
        <div>
          <h3>
            <strong>Recipe Description</strong>
          </h3>
          <p>{Parser(recipe.description)}</p>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { recipe, nutrition } = this.props;
    if (recipe && !nutrition) {
      this.getNutrition();
      return <div>{this.displayRecipe(recipe)}</div>;
    } else if (recipe && nutrition) {
      // copy of the above code except showing nutrition info when they're a subscriber
      return (
        <div>
          {this.displayRecipe(recipe)}
          <Table
            celled
            structured
            color="blue"
            style={{ width: '95%', marginLeft: '2.5%' }}
            inverted
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <h3>Nutrition Facts</h3>
                  <p>Servings: {nutrition.yield}</p>
                  <p>Calories: {nutrition.calories}</p>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Diet Labels:{' '}
                  {nutrition.dietLabels.map(label => label.toLowerCase() + ' ')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Health Labels:{' '}
                  {nutrition.healthLabels.map(
                    label => label.toLowerCase() + ' '
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Carbohydrates:{' '}
                  {nutrition.totalNutrients.CHOCDF
                    ? `${Math.round(
                        nutrition.totalNutrients.CHOCDF.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.CHOCDF.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.CHOCDF.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Protein:{' '}
                  {nutrition.totalNutrients.PROCNT
                    ? `${Math.round(
                        nutrition.totalNutrients.PROCNT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.PROCNT.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.PROCNT.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Fat:{' '}
                  {nutrition.totalNutrients.FAT
                    ? `${Math.round(
                        nutrition.totalNutrients.FAT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.FAT.unit}`
                    : '0 g'}
                  {' | '}
                  {Math.round(nutrition.totalDaily.FAT.quantity * 10) / 10}%
                  Daily Value
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
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
