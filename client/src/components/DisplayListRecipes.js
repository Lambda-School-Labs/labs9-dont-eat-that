import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  getAllRecipes,
  getOwnRecipes,
  getForeignRecipes,
  getAllergies
} from '../actions';

import DisplayOneRecipe from './DisplayOneRecipe';
import SimpleSearch from './util/simpleSearch.js';
import { searchFunc } from './util';

const DisplayListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CreateRecipeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  height: 200px;
  width: 200px;
  padding: 10px;
  margin: 10px;
`;

class DisplayListRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isSearched: false,
      personalCheck: true,
      displayedRecipes: []
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('uid')) {
      this.props.getAllRecipes();
    } else if (this.state.personalCheck) {
      this.props.getOwnRecipes();
    } else {
      this.props.getForeignRecipes();
    }
    this.props.getAllergies();
  }

  // maybe filter the array?
  displayDiv = () => {
    return this.state.displayedRecipes.map(recipe => {
      // returns on of the JSX elements in if/else below
      const outerBoolArr = recipe.ingredients.map(ingredient => {
        const innerBoolArr = this.props.allergies.map(
          allergy => allergy === ingredient.name // seeing if any allergies in one ingredient
        );
        return innerBoolArr.includes(true); // returns true if allergy in ingredient
      });
      if (outerBoolArr.includes(true)) {
        // seeing if any allergies in all ingredients
        return <DisplayOneRecipe key={recipe.id} recipe={recipe} allergy />;
      } else {
        return <DisplayOneRecipe key={recipe.id} recipe={recipe} />;
      }
    });
  };

  handleInputChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.query) {
      this.setState({
        displayedRecipes: searchFunc(this.state.query, this.props.recipes)
      });
    } else {
      this.setState({ displayedRecipes: this.props.recipes });
    }
  };
  // edge case for spacing, for later

  checkHandler = async ev => {
    await this.setState({
      personalCheck: ev.target.checked
    });
    if (this.state.personalCheck) {
      this.props.getOwnRecipes();
    } else {
      this.props.getForeignRecipes();
    }
  };

  displayRecipesCheck = async () => {
    await this.setState({ displayedRecipes: this.props.recipes });
  };

  render() {
    if (this.state.displayedRecipes.length !== this.props.recipes.length) {
      this.displayRecipesCheck();
    }
    return (
      <div className="recipe-list">
        <SimpleSearch
          query={this.state.query}
          handleInputChange={this.handleInputChange}
        />
        {localStorage.getItem('uid') && (
          <form>
            <input
              type="checkbox"
              id="personalCheck"
              name="personalCheck"
              onChange={this.checkHandler}
              checked={this.state.personalCheck}
            />
            <label htmlFor="personalCheck">See your own recipes</label>
          </form>
        )}

        <h1>Recipes</h1>
        <DisplayListDiv>
          <Link to="/recipes/new" style={{ textDecoration: 'none' }}>
            <CreateRecipeDiv>
              <h3>Create a Recipe</h3>
              <h3>+</h3>
            </CreateRecipeDiv>
          </Link>

          {this.displayDiv()}
        </DisplayListDiv>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipesReducer.recipes,
    error: state.recipesReducer.error,
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { getAllRecipes, getOwnRecipes, getForeignRecipes, getAllergies }
)(DisplayListRecipes);
