import { Link } from "react-router-dom";

export default function HeroSection({ 
  title, 
  subtitle, 
  showCTA = true, 
  imageDesktop, 
  imageDesktopWebP, 
  imageDesktopAvif, 
  imageMobile, 
  alt 
}) {

  return (
    <section className="hero-section">
      <div className="hero-section__bg-wrapper">
        <div className="hero-section__overlay"></div>

        <picture>
          <source media="(max-width: 768px)" srcSet={imageMobile || imageDesktopWebP} />

          {imageDesktopAvif && (
            <source srcSet={imageDesktopAvif} type="image/avif" />
          )}

          {imageDesktopWebP && (
            <source srcSet={imageDesktopWebP} type="image/webp" />
          )}

          <img src={imageDesktop} alt={alt} className="hero-section__bg-image" fetchPriority="high" width="1920" height="1080" />
        </picture>
      </div>

      <div className="hero-section__content-wrapper">
        <h1 className="hero-section__title">{title}</h1>
        
        {subtitle && (
          <p className="hero-section__subtitle">{subtitle}</p>
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