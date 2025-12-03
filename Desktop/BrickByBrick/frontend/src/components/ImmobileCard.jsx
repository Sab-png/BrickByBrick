import { Link } from 'react-router-dom';

import { FaHome, FaBed, FaBath, FaArrowRight } from "react-icons/fa";

export default function ImmobileCard({ immobile }) {

  const BASE_PATH = "/immobili";

  const getFileNameNoExt = (filename) => {
    if (!filename) return "";
    return filename.split('.').slice(0, -1).join('.');
  };

  const fileNameNoExt = getFileNameNoExt(immobile.foto);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/immobili/${immobile.id_immobile}`} className="property-card">
      <div className="property-card__image-wrapper">
        <picture>
          <source srcSet={`${BASE_PATH}/avif/${fileNameNoExt}.avif`} type="image/avif"/>
          <source srcSet={`${BASE_PATH}/webp/${fileNameNoExt}.webp`} type="image/webp"/>
          <img src={`${BASE_PATH}/jpg/${immobile.foto}`} alt={immobile.descrizione} className="property-card__image" width="800" height="500" loading="lazy" decoding='async' />
        </picture>
        
        {immobile.caratteristiche?.contratto && (
          <span className="property-card__badge">{immobile.caratteristiche.contratto}</span>
        )}
      </div>

      {/* <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__price">{formatPrice(immobile.prezzo)}</h3>
          <p className="property-card__location">{immobile.citta}</p>
        </div>

        <h4 className="property-card__title">{immobile.indirizzo}</h4>

        <div className="property-card__features">
          <div className="property-card__feature">
            <i className="fas fa-home"></i>
            <span>{immobile.superficie} m²</span>
          </div>
          {immobile.caratteristiche?.camere && (
            <div className="property-card__feature">
              <i className="fas fa-bed"></i>
              <span>{immobile.caratteristiche.camere} Camere</span>
            </div>
          )}
          {immobile.caratteristiche?.bagni && (
            <div className="property-card__feature">
              <i className="fas fa-bath"></i>
              <span>{immobile.caratteristiche.bagni} Bagni</span>
            </div>
          )}
        </div>

        <div className="property-card__footer">
          <span className="property-card__link">
            Scopri di più <i className="fas fa-arrow-right"></i>
          </span>
        </div>
      </div> */}

      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__price">{formatPrice(immobile.prezzo)}</h3>
          <p className="property-card__location">{immobile.citta}</p>
        </div>

        <h4 className="property-card__title">{immobile.indirizzo}</h4>

        <div className="property-card__features">
          <div className="property-card__feature">
            {/* 4. SOSTITUZIONE ICONE */}
            <FaHome className="feature-icon" />
            <span>{immobile.superficie} m²</span>
          </div>
          {immobile.caratteristiche?.camere && (
            <div className="property-card__feature">
              <FaBed className="feature-icon" />
              <span>{immobile.caratteristiche.camere} Camere</span>
            </div>
          )}
          {immobile.caratteristiche?.bagni && (
            <div className="property-card__feature">
              <FaBath className="feature-icon" />
              <span>{immobile.caratteristiche.bagni} Bagni</span>
            </div>
          )}
        </div>

        <div className="property-card__footer">
          <span className="property-card__link">
            Scopri di più <FaArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}