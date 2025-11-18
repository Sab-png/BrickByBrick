export default function Vendi() {
    return (
        <div className="vendi-page">
            <div className="vendi-hero">
                <div className="vendi-hero__content">
                    <h1 className="vendi-hero__title">Vendi la tua casa in modo chiaro, veloce e sicuro</h1>
                    <p className="vendi-hero__subtitle">Con Immobiliaris hai un team locale, strumenti digitali avanzati e una valutazione reale in 72 ore.</p>
                    <button className="vendi-hero__button">RICHIEDI CONSULENZA GRATUITA</button>
                </div>
            </div>

            {/* Sezione Tecnologia e Competenza */}
            <section className="vendi-tech">
                <div className="vendi-tech__container">
                    <h2 className="vendi-tech__title">Tecnologia e competenza, insieme per una valutazione reale</h2>

                    <div className="vendi-tech__cards">
                        {/* Card 1 - Sinistra */}
                        <div className="vendi-tech__card-wrapper">
                            <div className="vendi-tech__card">
                                <div className="vendi-tech__card-content">
                                    <h3 className="vendi-tech__card-title">Stima automatica immediata</h3>
                                    <p className="vendi-tech__card-text">
                                        Il nostro algoritmo analizza dati di mercato aggiornati e ti fornisce subito una fascia di valore del tuo immobile.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connector verticale */}
                        <div className="vendi-tech__connector"></div>

                        {/* Card 2 - Destra */}
                        <div className="vendi-tech__card-wrapper vendi-tech__card-wrapper--right">
                            <div className="vendi-tech__card">
                                <div className="vendi-tech__card-content">
                                    <h3 className="vendi-tech__card-title">Verifica dell'agente locale</h3>
                                    <p className="vendi-tech__card-text">
                                        Ogni valutazione viene controllata da un agente della tua zona, che conosce dinamiche, quartieri e tendenze reali.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connector verticale */}
                        <div className="vendi-tech__connector"></div>

                        {/* Card 3 - Sinistra */}
                        <div className="vendi-tech__card-wrapper">
                            <div className="vendi-tech__card">
                                <div className="vendi-tech__card-content">
                                    <h3 className="vendi-tech__card-title">Trasparenza e tracciabilità</h3>
                                    <p className="vendi-tech__card-text">
                                        Ricevi un report completo, aggiornato online, con tutti i passaggi monitorabili.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sezione Dal clic al rogito */}
            <section className="vendi-process">
                <div className="vendi-process__container">
                    <h2 className="vendi-process__title">Dal clic al rogito</h2>
                    <p className="vendi-process__subtitle">
                        Abbiamo progettato un percorso semplice, digitale e completamente tracciabile.
                        Ogni fase è pensata per garantire trasparenza e fiducia, senza sorprese.
                    </p>

                    {/* Roadmap Cards */}
                    <div className="vendi-process__roadmap">
                        {/* Card 1 - Sinistra */}
                        <div className="vendi-process__step-wrapper">
                            <div className="vendi-process__step">
                                <div className="vendi-process__step-number">1</div>
                                <div className="vendi-process__step-content">
                                    <h3 className="vendi-process__step-title">Richiedi la valutazione</h3>
                                    <p className="vendi-process__step-text">
                                        Inserisci i dati del tuo immobile online: riceverai subito una stima automatica basata sui dati di mercato più recenti.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connector curvo da sinistra */}
                        <div className="vendi-process__connector vendi-process__connector--left"></div>

                        {/* Card 2 - Destra */}
                        <div className="vendi-process__step-wrapper vendi-process__step-wrapper--right">
                            <div className="vendi-process__step">
                                <div className="vendi-process__step-number">2</div>
                                <div className="vendi-process__step-content">
                                    <h3 className="vendi-process__step-title">Verifica dell'agente</h3>
                                    <p className="vendi-process__step-text">
                                        Entro 72 ore, un agente locale verifica e affina la valutazione, tenendo conto delle specificità della zona e dell'immobile.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connector curvo da destra */}
                        <div className="vendi-process__connector vendi-process__connector--right"></div>

                        {/* Card 3 - Sinistra */}
                        <div className="vendi-process__step-wrapper">
                            <div className="vendi-process__step">
                                <div className="vendi-process__step-number">3</div>
                                <div className="vendi-process__step-content">
                                    <h3 className="vendi-process__step-title">Pubblicazione e promozione</h3>
                                    <p className="vendi-process__step-text">
                                        Il tuo immobile viene pubblicato sui principali portali e promosso attraverso canali digitali mirati per raggiungere i potenziali acquirenti.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connector curvo da sinistra */}
                        <div className="vendi-process__connector vendi-process__connector--left"></div>

                        {/* Card 4 - Destra */}
                        <div className="vendi-process__step-wrapper vendi-process__step-wrapper--right">
                            <div className="vendi-process__step">
                                <div className="vendi-process__step-number">4</div>
                                <div className="vendi-process__step-content">
                                    <h3 className="vendi-process__step-title">Chiusura e rogito</h3>
                                    <p className="vendi-process__step-text">
                                        Ti accompagniamo fino al rogito, gestendo tutta la documentazione e assicurandoci che ogni fase sia trasparente e senza intoppi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sezione Esperto della zona */}
            <section className="vendi-expert">
                <div className="vendi-expert__container">
                    <h2 className="vendi-expert__title">Vuoi parlare con un esperto della tua zona?</h2>
                    <p className="vendi-expert__text">
                        <strong>Prenota un appuntamento gratuito con uno dei nostri agenti. Ti aiuterà a capire meglio il valore della tua casa e il percorso di vendita più adatto. In sede, online o telefonicamente, come preferisci.</strong>
                    </p>
                    <button className="vendi-expert__button">PRENOTA ORA</button>
                </div>
            </section>

            {/* Sezione Newsletter */}
            <section className="vendi-newsletter">
                <div className="vendi-newsletter__container">
                    <div className="vendi-newsletter__icon">
                        <img
                            src="/img/newsletter.png"
                            alt="Newsletter"
                            className="vendi-newsletter__icon-image"
                        />
                    </div>
                    <div className="vendi-newsletter__content">
                        <h2 className="vendi-newsletter__title">Non perdere l'occasione</h2>
                        <p className="vendi-newsletter__text">
                            Un nostro agente è pronto ad ascoltarti e guidarti passo dopo passo nella vendita.
                        </p>
                        <button className="vendi-newsletter__button">CONTATTACI</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
