import '../styles/components/_card.scss';
export default function Card({image, subtitle,text}) {

    return (
        <div className="card-container">
            <div className="card-image-wrapper">
                <img src={image} alt={subtitle} className="card-image" />
            </div>
            <h3 className="card-subtitle">{subtitle}</h3>
            <p className="card-text">{text}</p>
        </div>
        
    )

}