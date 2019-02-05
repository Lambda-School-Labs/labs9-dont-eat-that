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

  p {
    font-family: Roboto;
    text-align: left;
    max-width: 500px;
    line-height: 1.75;
    @media (max-width: 950px) {
      justify-content: center;
      width: 63%;
      max-width: 400px;
      margin: 0 auto;
    }

    @media (max-width: 750px) {
      width: 70%;
      min-width: 320px;
    }
  }
`;

const ImportCardContainer = styled.div`
  display: flex;
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const ImageDiv = styled.div`
  width: 70%;
  max-width: 400px;
  margin: 0 auto;
  min-width: 320px;
  height: 100%;
`;

const TextImportInputButton = styled.div`
  display: block;
  margin: 0 20px;
  input {
    width: 50%;
  }
  @media (max-width: 950px) {
    justify-content: center;
    width: 100%;
    margin: 0;
  }
  @media (max-width: 750px) {
    .inputImportURL {
      width: 50%;
    }
    .inputWarning {
      textalign: center;
    }
  }
`;
// width: 70%;

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
            <ImportCardContainer>
              <ImageDiv>
                <Image
                  src={importdish}
                  style={{
                    maxHeight: '250px',
                    margin: '0 auto',
                    width: '100%'
                  }}
                />
              </ImageDiv>
              <TextImportInputButton>
                <Responsive className='contentDiv' style={{ margin: '0 auto' }}>
                  <p>
                    Import your favorite recipes from popular food blogs and
                    sites, place the url to the recipe below!
                    <br />
                    Warning, this feature is not compatible with some sites.
                  </p>
                </Responsive>
                {/* <Form.Group> */}
                {/* <Form.Field width='12'> */}

                <input
                  type='text'
                  name='targetUrl'
                  className='inputImportURL'
                  placeholder='Enter URL of desired recipe to import'
                  value={this.state.targetUrl}
                  onChange={this.typingHandler}
                  style={{ margin: '15px 0 0 0' }}
                />
                {/* </Form.Field> */}
                {localStorage.getItem('uid') ? (
                  <React.Fragment>
                    <Responsive minWidth={768}>
                      <Button
                        type='submit'
                        width='4'
                        style={{
                          background: ourColors.buttonColor,
                          color: 'white',
                          margin: '15px 0'
                        }}
                      >
                        Import Recipe
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
                          color: 'white',
                          margin: '15px 0'
                        }}
                      >
                        Import Recipe
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
                        color: 'white',
                        margin: '15px 0'
                      }}
                    >
                      Import Recipe
                    </Button>
                    <p className='importWarning' style={{display: 'flex',justifyContent:'center'}}>
                      Please Log In to Import a Recipe!
                    </p>
                  </React.Fragment>
                )}
                {/* </Form.Group> */}
              </TextImportInputButton>
            </ImportCardContainer>
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
