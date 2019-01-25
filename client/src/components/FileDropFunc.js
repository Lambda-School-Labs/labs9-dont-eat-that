import React from 'react';

const FileDropFunc = props => {
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

  const fileName = props.file ? props.file.name : 'No File Uploaded';

  return (
    <div 
        className='uploaderClasse' 
        onDrag={props.onDrag} 
        onDragStart={props.onDragStart}
        onDragEnd={props.onDragEnd}
        onDragOver={props.onDragOver}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
        onDrop={props.onDrop}
    >
        <div className="file-uploader-contents">
            <span className="file-uploader-file-name">
                {fileName}
            </span>
            <span>Drag & Drop File</span>
            <span>or</span>
            <span onClick={props.onSelectFileClick}>Select File</span>
        </div>
        {props.children}

    </div>

  );
};

export default FileDropFunc;
