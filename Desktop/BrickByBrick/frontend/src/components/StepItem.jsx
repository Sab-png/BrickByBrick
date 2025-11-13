export default function StepItem({ number, image, title, description, alignRight = false }) {
    return (
        <li className={`step-item ${alignRight ? 'step-item--right' : ''}`}>
            <div className="step-item__number">{number}</div>
            <div className="step-item__media">
                <img src={image} alt={title} className="step-item__image" />
            </div>
            <div className="step-item__content">
                <h3 className="step-item__title">{title}</h3>
                <p className="step-item__description">{description}</p>
            </div>
        </li>
    );
}