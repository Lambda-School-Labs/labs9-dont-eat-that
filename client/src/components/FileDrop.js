//Functional Component Route
import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
// import { connect } from "react-redux";
// import { handleFileUpload } from "../actions";

const FileDrop = props => {
  return (
    <Form.Field>
      <input
        type="file"
        name="myFile"
        onChange={props.handleInputSelectedFile}
      />
      <Popup
        trigger={
          <Button
            onClick={props.handleFileUpload}
            style={{ marginTop: '15px' }}
          >
            Upload Image
          </Button>
        }
        content={
          props.selectedFile
            ? 'Image Upload completed!'
            : 'No image was uploaded.'
        }
        on="click"
      />
    </Form.Field>
  );
};

export default FileDrop;
// const mapStateToProps = state => {
//   return {};
// };
// export default connect(
//   mapStateToProps,
//   { handleFileUpload }
// )(FileDrop);
