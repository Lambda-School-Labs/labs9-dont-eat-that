import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DisplayOneRecipe from './DisplayOneRecipe';
import SimpleSearch from './util/simpleSearch.js';
import { searchFunc } from "./util";
import { Header, Container } from 'semantic-ui-react';

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

    this.displayedRecipes = [];

  }
  // maybe filter the array?
  displayDiv = () => {
        console.log(this.displayedRecipes);

        // for search result to work, I changed below code to use this.displayedRecipes, 
        // instead of this.props.recipes
        // displayedRecipes will get recipes array that match search query
        // if there is no search query, it will get this.props.recipes

    return this.displayedRecipes.map(recipe => {
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
     
    });
  
  };
// edge case for spacing, for later


  render()
  {
    // check if there is query and assign correct recipes array for this.displayedRecipes
    if (this.state.query){ 
      this.displayedRecipes = searchFunc(this.state.query, this.props.recipes);
    }  
    else{
    this.displayedRecipes = this.props.recipes;
    }

    return (
      <div className="recipe-list">
      {/* <Container fluid> */}

      <SimpleSearch 
               recipes={this.state.notes}
               query={this.state.query}
               handleInputChange={this.handleInputChange}
               />

        <Header as='h1'>Recipes</Header>
        <Header as='h1'>First Header</Header>
        <DisplayListDiv>
          <Link to="/recipes/new" style={{ textDecoration: 'none' }}>
            <CreateRecipeDiv>
              <h3 as='h3'>Create a Recipe</h3>
              <h3>+</h3>
            </CreateRecipeDiv>
          </Link>
          {/* <Container fluid> */}

          {this.displayDiv()}
          {/* </Container> */}
        </DisplayListDiv>
      {/* </Container> */}
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
