import React, { useState } from 'react';
import ImageGallery from '../Components/gallery';

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  return (
    <div>
      <h2>Image Gallery</h2>
      <ImageGallery setSelectedImageIndex={setSelectedImageIndex} />
      {selectedImageIndex !== null && (
        <div>
          {/* Render the selected image with next and previous buttons */}
        </div>
      )}
    </div>
  );
};

export default Gallery;