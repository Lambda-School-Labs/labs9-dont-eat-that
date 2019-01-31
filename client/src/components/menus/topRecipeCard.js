import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Card, Image } from 'semantic-ui-react';
import ourColors from '../../ColorScheme.js';
import { ratingsFunc } from '../util';
import defaultImage from '../../images/defaultimage.jpeg';

// TopRecipeCard display one card that contains
// one recipe's info

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
            height: '90px',
            margin: '10px',
            overflow: 'hidden',
            fontFamily: 'Roboto'
          }}
        >
          <Card.Content
            className='topRatedCard'
            style={{ paddingTop: '4px', display: 'flex' }}
          >
            <Card.Header
              as='h6'
              style={{
                padding: '7.5px 0',
                marginTop: '5px',
                alignSelf: 'center',
                overflow: 'hidden',
                fontSize: '1rem',
                width: '55%',
                maxHeight: '80px'
              }}
            >
              #{this.props.ranking} : {this.props.recipe.name}
            </Card.Header>
            <div
              className='CardRightSide '
              style={{
                width: '45%',
                display: 'flex',

                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {this.props.recipe.imageUrl ? (
                <Image
                  src={this.props.recipe.imageUrl}
                  style={{
                    height: '50px',
                    width: '71px',
                    margin: '7.5px 0 5px'
                  }}
                />
              ) : (
                <Image
                  src={defaultImage}
                  style={{
                    height: '50px',
                    width: '71px',
                    margin: '7.5px 0 5px'
                  }}
                />
              )}
              <Rating
                icon='star'
                rating={ratingsFunc(this.props.recipe)}
                maxRating={5}
                disabled
                style={{
                  fontSize: '0.5rem',

                  marginRight: '3px'
                }}
              />
              {this.props.recipe.ratings ? this.props.recipe.ratings.length : 0}
            </div>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

export default TopRecipeCard;
