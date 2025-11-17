
import '../styles/components/_herosection.scss';

export default function HeroSection() {
  return (
    <section className="hero-section">
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