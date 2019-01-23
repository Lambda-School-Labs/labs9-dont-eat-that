import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

class AddFromWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl:
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
      xRapidApiKey: process.env.REACT_APP_SPOONACULAR_KEY,
      targetUrl: ''
    };
  }

  typingHandler = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  submitHandler = ev => {
    ev.preventDefault();
    // Convert the user's inputted URL to encoded format
    let encoded = encodeURIComponent(this.state.targetUrl);
    axios
      .get(`${this.state.baseUrl}?url=${encoded}`, {
        headers: {
          'X-RapidAPI-Key': this.state.xRapidApiKey
        }
      })
      .then(res => {
        console.log(res);
        // Build the array of ingredients for the new recipe
        let ingArr = [];
        res.data.extendedIngredients.map(ingredient => {
          ingArr.push({
            name: ingredient.name,
            quantity: ingredient.amount,
            unit: ingredient.unit
          });
          return null;
        });
        // Build the object representing the new recipe to send to the db
        let recipeObj = {
          name: res.data.title,
          description: res.data.instructions,
          ingredients: ingArr,
          firebaseid: localStorage.getItem('uid')
        };
        // Call the action to send this object to POST a recipe
        this.props.addRecipe(recipeObj);
        // Reset the state
        this.setState({ targetUrl: '' });
        // Redirect the user to the recipes list page
        this.props.history.push('/recipes');
      })
      .catch(err => {
        console.log({ error: err });
      });
  };

  render() {
    return (
      <Form
        onSubmit={this.submitHandler}
        style={{ width: '95%', marginLeft: '2.5%' }}
      >
        <Form.Field>
          <input
            type="text"
            name="targetUrl"
            placeholder="Enter URL of desired recipe to import"
            value={this.state.targetUrl}
            onChange={this.typingHandler}
          />
        </Form.Field>
        {localStorage.getItem('uid') ? (
          <Button type="submit">Import Recipe</Button>
        ) : (
          <React.Fragment>
            <Button type="submit" disabled>
              Import Recipe
            </Button>
            <p>Please Log In to Import a Recipe!</p>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { addRecipe }
)(AddFromWeb);
