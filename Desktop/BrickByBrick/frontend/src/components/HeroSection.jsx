/**
 * @fileoverview Sezione hero con immagine di sfondo e CTA.
 * Supporta immagini responsive con picture element e formati moderni.
 * 
 * @module HeroSection
 * @requires react-router-dom
 */

import { Link } from "react-router-dom";

/**
 * Componente Hero Section
 * 
 * Caratteristiche:
 * - Immagini responsive (mobile/desktop)
 * - Supporto formati moderni (AVIF, WebP) con fallback
 * - Overlay semi-trasparente
 * - CTA opzionale
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.title - Titolo principale
 * @param {string} props.subtitle - Sottotitolo descrittivo
 * @param {boolean} [props.showCTA=true] - Mostra call-to-action
 * @param {string} props.imageDesktop - Immagine desktop (formato base)
 * @param {string} [props.imageDesktopWebP] - Immagine desktop WebP
 * @param {string} [props.imageDesktopAvif] - Immagine desktop AVIF
 * @param {string} [props.imageMobile] - Immagine mobile
 * @param {string} props.alt - Testo alternativo immagine
 * @returns {JSX.Element} Sezione hero
 * 
 * @example
 * <HeroSection
 *   title="Trova la tua casa ideale"
 *   subtitle="Scopri le migliori opportunità"
 *   imageDesktop="/img/hero.jpg"
 *   imageDesktopWebP="/img/hero.webp"
 *   alt="Casa moderna"
 * />
 */
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
          {/* {imageMobileWebP && (
                <source media="(max-width: 768px)" srcSet={imageMobileWebP} type="image/webp" />
          )} */}

          <source media="(max-width: 768px)" srcSet={imageMobile || imageDesktopWebP} />

          {imageDesktopAvif && (
            <source srcSet={imageDesktopAvif} type="image/avif" />
          )}

          {imageDesktopWebP && (
            <source srcSet={imageDesktopWebP} type="image/webp" />
          )}

          <img src={imageDesktop} alt={alt || "Immagine di Copertina"} className="hero-section__bg-image" fetchPriority="high" loading="eager" decoding="async" width="1920" height="800" />
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