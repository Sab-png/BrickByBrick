export default function Card({title, description}) {

    return (
        <div className="card">
        <img src="immagine" alt="titolo" />
        <h2>{title}</h2>
        <p>{description}</p>
        </div>
        
    )

}