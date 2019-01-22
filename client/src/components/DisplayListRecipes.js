import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Segment, Card, Icon, Header } from 'semantic-ui-react';
import {
  getAllRecipes,
  getOwnRecipes,
  getForeignRecipes,
  getAllergies
} from '../actions';

import DisplayOneRecipe from './DisplayOneRecipe';
import SimpleSearch from './util/simpleSearch.js';
import { searchFunc } from './util';

const RecipeListPage = styled.div`
  form {
    margin-top: 4px;
  }
  h1 {
    font-size: 2rem;
    margin-top: 15px;
    margin-bottom: 5px;
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
        <Segment
          inverted
          color="grey"
          style={{ width: '95%', marginLeft: '2.5%', fontFamily: 'Roboto' }}
        >
          <Form inverted>
            <Form.Group inline className="flexWrapCenter">
              <SimpleSearch
                query={this.state.query}
                handleInputChange={this.handleInputChange}
              />
              {localStorage.getItem('uid') && (
                <Form.Field inline>
                  <input
                    type="checkbox"
                    id="personalCheck"
                    name="personalCheck"
                    onChange={this.checkHandler}
                    checked={this.state.personalCheck}
                  />
                  <label htmlFor="personalCheck">See your own recipes</label>
                </Form.Field>
              )}
            </Form.Group>
          </Form>
        </Segment>
        <Header as="h1">Recipes</Header>
        <DisplayListDiv>
          <Link to="/recipes/new" style={{ textDecoration: 'none' }}>
            <Card style={{ width: '200px', height: '200px', margin: '10px' }}>
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
                  <Icon name="plus circle" size="big" />
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
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { getAllRecipes, getOwnRecipes, getForeignRecipes, getAllergies }
)(DisplayListRecipes);
