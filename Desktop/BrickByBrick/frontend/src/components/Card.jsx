/**
 * @fileoverview Componente card riutilizzabile per step process.
 * Utilizzato in CardSection per mostrare i passaggi.
 * 
 * @module Card
 */

/**
 * Componente Card
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.image - URL immagine icona
 * @param {string} props.subtitle - Titolo della card
 * @param {string} props.text - Descrizione del passaggio
 * @returns {JSX.Element} Card con icona, titolo e testo
 * 
 * @example
 * <Card
 *   image="/img/icon.svg"
 *   subtitle="Valuta Online"
 *   text="Ricevi la prima stima entro 72 ore"
 * />
 */
export default function Card({ image, subtitle, text }) {
  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img src={image} alt={subtitle} className="card__image" width={64} height={64} loading="lazy" decoding="async"/>
      </div>
      <h3 className="card__subtitle">{subtitle}</h3>
      <p className="card__text">{text}</p>
    </div>
  );
}

