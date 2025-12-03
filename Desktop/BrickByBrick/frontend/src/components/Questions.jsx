/**
 * @fileoverview Form contatti "Hai domande sui nostri servizi?".
 * 
 * @module Questions
 */

/**
 * Componente Questions
 * 
 * Form con nome, cognome, email, telefono, messaggio.
 * 
 * @component
 * @returns {JSX.Element} Form contatti
 * 
 * @example
 * <Questions />
 */
export default function Questions() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modulo inviato!");
  };

  return (
    <div className="contact__background">

      <div className="contact__header">
        <h2>Hai domande sui nostri servizi?</h2>
        <p>Siamo qui per aiutarti!</p>
        <p>Inviaci un messaggio tramite il modulo sottostante, oppure contattaci direttamente.</p>
        <p>Il nostro team è a tua completa disposizione.</p>
      </div>

      <div className="contact__container">
        <form onSubmit={handleSubmit} className="contact__form">

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="name">Nome e cognome</label>
              <input type="text" id="name" placeholder="Inserisci il tuo nome" required />
            </div>

            <div className="form-group half-width hide-label-on-mobile">
              <label htmlFor="surname" className="contact__visually-hidden">Cognome</label>
              <input type="text" id="surname" placeholder="Inserisci il tuo cognome" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Inserisci la tua mail" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Messaggio</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Scrivi un messaggio qui..."
              required
            ></textarea>
          </div>

          <button type="submit" className="contact__form__submit-button">
            Contattaci →
          </button>

        </form>
      </div>
    </div>
  );
}
