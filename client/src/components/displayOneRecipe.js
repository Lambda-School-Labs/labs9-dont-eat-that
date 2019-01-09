import React from "react";

const DisplayOneReceipe = props => {
    return (
      <div className="smurfDisplay">
        <h3> {props.receipe.title}</h3>
        <p> ingredient : {props.receipe.ingredient}</p>
        <p> Descriptions : {props.receipe.Descriptions}</p>

        <button
          onClick={() => {
            props.editReceipe(props.receipe.id);
          }}
        >
          Edit
        </button>


        <button
          onClick={() => {
            props.deleteReceipe(props.receipe.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default DisplayOneReceipe;