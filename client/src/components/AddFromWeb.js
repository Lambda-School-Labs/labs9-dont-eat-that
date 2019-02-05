import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions';
import {
  Form,
  Button,
  Segment,
  Responsive,
  Image,
  Message
} from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';

import ourColors from '../ColorScheme';
import importdish from '../images/importdish.jpeg';

const ImportRecipeDiv = styled.div`
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
  .contentDiv {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  p {
    font-family: Roboto;
    text-align: left;
    max-width: 500px;
    padding: 10px 27px 10px;
    line-height: 1.75;
  }
`;

const ImageTextDiv = styled.div`
  
  @media (max-width: 1100px) {
    justify-content: center;
  }
`;

const ImportInputButton = styled.div`
  display: flex;
`;

class AddFromWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl:
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
      xRapidApiKey: process.env.REACT_APP_SPOONACULAR_KEY,
      targetUrl: '',
      error: ''
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
          imageUrl: res.data.image,
          firebaseid: localStorage.getItem('uid')
        };
        // Call the action to send this object to POST a recipe
        this.props.addRecipe(recipeObj);
        // Reset the state
        this.setState({ targetUrl: '', error: '' });
        // Redirect the user to the recipes list page
        this.props.history.push('/recipes');
      })
      .catch(err => {
        this.setState({
          error:
            'Unable to import from the url. Please try another recipe or another site.'
        });
        console.log({ error: err });
      });
  };

  render() {
    return (
      <ImportRecipeDiv>
        <Segment style={{ background: ourColors.formColor }}>
          <Form
            onSubmit={this.submitHandler}
            style={{ width: '95%', marginLeft: '2.5%' }}
          >
            <ImageTextDiv>
              <Image
                src={importdish}
                style={{ maxHeight: '250px', margin: '0 auto' }}
              />
              <Responsive className='contentDiv' minWidth={500}>
                <p>
                  Found a recipe you really like on another site, like a recipes
                  blog? Go ahead and import the url to your collection below!
                  <br />
                  Warning, this feature isn't compatible with some sites.
                </p>
              </Responsive>
            </ImageTextDiv>

            <Form.Group>
              <Form.Field width='12'>
                <input
                  type='text'
                  name='targetUrl'
                  placeholder='Enter URL of desired recipe to import'
                  value={this.state.targetUrl}
                  onChange={this.typingHandler}
                />
              </Form.Field>
              {localStorage.getItem('uid') ? (
                <React.Fragment>
                  <Responsive minWidth={768}>
                    <Button
                      type='submit'
                      width='4'
                      style={{
                        background: ourColors.buttonColor,
                        color: 'white'
                      }}
                    >
                      Import Recipe Url
                    </Button>
                  </Responsive>
                  <Responsive
                    maxWidth={767}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      marginTop: '5px'
                    }}
                  >
                    <Button
                      type='submit'
                      width='4'
                      style={{
                        background: ourColors.buttonColor,
                        color: 'white'
                      }}
                    >
                      Import Recipe Url
                    </Button>
                  </Responsive>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    type='submit'
                    disabled
                    width='4'
                    style={{
                      background: ourColors.inactiveButtonColor,
                      color: 'white'
                    }}
                  >
                    Import Recipe
                  </Button>
                  <p>Please Log In to Import a Recipe!</p>
                </React.Fragment>
              )}
            </Form.Group>
          </Form>
        </Segment>
        {this.state.error && (
          <Message negative>
            <Message.Header>Import Recipe Failure</Message.Header>
            <p>{this.state.error}</p>
          </Message>
        )}
      </ImportRecipeDiv>
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
