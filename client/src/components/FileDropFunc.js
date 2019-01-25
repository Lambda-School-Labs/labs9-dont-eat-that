import React from 'react';


const FileDropFunc = props => {
    
    let uploaderClasses = 'file-uploader';
    if(dragging) {
        uploaderClasses += 'file-uploader--dragging';
    }
    
    const fileName = file ? file.name : 'No File Uploaded';

    return (
        <div className="uploaderClasse" onDrag={onDrag} onDragStart={onDragStart}>

        </div>
    )
}

export default FileDropFunc;