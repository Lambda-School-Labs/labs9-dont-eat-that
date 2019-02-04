import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { getAllergies, getAllRecipes2 } from '../../actions';
import { getTopRatedRecipes } from '../util';
import TopRecipeCard from './topRecipeCard.js';

const TopRatedRecipes = styled.div`
  width: 100% !important;
  padding: 0 !important;
  margin-top: 16px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// DisplayTopRecipes manages to display top 3 rated recipes
// under Side Menu

class DisplayTopRecipes extends Component {
  componentDidMount() {
    this.props.getAllRecipes2();
    this.props.getAllergies();
  }

  // below function check if recipes ingredients has any of user's saved allergy
  // if so, it returns true

  checkAllergy = recipe => {
    const outerBoolArr = recipe.ingredients.map(ingredient => {
      const innerBoolArr = this.props.allergies.map(allergy => {
        // allergy sometime has array of string and sometimes has array of 'name:allergy'
        // so check the type and compare correct value

        if (typeof allergy === 'string')
          return ingredient.name.includes(allergy);
        // seeing if any allergies in one ingredient
        else return ingredient.name.includes(allergy.name);
      });
      return innerBoolArr.includes(true);
    });

    return outerBoolArr.includes(true);
  };

  render() {
    // displayRecipe gets sorted list of recipes, highest rated recipes in the front
    // getTopRatedRecipes is function that sort recipes by highest rating
    // this.props.recipes2 contains all recipes in site's DB

    let displayRecipe = getTopRatedRecipes(this.props.recipes2);
    console.log(displayRecipe);
    let displayCard = [];
    let hasAllergy = false;

    for (let i = 0; i < Math.min(3, displayRecipe.length); i++) {
      hasAllergy = this.checkAllergy(displayRecipe[i]) ? true : false;

      displayCard[i] = (
        <TopRecipeCard
          recipe={displayRecipe[i]}
          ranking={i + 1}
          hasAllergy={hasAllergy}
        />
      );
    }

    return (
      <TopRatedRecipes className='ui raised segment'>
        <Header
          as='h4'
          style={{
            marginTop: '10px',
            display: 'inline',
            marginBottom: '0',
            maxHeight: ''
          }}
        >
          Top Rated Recipes
        </Header>
        {displayCard}
      </TopRatedRecipes>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes2: state.recipesReducer.recipes2,
    allergies: state.usersReducer.user.allergies
  };
};
export default connect(
  mapStateToProps,
  { getAllRecipes2, getAllergies }
)(DisplayTopRecipes);
