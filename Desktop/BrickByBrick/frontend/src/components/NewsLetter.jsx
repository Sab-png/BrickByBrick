import { useState } from 'react';

import newsletterImage from '../assets/images/newsletter.svg';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert("Inserisci un'email!");
            return;
        }

        setStatus('inviando...');
        console.log("Iscrizione con l'email:", email);

        setTimeout(() => {
            setStatus('Iscrizione avvenuta!');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="newsletter">
            <div className="newsletter__illustration-box">
                <img 
                    src={newsletterImage}
                    alt="Illustrazione newsletter" 
                    className="newsletter__image" 
                />
            </div>

            <div className="newsletter__content">
                <h2 className="newsletter__title">Non perdere l'occasione</h2>
                <p className="newsletter__text">
                    Iscriviti alla nostra newsletter esclusiva per ricevere novità esclusive. 
                    L'eccellenza immobiliare ti aspetta.
                </p>
                
                <form onSubmit={handleSubmit} className="newsletter__form">
                    <input
                        type="email"
                        placeholder="Inserisci la tua mail."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="newsletter__input"
                        required
                    />
                    <button 
                        type="submit" 
                        className="newsletter__button"
                        disabled={status === 'inviando...'}
                    >
                        {status || "Iscriviti ora"}
                    </button>
                </form>
            </div>
        </section>
    );
}