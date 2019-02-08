import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import {
  Rating,
  Table,
  Header,
  Segment,
  Image,
  Icon,
  Responsive,
  Popup
} from 'semantic-ui-react';
import styled from 'styled-components';

import ourColors from '../ColorScheme';
import {
  getRecipe,
  deleteRecipe,
  getNutrition,
  removeNutrition,
  getUser,
  addRecipe,
  ratingChange
} from '../actions';
import { downloadRecipeToCSV } from '../components/util';

const SingleRecipeDiv = styled.div`
  max-width: 1000;
  margin: 0 auto;
`;

const ImageIngrDiv = styled.div`
  display: block;
  justify-content: space-between;
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
`;

const fractFormat = value => {
  if (value % 1 === 0) {
    return `${value}`;
  }

  let bestNumer = 1;
  let bestDenom = 1;
  let bestErr = Math.abs(value - bestNumer / bestDenom);
  for (var denom = 1; bestErr > 0 && denom <= 100; denom++) {
    const numer = Math.round(value * denom);
    const err = Math.abs(value - numer / denom);
    if (err < bestErr) {
      bestNumer = numer;
      bestDenom = denom;
      bestErr = err;
    }
  }
  if (bestDenom === 100 && bestNumer === 33) {
    return '1/3';
  }
  if (bestDenom === 100) {
    return `${Math.round(value * 100) / 100}`;
  }
  if (bestNumer > bestDenom) {
    const whole = Math.floor(value);
    const fracPart = fractFormat(value - whole);
    return `${whole} ${fracPart}`;
  }
  return `${bestNumer}/${bestDenom}`;
};

