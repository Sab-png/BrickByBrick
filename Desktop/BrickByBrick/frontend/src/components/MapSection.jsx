export default function MapSection({ isOpen, onToggle, immobili }) {
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
          {/* Placeholder per la mappa */}
          <div className="map-section__placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Mappa interattiva (da implementare con Google Maps API)</p>
            <small>{immobili.length} immobili visualizzati</small>
          </div>
        </div>
      )}
    </div>
  );
}