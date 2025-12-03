/**
 * @fileoverview Componente per singola feature con icona e descrizione.
 * Utilizzato in FeatureSection.
 * 
 * @module FeatureItem
 */

/**
 * Componente Feature Item
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.icon - URL immagine icona
 * @param {string} props.title - Titolo della feature
 * @param {string} props.description - Descrizione dettagliata
 * @returns {JSX.Element} Feature item con icona e testo
 * 
 * @example
 * <FeatureItem
 *   icon="/img/valutazione.svg"
 *   title="Valutazione garantita"
 *   description="Stima precisa entro 72 ore"
 * />
 */
export default function FeatureItem({ icon, title, description }) {
    return (
        <div className="feature-item">
            <div className="feature-item__icon-wrapper">
                {/* Se l'icona è un SVG/PNG importato */}
                <img src={icon} alt={title} className="feature-item__icon" />
                
                {/* Se usi un font icon come Font Awesome, usa questo invece di <img> */}
                {/* <i className={`feature-item__icon ${icon}`}></i> */}
            </div>
            <div className="feature-item__text-content">
                <h4 className="feature-item__title">{title}</h4>
                <p className="feature-item__description">{description}</p>
            </div>
        </div>
    );
}