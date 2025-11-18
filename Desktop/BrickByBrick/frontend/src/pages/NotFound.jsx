import { Link } from 'react-router-dom';
import '../styles/components/_notfound.scss';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-image-wrapper">
                <img src="/img/no-results.png" alt="Errore 404" />
            </div>

            <h1 className="not-found-title">
                Ops...Si è verificato un errore
            </h1>

            <p className="not-found-description">
                Errore di percorso! Hai smarrito la via di casa. Torna alla Home e riprendi la ricerca.
            </p>

            <Link to="/" className="not-found-button">
                Torna alla Home
            </Link>
        </div>
    );
}