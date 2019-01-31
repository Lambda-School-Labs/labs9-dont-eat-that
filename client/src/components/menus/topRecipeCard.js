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
              : null,
            //   `0 0 3px 1px ${ourColors.outlineColor}`,
            width: '200px',
            height: '120px',
            margin: '10px',
            overflow: 'hidden',
            fontFamily: 'Roboto'
          }}
        >
          <Card.Content style={{ paddingTop: '4px' }}>
            <Card.Header
              as='h6'
              style={{
                marginTop: '5px',
                maxHeight: '45px',
                overflow: 'hidden',
                fontSize: '1rem'
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
                style={{
                  fontSize: '0.7rem',
                  marginLeft: '25px'
                }}
              />
              {this.props.recipe.ratings ? this.props.recipe.ratings.length : 0}
            </div>
            {this.props.recipe.imageUrl ? (
              <Image
                src={this.props.recipe.imageUrl}
                style={{
                  height: '40px',
                  marginLeft: '25px',
                  marginTop: '10px'
                }}
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
