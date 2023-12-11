import React, {useState, useMemo} from 'react';
import './App.css';
import Slider from './Components/slider';
import SidebarItem from './Components/Items';
import ImageUpload from './Components/ImageUpload';
import Gallery from './Components/Gallery';
import HomePage from './Components/Homepage';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
]

const MenuIcon = ({ onClick }) => (
  <div className="menu-icon" onClick={onClick}>
    ☰
  </div>
);

const MenuItem = ({ label, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    {label}
  </div>
);


function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [savedImageURL, setSavedImageURL] = useState(null);
  const selectedOption = options[selectedOptionIndex];

  const [showGallery, setShowGallery] = useState(false);
  const [showupl, setShowupl] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editedImages, setEditedImages] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [showHome, setShowHome] = useState(true);



  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  const getImageStyle = useMemo(
    function getImageStyle() {
      const filters = options.map((option) => {
        return `${option.property}(${option.value}${option.unit})`;
      });

      return { filter: filters.join(' ') };
    },
    [options]
  );
  
  const handleDownload = () => {
    const image = new Image();
    image.src = uploadedImage;
  
    const tempImage = new Image();
    tempImage.src = uploadedImage;
  
    tempImage.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
  
      tempCanvas.width = tempImage.width;
      tempCanvas.height = tempImage.height;
  
      const combinedFilter = options.map(option => `${option.property}(${option.value}${option.unit})`).join(' ');
  
      tempContext.filter = combinedFilter;
  
      tempContext.drawImage(tempImage, 0, 0, tempCanvas.width, tempCanvas.height);
  
      const modifiedImageURL = tempCanvas.toDataURL('image/jpeg');
  
      setSavedImageURL(modifiedImageURL);

      setEditedImages((prevImages) => [...prevImages, modifiedImageURL]);
    };
  };
  

  const handleDownloadSavedImage = () => {const link = document.createElement('a');
    link.href = savedImageURL;
    link.download = 'saved_filtered_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setOptions(DEFAULT_OPTIONS);
      setSelectedOptionIndex(0);
    }
  };

  return (
    <div className="container">
    <MenuIcon onClick={() => setShowMenu((prev) => !prev)} />
    {showMenu && (
      <div className="menu-item-region">
        <MenuItem label="Home" onClick={() => { setShowHome(true); setShowGallery(false) ; setShowupl(false) ;}} />
        <MenuItem label="Edit" onClick={() => { setShowGallery(false) ; setShowupl(true) ; setShowHome(false);}} />
        <MenuItem label="Gallery" onClick={() =>  { setShowGallery(true) ; setShowupl(false) ; setShowHome(false);}} />
      </div>
    )}
    {showHome && <HomePage />}
      <div className="main-image" style={{ ...getImageStyle, backgroundImage: `url(${uploadedImage || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fapp-background&psig=AOvVaw1IMR2lmluBRvBr-8qA-XuP&ust=1702375151004000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPilsOOPh4MDFQAAAAAdAAAAABAD'})` }} />
      {showupl && (
      <div className='sidebar'>
        <div className='image-upload-section'>
          <ImageUpload onImageUpload={handleImageUpload} />
          <p className='filter-text'>Filters</p>
        </div>
        <hr className='sidebar-divider' />
        {options.map((option, index) => (
          <div key={index} className={`sidebar-item-wrapper ${option.name.toLowerCase()}`}>
          <SidebarItem
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={() => setSelectedOptionIndex(index)}
          />
          </div>
        ))}
      </div>
      )}

      {showupl && (
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      )}

      {showupl && (
        <>
      <button className='download-button' onClick={handleDownload}>
        SAVE
      </button>
      {savedImageURL && (
        <button className='download-button' onClick={handleDownloadSavedImage}>
          DOWNLOAD 
        </button>
      )}
      </>
      )}



      {showGallery && (
        <div className="gallery-container">
        <Gallery
          images={editedImages}
          currentIndex={currentImageIndex}
          onClose={() => setShowGallery(false)}
          onPrev={() =>
            setCurrentImageIndex((prev) => (prev === 0 ? editedImages.length - 1 : prev - 1))
          }
          onNext={() =>
            setCurrentImageIndex((prev) => (prev === editedImages.length - 1 ? 0 : prev + 1))
          }
        />
        </div>
      )}
      
    </div>
  );
  
  
}

export default App;
