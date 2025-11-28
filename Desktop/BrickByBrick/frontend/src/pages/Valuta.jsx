export default function Valuta() {
    return (
        <div className="valuta-page">
            <div className="valuta-hero">
                <div className="valuta-hero__content">
                    <h1 className="valuta-hero__title">Vuoi scoprire quanto vale la tua casa?</h1>
                    <p className="valuta-hero__subtitle">Inizia adesso la tua valutazione in 3 semplici passaggi</p>
                    <button className="valuta-hero__button">Valuta il tuo immobile</button>
                </div>
            </div>

            <div className="valuta-steps">
                <h2 className="valuta-steps__title">Quali sono i passaggi?</h2>

                {/* Primo passaggio - Spostato a sinistra */}
                <div className="valuta-steps__row valuta-steps__row--left">
                    <div className="valuta-steps__image valuta-steps__image--step1">
                        <img src="/img/img step 1.avif" alt="Primo passaggio" />
                    </div>
                    <div className="valuta-steps__card">
                        <h3 className="valuta-steps__card-title">1. <strong>Compila il form passo dopo passo</strong></h3>
                        <p className="valuta-steps__card-text">
                            Fornisci i dati essenziali per calcolare il valore del tuo immobile, come superficie, piano, numero di locali e presenza di spazi interni.
                            Puoi compilare il form in pochi minuti.
                        </p>
                    </div>
                </div>

                {/* Secondo passaggio - Spostato a destra */}
                <div className="valuta-steps__row valuta-steps__row--right">
                    <div className="valuta-steps__image valuta-steps__image--step2">
                        <img src="/img/img step 2.avif" alt="Secondo passaggio" />
                    </div>
                    <div className="valuta-steps__card">
                        <h3 className="valuta-steps__card-title">2. <strong>Ricevi la stima di prezzo entro 72 ore</strong></h3>
                        <p className="valuta-steps__card-text">
                            Entro 72 ore riceverai via email la stima di prezzo calcolata per il tuo immobile tramite la nostra valutazione automatica.
                        </p>
                    </div>
                </div>

                {/* Terzo passaggio - Spostato a sinistra */}
                <div className="valuta-steps__row valuta-steps__row--left">
                    <div className="valuta-steps__image valuta-steps__image--step3">
                        <img src="/img/img step 3.avif" alt="Terzo passaggio" />
                    </div>
                    <div className="valuta-steps__card">
                        <h3 className="valuta-steps__card-title">3. <strong>Appuntamento con l'esperto locale</strong></h3>
                        <p className="valuta-steps__card-text">
                            Entro 24 ore, un esperto ti contatterà per confermare i dati e fissare l'incontro di persona per la valutazione definitiva, tramite il form apposito.
                        </p>
                    </div>
                </div>

                <button className="valuta-steps__cta-button">Valuta il tuo immobile</button>
            </div>

            <section className="valuta-newsletter">
                <div className="valuta-newsletter__container">
                    <div className="valuta-newsletter__icon">
                        <img
                            src="/img/newsletter.png"
                            alt="Newsletter"
                            className="valuta-newsletter__icon-image"
                        />
                    </div>
                    <div className="valuta-newsletter__content">
                        <h2 className="valuta-newsletter__title">Non perdere l'occasione</h2>
                        <p className="valuta-newsletter__text">
                            Un nostro agente è pronto ad ascoltarti e guidarti passo dopo passo nella vendita.
                        </p>
                        <button className="valuta-newsletter__button">CONTATTACI</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
