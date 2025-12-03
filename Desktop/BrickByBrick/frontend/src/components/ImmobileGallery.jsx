export default function ImmobileGallery({ immagine, altText }) {

  const BASE_PATH = "/immobili"; 

  const getFileNameNoExt = (filename) => {
    if (!filename) return "";
    return filename.split('.').slice(0, -1).join('.');
  };

  const fileNameNoExt = getFileNameNoExt(immagine);


  if (!immagine) return <div className="gallery-placeholder">Nessuna immagine disponibile</div>;

  return (
    <div className="dettaglio-immobile__gallery">
      <div className="dettaglio-immobile__main-image">
        <picture>
          <source srcSet={`${BASE_PATH}/avif/${fileNameNoExt}.avif`} type="image/avif" />
          <source srcSet={`${BASE_PATH}/webp/${fileNameNoExt}.webp`} type="image/webp" />
          <img src={`${BASE_PATH}/jpg/${immagine}`} alt={altText} className="dettaglio-immobile__image" width="800" height="500" loading="eager" fetchPriority="high" decoding="async"/>
        </picture>
//       {/* <div className="dettaglio-immobile__thumbnails">
//         {immagini.map((img, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedImage(index)}
//             className={`dettaglio-immobile__thumbnail ${selectedImage === index ? 'dettaglio-immobile__thumbnail--active' : ''}`}
//           >
//             <img src={img} alt={`${altText} ${index + 1}`} />
//           </button>
//         ))}
//       </div> */}
      </div>
    </div>
  );
}