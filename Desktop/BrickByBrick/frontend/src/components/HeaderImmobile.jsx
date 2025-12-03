/**
 * @fileoverview Header pagina dettaglio immobile con titolo, prezzo e back button.
 * 
 * @module HeaderImmobile
 * @requires react-icons/fa
 */

import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

export default function HeaderImmobile({ immobile, formattedPrice, onBackClick }) {
  return (
    <div className="dettaglio-immobile__header">
      <div className="dettaglio-immobile__header-content">
        <button
          onClick={onBackClick}
          className="dettaglio-immobile__back-btn"
          aria-label="Torna all'elenco immobili"
        >
          <FaArrowLeft />
        </button>
        
        <div className="dettaglio-immobile__header-text">
          <h1 className="dettaglio-immobile__title">{immobile.indirizzo}</h1>
          <p className="dettaglio-immobile__location">
            {/* Ho aggiunto una classe per poterla gestire nel CSS se serve margine/colore */}
            <FaMapMarkerAlt className="location-icon" /> 
            <span>{immobile.indirizzo}, {immobile.citta} ({immobile.cap})</span>
          </p>
        </div>
        
        <div className="dettaglio-immobile__price-box">
          <span className="dettaglio-immobile__price">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}