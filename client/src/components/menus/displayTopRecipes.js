import React, { Component } from 'react';
import ourColors from '../../ColorScheme';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes2 } from '../../actions';
import { getTopRatedRecipes } from '../util';
import TopRecipeCard from './topRecipeCard.js';

class DisplayTopRecipes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllRecipes2();
  }

  render() {
    console.log('REnder this.props.recipes2 = ', this.props.recipes2);
    let displayRecipe = getTopRatedRecipes(this.props.recipes2);

    let temp =
      this.props.recipes2.length > 0 ? (
        <div>
          <h3> Top Rated Recipes</h3>
          <TopRecipeCard recipe={displayRecipe[0]} />
        </div>
      ) : null;
    return <div> {temp} </div>;
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
