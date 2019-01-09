// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods


import React from 'react';

const DisplayOneRecipe = props => {
  return (
    <div className="oneRecipeDisplay">
      <h3> {props.title}</h3>

     {/* show image? 
        <img src = {props.imageUrl}>
    */}

      <h4> ingredients : </h4>
      <p>{props.ingredients}</p>

      <h4> Descriptions : </h4>
      <p> {props.descriptions}</p>

      <h4> Nutrition : </h4>
      <p> {props.nutrition}</p>

      <button
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
      </button>
    </div>
  );
};

export default DisplayOneRecipe;
