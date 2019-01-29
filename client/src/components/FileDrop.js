import React from 'react';
import { Button, Popup, Form } from 'semantic-ui-react';
// import styled from 'styled-components';
import ourColors from '../ColorScheme';

import {
  DropCard,
  DropInputField,
  DropStyleText,
  DropTextStyle
} from './styleComponents/FileDropStyles';

// const UploadButton = styled.div`
//   height: 20px;
//   marginTop: '15px',
//   marginRight: '8px',
//   marginLeft: '7px',
//   width: '20%',
//   minWidth: '100px',
//   background: ${ourColors.buttonColor},
//   color: 'white'
// `;

const FileDropFunc = props => {
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

  return (
    <Form.Field>
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
          <DropTextStyle>
            {props.imageName ? props.imageName : 'Drop File Here'}
          </DropTextStyle>
          <span>or</span>
          <br />
          <Button
            style={{
              background: ourColors.buttonColor,
              minWidth: '100px',
              margin: '10px',
              width: '35%',
              color: 'white'
            }}
            onClick={props.onSelectFileClick}
          >
            Browse for File
          </Button>
          <input type='file' id='file' style={{ display: 'none' }} />
          <Popup
            trigger={
              <Button
                onClick={props.handleFileUpload}
                style={{
                  margin: '10px',
                  width: '35%',
                  minWidth: '100px',
                  background: ourColors.buttonColor,
                  color: 'white'
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
    </Form.Field>
  );
};

export default FileDropFunc;
