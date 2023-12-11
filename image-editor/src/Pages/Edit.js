// Edit.js

import React, { useState } from 'react';
import UploadImage from '../Components/UploadImage'; // Corrected import path
import EditOptions from '../Components/EditOptions';

const Edit = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [options, setOptions] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    blur: 0,
  });

  const handleSliderChange = (property, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [property]: value,
    }));
  };

  return (
    <div>
      {!selectedImage ? (
        <UploadImage setSelectedImage={setSelectedImage} />
      ) : (
        <div>
          <h2>Edit Image</h2>
          <EditOptions selectedImage={selectedImage} options={options} handleSliderChange={handleSliderChange} />
        </div>
      )}
    </div>
  );
};

export default Edit;
