import { useState } from 'react';

export default function ImmobileGallery({ immagini, altText }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="dettaglio-immobile__gallery">
      <div className="dettaglio-immobile__main-image">
        <img src={immagini[selectedImage]} alt={altText} />
      </div>
      <div className="dettaglio-immobile__thumbnails">
        {immagini.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`dettaglio-immobile__thumbnail ${selectedImage === index ? 'dettaglio-immobile__thumbnail--active' : ''}`}
          >
            <img src={img} alt={`${altText} ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}