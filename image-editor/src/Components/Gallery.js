import React from 'react';

const Gallery = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  return (
    <div className="gallery-main">
      <div className="gallery">
        <button className="gallery-close-button" onClick={onClose}>
          Close Gallery
        </button>
        <div className="gallery-view">
          <img src={images[currentIndex]} alt={`Edited ${currentIndex + 1}`} />
        </div>
        <div className="gallery-buttons">
          <button className="gallery-nav-button" onClick={onPrev}>
            Previous
          </button>
          <button className="gallery-nav-button" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
