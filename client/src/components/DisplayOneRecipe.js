// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods

import React from 'react';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { Rating, Card } from 'semantic-ui-react';

const DisplayOneRecipe = props => {
  const ratingsFunc = recipe => {
    if (!recipe.ratings || !recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  return (
    <Link
      to={`/recipes/one/${props.recipe.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        style={{
          border: props.allergy ? `10px solid red` : null,
          width: '200px',
          height: '200px',
          margin: '10px',
          overflow: 'hidden',
          fontFamily: 'Roboto'
        }}
        color="olive"
      >
        <Card.Content>
          <Card.Header as="h3">{props.recipe.name}</Card.Header>
          <div>
            <Rating
              icon="star"
              rating={ratingsFunc(props.recipe)}
              maxRating={5}
              disabled
            />
            {props.recipe.ratings ? props.recipe.ratings.length : 0}
          </div>
        </Card.Content>
        <Card.Content>
          <Card.Meta as="h4">Description:</Card.Meta>
          <Card.Description>
            {Parser(props.recipe.description)}
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
};

DisplayOneRecipe.defaultProps = {
  fetching: false,
  recipes: [],
  error: null
};

export default DisplayOneRecipe;
