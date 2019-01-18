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
// https://spin.atomicobject.com/2018/09/13/file-uploader-react-typescript/