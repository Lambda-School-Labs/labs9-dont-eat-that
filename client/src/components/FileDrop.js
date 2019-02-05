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
        <span style={{ marginBottom: '20px' }}>or</span>
        <br />
        <label
          htmlFor='file'
          style={{
            display: 'block',
            maxWidth: '190px',
            background: ourColors.buttonColor,
            fontSize: '1rem',
            fontWeight: '500',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px auto'
          }}
        >
          {props.selectedFile
            ? typeof props.selectedFile === 'boolean'
              ? 'Choose a file...'
              : props.selectedFile[0].name
            : 'Choose a file...'}
        </label>
        <input
          type='file'
          name='file'
          id='file'
          onChange={props.handleInputSelectedFile}
          className='inputfile'
        />
      </DropInputField>
    </DropCard>
  );
};

export default FileDropFunc;
