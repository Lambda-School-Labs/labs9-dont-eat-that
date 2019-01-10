// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods

import React from "react";

const DisplayOneRecipe = props => {
  console.log(props);
  return (
    <div className="oneRecipeDisplay">
      <h3>{props.recipe.name}</h3>
      <h4>Description:</h4>
      <p>{props.recipe.description}</p>
    </div>
  );
};

DisplayOneRecipe.defaultProps = {
  fetching: false,
  recipes: [],
  error: null
};

export default DisplayOneRecipe;
