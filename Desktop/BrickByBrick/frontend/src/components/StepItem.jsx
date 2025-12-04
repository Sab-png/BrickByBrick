/**
 * @fileoverview Componente singolo step con numero, immagine e descrizione.
 * Utilizzato in StepsSection.
 * 
 * @module StepItem
 */

/**
 * Componente Step Item
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {number} props.number - Numero dello step
 * @param {string} props.imageAvif - URL immagine AVIF
 * @param {string} props.imageWebp - URL immagine WebP
 * @param {string} props.imageJpg - URL immagine JPG
 * @param {string} props.title - Titolo dello step
 * @param {string} props.description - Descrizione dello step
 * @param {boolean} [props.alignRight=false] - Allinea a destra
 * @returns {JSX.Element} Step item con numero, media e contenuto
 * 
 * @example
 * <StepItem
 *   number={1}
 *   imageJpg="/img/step1.jpg"
 *   title="Valuta Online"
 *   description="Ricevi la stima"
 *   alignRight={false}
 * />
 */
export default function StepItem({ number, imageAvif, imageWebp, imageJpg, title, description, alignRight = false }) {
    return (
        <li className={`step-item ${alignRight ? 'step-item--right' : ''}`}>
            <div className="step-item__number">{number}</div>
            <div className="step-item__media">
                <picture>
                    <source srcSet={imageAvif} type="image/avif" />
                    <source srcSet={imageWebp} type="image/webp" />
                    <img src={imageJpg} alt={title} className="step-item__image" width="300" height="200" loading="lazy" decoding="async"/>
                </picture>
            </div>
            <div className="step-item__content">
                <h3 className="step-item__title">{title}</h3>
                <p className="step-item__description">{description}</p>
            </div>
        </li>
    );
}