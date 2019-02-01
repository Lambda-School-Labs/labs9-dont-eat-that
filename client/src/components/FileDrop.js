import React from 'react';
import { Button, Popup } from 'semantic-ui-react';
// import styled from 'styled-components';
import ourColors from '../ColorScheme';

import {
  DropCard,
  DropInputField,
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
  // eslint-disable-next-line
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

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
        onChange={props.dropListener}
      >
        <DropTextStyle>
          {props.imageName ? props.imageName : 'Drop File Here'}
        </DropTextStyle>
        <span>or</span>
        <br />

        {/* <Button
          style={{
            margin: '15px',
            height: '80px',
            width: '35%',
            minWidth: '100px',
            background: ourColors.buttonColor,
            color: 'white',
            padding: '20px'
          }}
        > */}
        <label htmlFor='file'/>
          <input
            type='file'
            name='file'
            id='file'
            onChange={props.handleInputSelectedFile}
            className='inputfile'
            style={{
              margin: '10px',
              width: '25%',
              minWidth: '100px',
              height: '60px',
              background: ourColors.buttonColor,
              color: 'white'
            }}
          />

        {/* </Button> */}

        {/* <UploadButton onClick={console.log("i was clicked")}>
          Upload Image
        </UploadButton> */}
        {/* <Popup
          trigger={
            <Button
              onClick={props.handleFileUpload}
              style={{
                margin: '10px',
                width: '25%',
                height: '60px',
                minWidth: '100px',
                background: ourColors.buttonColor,
                color: 'white'
              }}
            >
              Upload Image
            </Button> */}
        {/* } */}
        {/* content={
            props.selectedFile
              ? 'Wait for the alert before submitting recipe!'
              : 'No image was uploaded.'
          }
          on='click'
        /> */}
      </DropInputField>
    </DropCard>
  );
};

export default FileDropFunc;
