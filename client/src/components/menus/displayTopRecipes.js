import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { getAllRecipes2 } from '../../actions';
import { getTopRatedRecipes } from '../util';
import TopRecipeCard from './topRecipeCard.js';

const TopRatedRecipes = styled.div`
  width: 100% !important;
  padding: 0 !important;
  margin-top: 40px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// DisplayTopRecipes manages to display top 3 rated recipes
// under Side Menu

class DisplayTopRecipes extends Component {
  componentDidMount() {
    this.props.getAllRecipes2();
  }

  render() {
    // console.log('REnder this.props.recipes2 = ', this.props.recipes2);

    // displayRecipe gets sorted list of recipes, highest rated recipes in the front
    // getTopRatedRecipes is function that sort recipes by highest rating
    // this.props.recipes2 contains all recipes in site's DB

    let displayRecipe = getTopRatedRecipes(this.props.recipes2);

    let displayCard = [];

    // displayCard should contains all TopRecipeCard components but
    // it caused error.  so I assing one component each.
    // would be nice to put all components into one variable

    for (let i = 0; i < Math.min(3, displayRecipe.length); i++)
      displayCard[i] = (
        <TopRecipeCard recipe={displayRecipe[i]} ranking={i + 1} />
      );

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
    recipes2: state.recipesReducer.recipes2
  };
};
export default connect(
  mapStateToProps,
  { getAllRecipes2 }
)(DisplayTopRecipes);
