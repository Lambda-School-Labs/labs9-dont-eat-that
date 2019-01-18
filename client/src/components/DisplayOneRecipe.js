// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods

import React from 'react';
import Parser from 'html-react-parser';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DisplayRecipeDiv = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 200px;
  padding: 15px 10px 10px;
  margin: 10px;
  overflow: hidden;

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
  }

  h4 {
    margin-top: 10px;
    font-weight: bold;
  }
`;

const DisplayOneRecipe = props => {
  
  return (
    <Link
      to={`/recipes/one/${props.recipe.id}`}
      style={{ textDecoration: 'none' }}
    >
      <DisplayRecipeDiv
        style={{ border: props.allergy ? `10px solid red` : null }}
      >
        <h3>{props.recipe.name}</h3>
        <h4>Description:</h4>
        <p>{Parser(props.recipe.description)}</p>
      </DisplayRecipeDiv>
    </Link>
  );
};

DisplayOneRecipe.defaultProps = {
  fetching: false,
  recipes: [],
  error: null
};

export default DisplayOneRecipe;
