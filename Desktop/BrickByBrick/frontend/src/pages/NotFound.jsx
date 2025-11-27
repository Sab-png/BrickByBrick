import CTAButton from '../components/CTAButton';
import notFoundImg from '../assets/images/not-found.svg';

import useSEO from '../hooks/useSEO';

export default function NotFound() {

    useSEO({
        title: "404 Pagina non trovata",
        description: "La pagina che stavi cercando non esiste o è stata spostata.",
        noindex: true
    })

    return (
        <>
        <div className="not-found-container">
            <div className="not-found-image-wrapper">
                <img src={notFoundImg} alt="Errore 404 - Non Trovato" />
            </div>

            <h2 className="h1 not-found-title">
                Ops...Si è verificato un errore
            </h2>

            <p className="not-found-description">
                Errore di percorso! Hai smarrito la via di casa. Torna alla Home e riprendi la ricerca.
            </p>

            <CTAButton content='Torna Alla Home' ctaLink='/'/>
        </div>
        </>
    );
}