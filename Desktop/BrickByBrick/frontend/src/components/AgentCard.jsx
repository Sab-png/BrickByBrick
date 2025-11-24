export default function AgentCard({ image, name, location }) {
    return (
        <div className="agent-card">
            <div className="agent-card__image-wrapper">
                <img
                    src={image}
                    alt={name}
                    className="agent-card__image"
                />
            </div>
            <div className="agent-card__info">
                <h3 className="agent-card__name">{name}</h3>
                <p className="agent-card__location">{location}</p>
            </div>
        </div>
    );
}
