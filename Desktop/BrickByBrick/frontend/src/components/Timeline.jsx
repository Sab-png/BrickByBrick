/**
 * @fileoverview Timeline "Dal clic al rogito" con 4 step principali.
 * 
 * @module Timeline
 */

/**
 * Componente Timeline
 * 
 * Visualizza i 4 step del processo: valutazione, verifica agente, pubblicazione, rogito.
 * 
 * @component
 * @returns {JSX.Element} Sezione timeline con step
 * 
 * @example
 * <Timeline />
 */
export default function Timeline() {
    const steps = [
        { number: 1, title: "Richiedi la valutazione", text: "Inserisci i dati online e ricevi subito una stima automatica." },
        { number: 2, title: "Verifica dell'agente", text: "Entro 72 ore, un esperto affina la valutazione per la tua zona." },
        { number: 3, title: "Pubblicazione", text: "Il tuo immobile viene promosso sui migliori canali digitali." },
        { number: 4, title: "Rogito", text: "Ti accompagniamo fino alla firma gestendo tutta la burocrazia." }
    ];

    return (
        <section className="timeline">
            <div className="timeline__container">
                <h2 className="timeline__title">Dal clic al rogito</h2>
                <p className="timeline__subtitle">Un percorso semplice, tracciabile e senza sorprese.</p>

                <div className="timeline__timeline">
                    {steps.map((step, index) => (
                        <div key={index} className="timeline__step">
                            <div className="timeline__icon">{step.number}</div>
                            <h3 className="timeline__title-step">{step.title}</h3>
                            <p className="timeline__desc">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}