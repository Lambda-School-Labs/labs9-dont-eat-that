import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Card, Icon, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { getAllRecipes2 } from '../../actions';
import { getTopRatedRecipes } from '../util';
import TopRecipeCard from './topRecipeCard.js';
import ourColors from '../../ColorScheme';

const TopRatedRecipes = styled.div`
  width: 100% !important;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
        <TopRatedRecipes className='ui raised segment'>
          <Header
            as='h4'
            style={{ marginTop: '10px', display: 'inline', marginBottom: '0' }}
          >
            Top Rated Recipes
          </Header>
          <TopRecipeCard recipe={displayRecipe[0]} ranking='1' />
          <TopRecipeCard recipe={displayRecipe[1]} ranking='2' />
        </TopRatedRecipes>
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
