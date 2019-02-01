import React from 'react';

import ourColors from '../ColorScheme';

import {
  DropCard,
  DropInputField,
  DropTextStyle
} from './styleComponents/FileDropStyles';

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
        <label htmlFor='file' />
        <input
          type='file'
          name='file'
          id='file'
          onChange={props.handleInputSelectedFile}
          className='inputfile'
          style={{
            margin: '10px',
            width: '185px',
            background: ourColors.buttonColor,
            fontSize: '0.75rem',
            color: 'white'
          }}
        />
      </DropInputField>
    </DropCard>
  );
};

export default FileDropFunc;
