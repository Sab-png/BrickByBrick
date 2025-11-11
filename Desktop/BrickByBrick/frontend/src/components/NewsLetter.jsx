import React, { useState } from 'react';
import '../styles/components/_newsletter.scss';

export default function Newsletter() {
    // 1. Stato per gestire l'input dell'email
    const [email, setEmail] = useState('');
    // 2. Stato per feedback (opzionale: potresti aggiungere 'successo'/'errore')
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault(); // Impedisce il ricaricamento della pagina

        // Esegui la validazione di base
        if (!email) {
            alert("Inserisci un'email!");
            return;
        }

        // Simula l'invio al backend
        setStatus('inviando...');
        console.log("Iscrizione con l'email:", email);

        // LOGICA DI INVIO REALE: qui useresti fetch() o Axios
        setTimeout(() => {
            setStatus('Iscrizione avvenuta!');
            setEmail(''); // Resetta il campo
        }, 1500);
    };
    
    // Un componente React deve sempre usare `return`
    return (
        <section className="newsletter">
            
            <div className="newsletter__illustration-box">
                {/* Nota: è meglio usare una classe che l'attributo "color" non standard */}
                <img src="../public/img/Papa-V.jpg" alt="Illustrazione newsletter" className="newsletter__image" />
            </div>

            <div className="newsletter__content">
                <h2 className="newsletter__title">Non perdere l'occasione</h2>
                <p className="newsletter__text">Iscriviti alla nostra newsletter esclusiva per ricevere novità esclusive. L'eccellenza immobiliare ti aspetta.</p>
                <form onSubmit={handleSubmit} className="newsletter__form">
                {/* Usiamo un form per la gestione dell'invio */}
                <input
                    type="email"
                    placeholder="Inserisci la tua email"
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