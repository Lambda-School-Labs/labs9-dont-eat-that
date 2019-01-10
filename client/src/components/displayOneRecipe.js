// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods

import React from 'react';

const DisplayOneRecipe = props => {
  return (
    <div key={props.key} className="oneRecipeDisplay">
      <h3 >{props.recipe}</h3>
      <h4> ingredients : </h4>
      <p>{props.description}</p>

    </div>
  );
};

DisplayOneRecipe.defaultProps = {
  fetching:false,
  recipes: [],
  error: null
}

export default DisplayOneRecipe;

{
  /* <button
        onClick={() => {
          props.editReceipe(props.id);
        }}
      >
        Edit
      </button>

      <button
        onClick={() => {
          props.deleteRecipe(props.id);
        }}
      >
        Delete
      </button> */
}
