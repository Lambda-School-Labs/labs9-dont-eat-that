import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';

import ourColors from '../ColorScheme';

const FileDropFunc = props => {
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

  const fileName = props.file ? props.file.name : 'No File Uploaded';

  return (
    {/*<Form.Group
      widths='equal'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '14px'
      }}
    >*/}
    <Form.Field
      className={props.uploaderClasses}
      onDrag={props.onDrag}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
      onSubmit={props.handleFileUpload}
    >
      <div
        className='file-uploader-contents'
        onChange={props.handleInputSelectedFile}
      >
        <span className='file-uploader-file-name'>{fileName}</span>
        <br />
        <span>Drag & Drop File</span>
        <br />
        <span>or</span>
        <br />
        {/* <input
         type="file"
         name="myFile"
         onChange={props.handleInputSelectedFile}
       /> */}
        <input
          type='file'
          name='myfile'
          onChange={props.handleInputSelectedFile}
          placeholder={"Select File"}
          style={{ marginLeft: '7px', marginRight: '7px', width: '78%' }}
        />
          
      </div>
      {props.children}

      {/* <input this is the reason why the input field was there
      ref={el => (props.fileUploaderInput = el)}
      type='file'
      className='file-uploader-input'
      onChange={props.onFileChange}
    /> */}
      <Popup
        trigger={
          <Button
            onClick={props.handleFileUpload}
            style={{ marginTop: '15px' }}
            marginRight: '8px',
            marginLeft: '7px',
            width: '20%',
            minWidth: '100px',
            background: ourColors.buttonColor,
            color: 'white'
          >
            Upload Image
          </Button>
        }
        content={
          props.selectedFile
            ? 'Wait until alert pops up.'
            : 'No image was uploaded.'
        }
        on='click'
      />
    </Form.Field>
  );
};

export default FileDropFunc;
