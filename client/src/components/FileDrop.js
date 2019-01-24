//Functional Component Route
import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
// import { connect } from "react-redux";
// import { handleFileUpload } from "../actions";

const FileDrop = props => {
  return (
    <Form.Group widths='equal' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
      {/* <Form.Field> */}
        <input
          type="file"
          name="myFile"
          onChange={props.handleInputSelectedFile}
          style={{ marginLeft: '7px', marginRight: '7px', width: '78%' }}
        />
        <Popup
          trigger={
            <Button
              onClick={props.handleFileUpload}
              style={{ marginRight: '8px', marginLeft: '7px', width: '20%', minWidth: '100px' }}
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
          // style={{ width: '25%' }}
        />
      {/* </Form.Field> */}
    </Form.Group>
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