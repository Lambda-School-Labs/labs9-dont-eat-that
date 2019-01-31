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
  getAllergies,
  getAllRecipes2
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
    width: 90%;
    margin: 0 auto;
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

// TabDiv manage Tab and search box
const TabDiv = styled.div`
  width: 97%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
    position: relative !important;
  }

  .search {
    margin: 0 20px;
    width: 35%;
    @media (max-width: 576px) {
      margin-bottom: 10px;
      order: -1;
      width: 95% !important;
      text-align: right !important;
    }
  }

  /* icon is for search icon  */
  .icon {
    @media (max-width: 576px) {
      width: 40px !important;
    }
  }
  /* searchInput is for input field */
  .searchInput {
    display: flex;
    justify-content: space-between;
    @media (max-width: 576px) {
      width: 95% !important;
    }
  }

  /* tab2 is for tab div */
  .tab2 {
    margin-left: 4% !important;
    width: 50%;
    height: 25px;

    @media (max-width: 576px) {
      display: flex;
      width: 95% !important;
      margin: 0 auto;
    }
  }
`;

const DisplayRecipesDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DisplayListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
`;

class DisplayListRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isSearched: false,
      isLogged: localStorage.getItem('uid') ? true : false,
      displayedRecipes: []
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('uid')) {
      this.props.getAllRecipes();
    } else if (this.state.isLogged) {
      this.props.getOwnRecipes();
    } else {
      this.props.getForeignRecipes();
    }
    this.props.getAllRecipes2();
    this.props.getUser();
    this.props.getAllergies();
  }

  // if Props.recipes change (ie. user click different tab)
  // display correct searched recipes
  // without this, if search query exist, tab does not work

  componentDidUpdate(prevProps) {
    if (
      this.props.recipes.length !== prevProps.recipes.length &&
      this.state.query
    ) {
      this.setState({
        displayedRecipes: searchFunc(this.state.query, this.props.recipes)
      });
    }
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

  checkHandler = async checked => {
    console.log('checkHandler checked = ', checked);
    await this.setState({
      personalCheck: checked
    });
    if (checked) {
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
          {!this.props.user.subscriptionid && (
            <div className='dummy-for-flexbox' />
          )}
          {this.props.user.subscriptionid && (
            <Icon
              name='download'
              size='large'
              onClick={() => downloadRecipeToCSV(this.state.displayedRecipes)}
              style={{ cursor: 'pointer' }}
            />
          )}
        <TabDiv>
          <DisplayTab
            className='tab'
            personalCheck={this.checkHandler}
            isLogged={this.state.isLogged}
          />
          <Form className='search'>
            <SimpleSearch
              query={this.state.query}
              handleInputChange={this.handleInputChange}
            />
          </Form>
        </TabDiv>
        <DisplayRecipesDiv>
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
                    <Icon
                      name='plus circle'
                      size='big'
                      style={{ color: ourColors.outlineColor }}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>

            {this.displayDiv()}
          </DisplayListDiv>
        </DisplayRecipesDiv>
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
  {
    getAllRecipes,
    getOwnRecipes,
    getForeignRecipes,
    getAllergies,
    getUser,
    getAllRecipes2
  }
)(DisplayListRecipes);
