// src/components/dettaglio/DettaglioHeader.js
export default function HeaderImmobile({ immobile, formattedPrice, onBackClick }) {
  return (
    <div className="dettaglio-immobile__header">
      <div className="dettaglio-immobile__header-content">
        <button
          onClick={onBackClick}
          className="dettaglio-immobile__back-btn"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="dettaglio-immobile__header-text">
          <h1 className="dettaglio-immobile__title">{immobile.indirizzo}</h1>
          <p className="dettaglio-immobile__location">
            <i className="fas fa-map-marker-alt"></i> {immobile.indirizzo}, {immobile.citta} ({immobile.cap})
          </p>
        </div>
        <div className="dettaglio-immobile__price-box">
          <span className="dettaglio-immobile__price">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}