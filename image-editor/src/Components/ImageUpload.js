import React from 'react';



export default function ImageUpload({ onImageUpload }) {
  return (
    <div className="image-upload-container">
      <label className="image-upload-label" htmlFor="imageUpload">Upload Image:</label>
      <input
        className="image-upload-input"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={onImageUpload}
      />
    </div>
  );
}