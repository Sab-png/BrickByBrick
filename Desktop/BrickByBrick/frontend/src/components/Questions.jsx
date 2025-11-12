import React from 'react';
import '../styles/components/_questions.scss'; // Percorso al tuo SCSS

// Funzione React per la sezione Contatti
export default function Questions() {
  
  // Funzione di esempio per gestire l'invio (da implementare)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modulo inviato!");
    
  };

  return (
    <div className="contact-background">
      <div className="contact-header">
        <h2>Hai domande sui nostri servizi?</h2>
        <p>Siamo qui per aiutarti!</p>
        <p>Inviaci un messaggio tramite il modulo sottostante, oppure contattaci direttamente.</p>
        <p>Il nostro team è a tua completa disposizione.</p>
      </div>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          
          {/* Riga Nome e Cognome */}
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="name">Nome e cognome</label>
              <input type="text" id="name" placeholder="Inserisci il tuo nome" required />
            </div>

            {/* Il campo Cognome è affiancato al Nome */}
            <div className="form-group half-width hide-label-on-mobile">
              <label htmlFor="surname" className="visually-hidden">Cognome</label>
              <input type="text" id="surname" placeholder="Inserisci il tuo cognome" required />
            </div>
          </div>
          
          {/* Riga Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Inserisci la tua mail" required />
          </div>
          
          {/* Riga Messaggio */}
          <div className="form-group">
            <label htmlFor="message">Messaggio (allega file se necessario)</label>
            <textarea 
              id="message" 
              rows="5" 
              placeholder="Scrivi un messaggio qui..." 
              required
            ></textarea>
          </div>
          
          {/* Bottone di Invio */}
          <button type="submit" className="submit-button">
            Contattaci →
          </button>
          
        </form>
      </div>
    </div>
  );
}