import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DisplayOneRecipe from './DisplayOneRecipe';
import SimpleSearch from './util/simpleSearch.js';
import { searchFunc } from "./util";


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
      query: "",
      isSearched: false
    };

    this.searchedRecipes = [];

  }

  displayDiv = () => {
    console.log("DisplayListRecipe.js   this.props.recipes = ", this.props.recipes);
    console.log("DisplayListRecipe.js   this.searchedRecipes = ", this.searchedRecipes);

    const displayedRecipes = this.searchedRecipes == [] ? this.props.recipes : this.searchedRecipes;
    const displayedRecipes1 = this.searchedRecipes == [] ? console.log('searchedRec is []') : console.log('searchedRec is NOT  []')


    console.log("DisplayListRecipe.js   displayRecipes = ", displayedRecipes);

    return displayedRecipes.map(recipe => {
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


  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isSearched: true
    });
    // this.props.handleSearchBoolean(true);
  };


  render()
  {
    if (this.state.isSearched){
      this.searchedRecipes = searchFunc(this.state.query, this.props.recipes);
      console.log("DisplayListRecipe.js   Inside Render  isSearched = true")
    }  
  

    return (
      <div className="recipe-list">
      <SimpleSearch 
               recipes={this.state.notes}
               query={this.state.query}
               handleInputChange={this.handleInputChange}
               />

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
  };


const mapStateToProps = state => {
  const { recipesReducer } = state;
  return {
    recipes: recipesReducer.recipes,
    error: recipesReducer.error,
    allergies: state.usersReducer.user.allergies
  };
};
  

export default connect(mapStateToProps)(DisplayListRecipes);
