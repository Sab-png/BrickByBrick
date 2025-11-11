
import '../styles/components/_herosection.scss';

export default function HeroSection() {
  return (
    <section className="hero-section">
      
      {/* 1. Navbar e Overlay (la Navbar è integrata nell'overlay per l'aspetto) */}
      <header className="hero-section__header">
        <div className="hero-section__logo">
          {/* Sostituisci con il tuo logo/SVG */}
          <span className="logo-text">📈 IMMOBILIARIS</span> 
        </div>
        
      

        <div className="hero-section__actions">
          <button className="search-icon" aria-label="Cerca">🔍</button>
          <button className="action-link">Accedi</button>
          <button className="action-primary">Registrati</button>
        </div>
      </header>

      {/* 2. Contenuto principale (Titolo e CTA) */}
      <div className="hero-section__content-wrapper">
        <h1 className="hero-section__title">
          Vendi la tua casa in Piemonte con un valore garantito e senza stress.
        </h1>
        
        <button className="hero-section__cta-button">
          VALUTA IL TUO IMMOBILE
        </button>
      </div>

    </section>
  );
}