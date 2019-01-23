//Functional Component Route
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const FileDrop = props => {
  return (
    <Form.Field>
      <input
        type="file"
        name="myFile"
        onChange={props.handleInputSelectedFile}
      />
      <Button onClick={props.handleFileUpload} style={{ marginTop: '15px' }}>
        Upload Image
      </Button>
    </Form.Field>
  );
};

export default FileDrop;
