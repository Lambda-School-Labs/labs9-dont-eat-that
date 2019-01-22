//Functional Component Route
import React from "react";

const FileDrop = props => {
  return (
    <div className="file-drop-container">
      <input
        type="file"
        name="myFile"
        onChange={props.handleInputSelectedFile}
      />
      <div className="submit" id="" onClick={props.handleFileUpload}>
        SUBMIT
      </div>
    </div>
  );
};

export default FileDrop;
