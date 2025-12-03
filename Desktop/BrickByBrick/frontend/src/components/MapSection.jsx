/**
 * @fileoverview Sezione mappa interattiva con toggle apri/chiudi.
 * Integrata con Google Maps iframe per visualizzare immobili.
 * 
 * @module MapSection
 */

/**
 * Componente Map Section
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {boolean} props.isOpen - Stato aperto/chiuso della mappa
 * @param {Function} props.onToggle - Callback per toggle apertura
 * @param {Array<Object>} props.immobili - Array immobili da mostrare
 * @returns {JSX.Element} Sezione mappa con toggle
 * 
 * @example
 * <MapSection
 *   isOpen={mapOpen}
 *   onToggle={() => setMapOpen(!mapOpen)}
 *   immobili={filteredImmobili}
 * />
 */
export default function MapSection({ isOpen, onToggle, immobili }) {

  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90168.55476552583!2d7.587687778970639!3d45.0702306130343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d126418be25%3A0x8903f803d69c77bf!2sTorino%20TO!5e0!3m2!1sit!2sit!4v1764430986170!5m2!1sit!2sit" 

  return (
    <div className={`map-section ${isOpen ? 'map-section--open' : ''}`}>
      <button 
        className="map-section__toggle"
        onClick={onToggle}
      >
        {isOpen ? (
          <>
            <i className="fas fa-times"></i> Chiudi mappa
          </>
        ) : (
          <>
            <i className="fas fa-map-marked-alt"></i> Apri mappa
          </>
        )}
      </button>

      {isOpen && (
        <div className="map-section__container">
          {/* <div className="map-section__placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Mappa interattiva (da implementare con Google Maps API)</p>
            <small>{immobili.length} immobili visualizzati</small>
          </div> */}
          <iframe title="Mappa Immobili" src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
      )}
    </div>
  );
}