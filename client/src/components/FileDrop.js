// let React = require('react');
// let Dropzone = require('react-dropzone');
// let axios = require('axios');

// const URL =

// exports = module.exports = React.createClass({
//     _onDrop: function(files) {
//         let file = files[0];

//         axios.get()
//     }
// })

// import React from 'react'
// import classNames from 'classnames'
// import Dropzone from 'react-dropzone'
// import { connect } from 'react-redux';

// class MyDropzone extends React.Component {
//    onDrop = (acceptedFiles, rejectedFiles) => {
//      // Do something with files

//    }

//    render() {
//     return (
//       <Dropzone onDrop={this.onDrop}>
//         {({getRootProps, getInputProps, isDragActive}) => {
//           return (
//             <div
//               {...getRootProps()}
//               className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
//             >
//               <input {...getInputProps()} />
//               {
//                 isDragActive ?
//                   <p>Drop files here...</p> :
//                   <p>Try dropping some files here, or click to select files to upload.</p>
//               }
//             </div>
//           )
//         }}
//       </Dropzone>
//     );
//   }
// }

// const mapStateToProps = state => {
//     return true;
// }

// export default connect(mapStateToProps)(MyDropzone);

// possible link to follow
// https://spin.atomicobject.com/2018/09/13/file-uploader-react-typescript/file

// import React, { Component } from "react";
// import axios from "axios";

// class FileDrop extends Component {
//   constructor() {
//     super();
//     this.state = {
//       seletedFile: null,
//       loaded: 0
//     };
//   }

// inputFile = event => {
//     this.setState({
//         seletedFile: event.target.files[0],
//         loaded: 0,
//     })
// }

//   getFile = event => {
//       const fileData = new FormData();
//       fileData.append('file', this.state.seletedFile, this.state.seletedFile.name)

//       axios
//         .post()

//   };

//   render() {
//     return (
//       <div className="file-drop-container">
//         <input type="filetext" onChange={this.inputFile} />
//         <div className="submit" id="" onClick={this.getFile}>
//           SUBMIT
//         </div>
//       </div>
//     );
//   }
// }

// export default FileDrop;

//Functional Component Route
import React from "react";

const FileDrop = props => {
  return (
    <div className="file-drop-container">
      <input
       type="filetext" 
       onChange={this.inputFile} 
       />
      <div 
        className="submit" 
        id="" 
        onClick={this.getFile}
        >
        
        SUBMIT
      </div>
    </div>
  );
};

export default FileDrop;
