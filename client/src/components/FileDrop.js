import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import ourColors from '../ColorScheme';

import {
  DropCard,
  DropInputField
  // UploadButton
} from './styleComponents/FileDropStyles';

const UploadButton = styled.div`
  height: 20px;
  marginTop: '15px',
  marginRight: '8px',
  marginLeft: '7px',
  width: '20%',
  minWidth: '100px',
  background: ${ourColors.buttonColor},
  color: 'white'
`;

const FileDropFunc = props => {
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

  const fileName = props.file ? props.file.name : 'No File Uploaded';

  return (
    <DropCard
      onDrag={props.onDrag}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
      onSubmit={props.handleFileUpload}
    >
      <DropInputField
        className='file-uploader-contents'
        onChange={props.handleInputSelectedFile}
      >
        <span className='file-uploader-file-name'>{props.imageName}</span>
        <br />
        <span>{props.imageName ? props.imageName : 'Drop File Here'}</span>
        <br />
        <span>or</span>
        <br/>
        <Button onClick={props.onSelectFileClick}>Browse for File</Button>

        {/* <UploadButton onClick={console.log("i was clicked")}>
          Upload Image
        </UploadButton> */}
      <Popup
        trigger={
          <Button
            onClick={props.handleFileUpload}
            style={{
              margin: '15px',
              height: '80px',
              width: '35%',
              minWidth: '100px',
              background: ourColors.buttonColor,
              color: 'white',
              padding: '20px'
            }}
          >
            Upload Image
          </Button>
        }
        content={
          props.selectedFile
            ? 'Image Upload completed!'
            : 'No image was uploaded.'
        }
        on='click'
      />
      </DropInputField>
    </DropCard>
  );
};

export default FileDropFunc;
