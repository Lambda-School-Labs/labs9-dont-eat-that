import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Card, Image } from 'semantic-ui-react';
import ourColors from '../../ColorScheme.js';
import { ratingsFunc } from '../util';
import defaultImage from '../../images/defaultimage.jpeg';

class TopRecipeCard extends React.Component {
  render() {
    return (
      <Link
        to={`/recipes/one/${this.props.recipe.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Card
          style={{
            boxShadow: this.props.allergy
              ? `0 0 3px 5px ${ourColors.warningColor}`
              : `0 0 3px 1px ${ourColors.outlineColor}`,
            width: '200px',
            height: '200px',
            margin: '10px',
            overflow: 'hidden',
            fontFamily: 'Roboto'
          }}
        >
          <Card.Content style={{ paddingTop: '4px' }}>
            <Card.Header
              as='h3'
              style={{
                maxHeight: '45px',
                overflow: 'hidden',
                fontSize: '1.1rem'
              }}
            >
              #{this.props.ranking} : {this.props.recipe.name}
            </Card.Header>
            <div>
              <Rating
                icon='star'
                rating={ratingsFunc(this.props.recipe)}
                maxRating={5}
                disabled
              />
              {this.props.recipe.ratings ? this.props.recipe.ratings.length : 0}
            </div>
            {this.props.recipe.imageUrl ? (
              <Image
                src={this.props.recipe.imageUrl}
                style={{ height: '70px' }}
              />
            ) : (
              <Image src={defaultImage} />
            )}
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

export default TopRecipeCard;
