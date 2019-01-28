import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';


const FileDropFunc = props => {
  let uploaderClasses = 'file-uploader';
  if (props.dragging) {
    uploaderClasses += 'file-uploader--dragging';
  }

  const fileName = props.file ? props.file.name : 'No File Uploaded';

  return (
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
        <div className="file-uploader-contents"
        onChange={props.handleInputSelectedFile}
        >
            <span className="file-uploader-file-name" >
                {fileName}
            </span><br></br>
            <span>Drag & Drop File</span><br></br>
            <span>or</span><br></br>
           
        </div>
        {props.children}

    {/* <input this is the reason why the input field was there
      ref={el => (props.fileUploaderInput = el)}
      type='file'
      className='file-uploader-input'
      onChange={props.onFileChange}
    /> */}

    </Form.Field>

    // <Form.Field>
    //   <input
    //     type="file"
    //     name="myFile"
    //     onChange={props.handleInputSelectedFile}
    //   />
    //   <Popup
    //     trigger={
    //       <Button
    //         onClick={props.handleFileUpload}
    //         style={{ marginTop: '15px' }}
    //       >
    //         Upload Image
    //       </Button>
    //     }
    //     content={
    //       props.selectedFile
    //         ? 'Image Upload completed!'
    //         : 'No image was uploaded.'
    //     }
    //     on="click"
    //   /> 
    // </Form.Field>




  );
};

export default FileDropFunc;