const nutritionLabelLister = arr => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].toLowerCase().split('_').join(' ');
  }
  return arr.join(', ');
}

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyTip: <span>Copy</span>
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
    this.props.getUser();
  }

  // componentDidUpdate is needed to make Singe Recipe page work correctly
  // Singe Recipe needs to invoke this.props.getRecipe(id) to get correct recipe info
  // however, if id changes while in Single Recipe, getRecipe() doesn't get invoked
  // so componentDidUpdate check if id is changed and invoke getRecipe()

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getRecipe(this.props.match.params.id);
      this.getNutrition();
    }
  }

  getNutrition = () => {
    const { name, ingredients } = this.props.recipe;
    const ingrArr = ingredients.map(
      ingr =>
        `${ingr.quantity ? ingr.quantity : ''} ${ingr.unit ? ingr.unit : ''} ${
          ingr.name
        }`
    );
    this.props.getNutrition(name, ingrArr); // gets nutritional value of recipe from Edamam
  };

  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };

  copyRecipe = async recipe => {
    await this.props.addRecipe({
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      firebaseid: localStorage.getItem('uid'),
      ingredients: recipe.ingredients
    });
  };

  ratingsFunc = recipe => {
    // gets all ratings for recipe
    if (!recipe.ratings || !recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  rateFunc = (e, data, recipeid) => {
    // processes rating from user for recipe
    this.props.ratingChange(recipeid, data.rating);
  };

  ingredients = recipe => {
    return (
      <React.Fragment>
        <Header as='h3' attached='top' textAlign='left'>
          Ingredients
        </Header>
        <Segment
          attached
          textAlign='left'
          style={{
            minHeight: recipe.imageUrl ? '198px' : 'auto',
            lineHeight: '1.25'
          }}
        >
          <ul>
            {recipe.ingredients.map(ingr => {
              const boolArr = this.props.user.allergies.map(
                allergy => ingr.name.indexOf(allergy.name) >= 0
              );
              if (boolArr.indexOf(true) >= 0) {
                return (
                  <li
                    key={ingr.name}
                    style={{
                      background: ourColors.buttonColor,
                      boxShadow: `0 0 3px ${ourColors.buttonColor}`,
                      paddingLeft: '2px'
                    }}
                  >{`${fractFormat(ingr.quantity)} ${
                    ingr.unit ? ingr.unit : ''
                  } ${ingr.name}`}</li>
                );
              } else {
                return (
                  <li key={ingr.name} style={{ paddingLeft: '2px' }}>
                    {`${fractFormat(ingr.quantity)} ${
                      ingr.unit ? ingr.unit : ''
                    } ${ingr.name}`}
                  </li>
                );
              }
            })}
          </ul>
        </Segment>
      </React.Fragment>
    );
  };

  componentWillUnmount() {
    this.props.removeNutrition(); // removes nutrition from state
  }

  displayRecipe = recipe => {
    return (
      <div className='singleRecipeView'>
        <ImageIngrDiv>
          <div className='singleRecipeTitle'>
            <div className='userRecipeButtons'>
              {recipe.user_id !== this.props.user.id &&
                localStorage.getItem('uid') && (
                  <Popup
                    trigger={
                      <Icon
                        name='copy'
                        onClick={async () => {
                          await this.copyRecipe(recipe);
                          this.props.history.push('/recipes');
                        }}
                        size='large'
                        style={{ cursor: 'pointer' }}
                      />
                    }
                    content='Copy'
                    style={{ background: ourColors.messageColor }}
                  />
                )}
              {/* below button initiate download currently displaying recipe into excel fileURLToPath */}
              {this.props.user.subscriptionid && (
                <Popup
                  trigger={
                    <Icon
                      name='download'
                      size='large'
                      onClick={() => downloadRecipeToCSV(recipe)}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                  content='Download'
                  style={{ background: ourColors.messageColor }}
                />
              )}
              {recipe.user_id === this.props.user.id && (
                <Link to={`/recipes/edit/${this.props.match.params.id}`}>
                  <Popup
                    trigger={
                      <Link to={`/recipes/edit/${this.props.match.params.id}`}>
                        <Icon
                          name='edit'
                          size='large'
                          color='black'
                          style={{ cursor: 'pointer' }}
                        />
                      </Link>
                    }
                    content='Edit'
                    style={{ background: ourColors.messageColor }}
                  />
                </Link>
              )}
              {recipe.user_id === this.props.user.id && (
                <Popup
                  trigger={
                    <Icon
                      name='delete'
                      size='large'
                      onClick={this.deleteRecipe}
                      style={{
                        cursor: 'pointer',
                        color: ourColors.buttonColor
                      }}
                    />
                  }
                  content='Delete'
                  style={{ background: ourColors.messageColor }}
                />
              )}
            </div>

            <Header
              as='h1'
              style={{ maxWidth: '1000px', margin: '0 auto 5px' }}
            >
              {recipe.name}
            </Header>

            <Rating
              icon='star'
              size='huge'
              rating={this.ratingsFunc(recipe)}
              onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
              maxRating={5}
              disabled={!localStorage.getItem('uid')}
              style={{ width: '175px', margin: '0 auto' }}
            />
            <Header as='h6' style={{ marginTop: '0px' }}>
              {this.props.recipe.ratings ? this.props.recipe.ratings.length : 0}{' '}
              review(s)
            </Header>
          </div>

          <div className='imageIngredients'>
            {recipe.imageUrl && (
              <Image
                src={recipe.imageUrl}
                size='medium'
                rounded
                style={{ marginTop: '7.5px', maxHeight: '250px' }}
              />
            )}
            <Responsive
              minWidth={501}
              style={{
                fontFamily: 'Roboto',
                marginTop: '10px',
                marginLeft: recipe.imageUrl ? '10px' : 0,
                flexGrow: 1,
                alignSelf: 'stretch'
              }}
            >
              {this.ingredients(recipe)}
            </Responsive>
            <Responsive
              maxWidth={500}
              style={{
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                fontFamily: 'Roboto',
                marginTop: '15px'
              }}
            >
              {this.ingredients(recipe)}
            </Responsive>
          </div>
        </ImageIngrDiv>
        <br />
        <div
          style={{
            width: '95%',
            maxWidth: '1000px',
            margin: '0 auto 15px',
            fontFamily: 'Roboto'
          }}
        >
          <Header as='h3' attached='top' textAlign='left'>
            Recipe
          </Header>
          <Segment attached textAlign='left'>
            {Parser(recipe.description)}
          </Segment>
        </div>
      </div>
    );
  };

  render() {
    const { recipe, nutrition } = this.props;
    if (recipe && !nutrition) {
      this.getNutrition();
      return <SingleRecipeDiv>{this.displayRecipe(recipe)}</SingleRecipeDiv>;
    } else if (recipe && nutrition) {
      // copy of the above code except showing nutrition info when they're a subscriber
      return (
        <SingleRecipeDiv>
          {this.displayRecipe(recipe)}
          <Table
            celled
            style={{
              width: '95%',
              maxWidth: '1000px',
              margin: '0 auto',
              fontFamily: 'Roboto',
              background: 'white'
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  colSpan='2'
                  style={{ background: ourColors.formColor }}
                >
                  <Header as='h3'>Nutrition Facts</Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row className='tableRow'>
                <Table.Cell>Servings:</Table.Cell>
                <Table.Cell>{nutrition.yield}</Table.Cell>
              </Table.Row>
              <Table.Row className='tableRow'>
                <Table.Cell>Calories:</Table.Cell>
                <Table.Cell>{nutrition.calories}</Table.Cell>
              </Table.Row>
              <Table.Row className='tableRow'>
                <Table.Cell>Diet Labels:</Table.Cell>
                <Table.Cell>
                  {nutritionLabelLister(nutrition.dietLabels)}
                </Table.Cell>
              </Table.Row>
              <Table.Row className='tableRow'>
                <Table.Cell collapsing>Health Labels:</Table.Cell>
                <Table.Cell>
                  {nutritionLabelLister(nutrition.healthLabels)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          {/* Create a new table here */}

          <Table
            celled
            style={{
              width: '95%',
              maxWidth: '1000px',
              margin: '15px auto',
              fontFamily: 'Roboto',
              background: 'white',
              fontWeight: 'normal'
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  colSpan='3'
                  style={{ background: ourColors.formColor }}
                >
                  <Header as='h3'>Macronutrients</Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row className='tableRow'>
                <Table.Cell collapsing>Carbohydrates:</Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.CHOCDF
                    ? `${Math.round(
                        nutrition.totalNutrients.CHOCDF.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.CHOCDF.unit}`
                    : '0 g'}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.CHOCDF
                    ? Math.round(nutrition.totalDaily.CHOCDF.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row className='tableRow'>
                <Table.Cell>Protein:</Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.PROCNT
                    ? `${Math.round(
                        nutrition.totalNutrients.PROCNT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.PROCNT.unit}`
                    : '0 g'}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.PROCNT
                    ? Math.round(nutrition.totalDaily.PROCNT.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row className='tableRow'>
                <Table.Cell>Fat:</Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.FAT
                    ? `${Math.round(
                        nutrition.totalNutrients.FAT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.FAT.unit}`
                    : '0 g'}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {nutrition.totalNutrients.FAT
                    ? Math.round(nutrition.totalDaily.FAT.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </SingleRecipeDiv>
      );
    } else {
      return (
        <Segment loading style={{ width: '95%', marginLeft: '2.5%' }}>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipesReducer.recipe,
    nutrition: state.nutritionReducer.nutrition,
    user: state.usersReducer.user,
    rating: state.recipesReducer.rating
  };
};

export default connect(
  mapStateToProps,
  {
    getRecipe,
    deleteRecipe,
    getNutrition,
    removeNutrition,
    getUser,
    addRecipe,
    ratingChange
  }
)(SingleRecipe);
