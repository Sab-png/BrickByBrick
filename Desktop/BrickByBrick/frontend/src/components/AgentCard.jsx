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
