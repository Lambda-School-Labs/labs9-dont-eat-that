import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Card, Icon, Header } from 'semantic-ui-react';

import ourColors from '../ColorScheme';

import {
  getAllRecipes,
  getOwnRecipes,
  getForeignRecipes,
  getUser,
  getAllergies
} from '../actions';

import DisplayOneRecipe from './DisplayOneRecipe';
import SimpleSearch from './util/simpleSearch.js';
import { searchFunc } from './util';
import DisplayTab from './displayTab.js';

import { downloadRecipeToCSV } from '../components/util';

const RecipeListPage = styled.div`
  form {
    margin-top: 4px;
  }
  .header-icons {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .topBarOptions {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start;
    padding: 0 15px;
  }
`;
const TabDiv = styled.div`
  display: flex;

  /* flex-wrap: wrap; */
  /* justify-content: space-between; */

  .menu {
    margin-left: 4%;
    width: 50%;
    border: 1px solid blue;
  }

  .search {
    margin-left: 10%;
    width: 50%;
    margin-right: 15px;
  }
`;

const DisplayListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
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
    this.props.getUser();
    this.props.getAllergies();
  }

  // maybe filter the array?
  displayDiv = () => {
    return this.state.displayedRecipes.map(recipe => {
      // returns on of the JSX elements in if/else below

      const outerBoolArr = recipe.ingredients.map(ingredient => {
        const innerBoolArr = this.props.allergies.map(allergy => {
          // allergy sometime has array of string and sometimes has array of 'name:allergy'
          // so check the type and compare correct value
          if (typeof allergy === 'string')
            return ingredient.name.includes(allergy);
          // seeing if any allergies in one ingredient
          else return ingredient.name.includes(allergy.name);
        });
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

  checkHandler = async personal => {
    console.log('checkHandler personal = ', personal);
    await this.setState({
      personalCheck: personal
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
    // in below if's 2nd condition (!this.state.query) checks if search is performed and if so, skip REcipesCheck to save
    // searched results in this.state.displayedREcipes

    if (
      this.state.displayedRecipes.length !== this.props.recipes.length &&
      !this.state.query
    ) {
      this.displayRecipesCheck();
    }

    return (
      <RecipeListPage>
          <Header as='h1' style={{ marginTop: '0', display: 'inline' }}>
            Recipes
          </Header>
        <div className='header-icons'>
          <div className='dummy-for-flexbox' />
          {this.props.user.subscriptionid && (
            <Icon
              name='download'
              size='large'
              onClick={() => downloadRecipeToCSV(this.state.displayedRecipes)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
        <TabDiv>
          <DisplayTab className='tab' personalCheck={this.checkHandler} />
          <Form className='search'>
            <SimpleSearch
              query={this.state.query}
              handleInputChange={this.handleInputChange}
            />
          </Form>
        </TabDiv>

        <DisplayListDiv>
          <Link to='/recipes/new' style={{ textDecoration: 'none' }}>
            <Card
              style={{
                width: '200px',
                height: '200px',
                margin: '10px',
                boxShadow: `0 0 3px 1px ${ourColors.outlineColor}`
              }}
            >
              <Card.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Card.Header>Create a Recipe</Card.Header>
                <Card.Description>
                  <Icon name='plus circle' size='big' />
                </Card.Description>
              </Card.Content>
            </Card>
          </Link>

          {this.displayDiv()}
        </DisplayListDiv>
      </RecipeListPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipesReducer.recipes,
    error: state.recipesReducer.error,
    allergies: state.usersReducer.user.allergies,
    user: state.usersReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getAllRecipes, getOwnRecipes, getForeignRecipes, getAllergies, getUser }
)(DisplayListRecipes);
