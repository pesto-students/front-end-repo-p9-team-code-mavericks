import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import addRecipeImage from '../img/recipe_add_icon.png';


const UploadImgComponent = (props) => {
  const token = Cookies.get('token');

  const handleFileChange = (e) => {
    const selectedFilesArray = Array.from(e.target.files);
    props.setFiles(selectedFilesArray);
    props.setSelectedFiles(selectedFilesArray.map(file => {
      return URL.createObjectURL(file);
    }));
  };


  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{
          display: 'none', // Hide the default input element
        }}
        id="custom-file-input" // Add an ID for the label
      />

      <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyItems: 'center' }}>
        <div>
          <h3 style={{ color: 'gray' }}>Add All Recipe Images:</h3>
        </div>&nbsp;&nbsp;
        <div style={{ cursor: 'pointer' }}>
          <label
            htmlFor="custom-file-input"
            className='add-post-img-icon'
            style={{ backgroundImage: `url(${addRecipeImage})` }}
          ></label>
        </div>
      </div>
      <br></br>
      <div className='display-uploaded-imgs-flexbox'>
        {props.selectedFiles.map((filePath, index) => (
          <div
            className='display-uploaded-img-inner-div'
            key={index}
          >
            <img src={filePath} alt={`Selected ${index}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImgComponent;
