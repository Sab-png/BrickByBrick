/**
 * @fileoverview Card per visualizzazione agente con immagine responsive.
 * Supporta formati moderni (AVIF, WebP) con fallback JPG.
 * 
 * @module AgentCard
 */

/**
 * Componente Agent Card
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.imageAvif - URL immagine AVIF
 * @param {string} props.imageWebp - URL immagine WebP
 * @param {string} props.imageJpg - URL immagine JPG (fallback)
 * @param {string} props.name - Nome dell'agente
 * @param {string} props.location - Città di competenza
 * @returns {JSX.Element} Card con foto e info agente
 * 
 * @example
 * <AgentCard
 *   imageAvif="/img/agent.avif"
 *   imageWebp="/img/agent.webp"
 *   imageJpg="/img/agent.jpg"
 *   name="Marco Rossi"
 *   location="Torino"
 * />
 */
export default function AgentCard({ imageAvif, imageWebp, imageJpg, name, location }) {
    return (
        <div className="agent-card">
            <div className="agent-card__image-wrapper">
                <picture>
                    <source srcSet={imageAvif} type="image/avif" />
                    <source srcSet={imageWebp} type="image/webp" />
                    <img src={imageJpg} alt={name} className="agent-card__image" loading="lazy" decoding="async" width="280" height="400"/>
                </picture>
            </div>
            <div className="agent-card__info">
                <h3 className="agent-card__name">{name}</h3>
                <p className="agent-card__location">{location}</p>
            </div>
        </div>
    );
}
