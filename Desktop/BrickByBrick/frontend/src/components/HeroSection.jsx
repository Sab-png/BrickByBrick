import { Link } from "react-router-dom";

export default function HeroSection({ title, subtitle, showCTA = true, bgImage }) {

  const heroStyle = {
    '--bg-image-url': bgImage ? `url(${bgImage})` : 'none',
  };

  return (
    
    <section className="hero-section" style={heroStyle}>
      <div className="hero-section__content-wrapper">
        <h1 className="hero-section__title">
          {title}
        </h1>
        
        {subtitle && (
          <p className="hero-section__subtitle">
            {subtitle}
          </p>
        )}
        
        {showCTA && (
          <Link to={"/valuta-immobile"}>
            <button className="hero-section__cta-button">
              VALUTA IL TUO IMMOBILE
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}