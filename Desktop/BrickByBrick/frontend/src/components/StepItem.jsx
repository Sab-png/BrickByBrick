export default function StepItem({ number, imageAvif, imageWebp, imageJpg, title, description, alignRight = false }) {
    return (
        <li className={`step-item ${alignRight ? 'step-item--right' : ''}`}>
            <div className="step-item__number">{number}</div>
            <div className="step-item__media">
                <picture>
                    <source srcSet={imageAvif} type="image/avif" />
                    <source srcSet={imageWebp} type="image/webp" />
                    <img src={imageJpg} alt={title} className="step-item__image" loading="lazy" />
                </picture>
            </div>
            <div className="step-item__content">
                <h3 className="step-item__title">{title}</h3>
                <p className="step-item__description">{description}</p>
            </div>
        </li>
    );
}