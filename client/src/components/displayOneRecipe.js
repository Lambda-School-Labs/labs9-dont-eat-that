import React from 'react';

const DisplayOneRecipe = props => {
  return (
    <div className="oneRecipeDisplay">
      <h3> {props.title}</h3>
      <h4> ingredients : </h4>
      <p>{props.ingredients}</p>
      <h4> Descriptions : </h4>
      <p> {props.descriptions}</p>

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
