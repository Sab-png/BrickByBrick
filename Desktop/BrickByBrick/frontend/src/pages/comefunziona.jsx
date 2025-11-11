import { NavLink } from 'react-router-dom'
import heroImage from '../assets/images/img header valuta.avif'
import step1Image from '../assets/images/img step 1.avif'
import step2Image from '../assets/images/img step 2.avif'
import step3Image from '../assets/images/img step 3.avif'

export default function ComeFunziona() {
  return (
    <main className="come-funziona">
      <section className="cf-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="cf-hero__content">
          <h1>Vuoi scoprire quanto vale la tua casa?</h1>
          <p>Inizia adesso la tua valutazione in 3 semplici passaggi.</p>
          <NavLink to="#" className="cf-btn">Valuta il tuo immobile</NavLink>
        </div>
      </section>

      <section className="cf-steps">
        <h2>Quali sono i passaggi?</h2>

        <ol className="cf-steps__list">
          <li className="cf-step">
            <div className="cf-step__num">1</div>
            <div className="cf-step__media">
              <img src={step1Image} alt="Compila il form" />
            </div>
            <div className="cf-step__text">
              <h3>Compila il form passo dopo passo</h3>
              <p>Inserisci i dati dell’immobile: tipologia, zona, superficie e servizi. Puoi completare il form in pochi minuti.</p>
            </div>
          </li>

          <li className="cf-step">
            <div className="cf-step__num">2</div>
            <div className="cf-step__media">
              <img src={step2Image} alt="Ricevi la stima" />
            </div>
            <div className="cf-step__text">
              <h3>Ricevi la stima di prezzo entro 72 ore</h3>
              <p>La nostra piattaforma elabora i dati e ti invia una valutazione preliminare via email in tempi rapidissimi.</p>
            </div>
          </li>

          <li className="cf-step">
            <div className="cf-step__num">3</div>
            <div className="cf-step__media">
              <img src={step3Image} alt="Appuntamento con esperto" />
            </div>
            <div className="cf-step__text">
              <h3>Valutazione e appuntamento con l’esperto locale</h3>
              <p>Fissa l’incontro per la verifica sul posto e ottieni la valutazione definitiva.</p>
            </div>
          </li>
        </ol>

        <div className="cf-cta">
          <NavLink to="#" className="cf-btn">Valuta il tuo immobile</NavLink>
        </div>
      </section>
    </main>
  )
}

