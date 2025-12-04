/**
 * @fileoverview Pulsante call-to-action riutilizzabile con routing.
 * 
 * @module CTAButton
 * @requires react-router-dom
 */

import { Link } from "react-router-dom"

/**
 * Componente CTA Button
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} [props.content="VALUTA IL TUO IMMOBILE"] - Testo del pulsante
 * @param {string} [props.ctaLink="/valuta-immobile"] - Percorso di destinazione
 * @returns {JSX.Element} Link con pulsante CTA
 * 
 * @example
 * // Uso con valori predefiniti
 * <CTAButton />
 * 
 * @example
 * // Con testo e link personalizzati
 * <CTAButton content="Contattaci" ctaLink="/contatti" />
 */
export default function CTAButton({content = "VALUTA IL TUO IMMOBILE", ctaLink = "/valuta-immobile"}) {
    return (
        <Link to={ctaLink}>
          <button className="cta-button">
            {content}
          </button>
        </Link>
    )
} 