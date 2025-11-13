export default function Card({ image, subtitle, text }) {
  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img src={image} alt={subtitle} className="card__image" />
      </div>
      <h3 className="card__subtitle">{subtitle}</h3>
      <p className="card__text">{text}</p>
    </div>
  );
}

