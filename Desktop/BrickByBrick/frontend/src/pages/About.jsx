export default function About() {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-hero__content">
                    <h1 className="about-hero__title">Esperti locali, risultati misurabili</h1>
                    <p className="about-hero__subtitle">Acquisiamo e vendiamo immobili in esclusiva con metodo digitale e competenza territoriale</p>
                </div>
            </div>

            <section className="about-story">
                <h2 className="about-story__title">La nostra storia</h2>
                <div className="about-story__container">
                    <div className="about-story__text-card">
                        <p>
                            Nata in Piemonte come realtà locale dentro il gruppo Indomus, Immobiliaris unisce radici sul territorio e strumenti digitali moderni.
                            Negli anni abbiamo trasformato il passaparola in processi misurabili, per offrire ai proprietari valutazioni rapide e trasparenti.
                        </p>
                    </div>
                    <div className="about-story__image-card">
                        <img
                            src="/img/krakenimages-Y5bvRlcCx8k-unsplash.jpg"
                            alt="La nostra storia"
                            className="about-story__image"
                        />
                    </div>
                </div>
            </section>

            <section className="about-mission">
                <h2 className="about-mission__title">Mission e Valori</h2>
                <div className="about-mission__grid">
                    <div className="about-mission__card">
                        <img
                            src="/img/conversation-businessman-customer.svg"
                            alt="Affidabilità"
                            className="about-mission__card-icon"
                        />
                        <h3 className="about-mission__card-title">Affidabilità</h3>
                        <p className="about-mission__card-text">
                            Dati, esperienza e chiarezza in ogni passaggio.
                        </p>
                    </div>
                    <div className="about-mission__card">
                        <img
                            src="/img/designer-giving-a-keynote.svg"
                            alt="Innovazione"
                            className="about-mission__card-icon"
                        />
                        <h3 className="about-mission__card-title">Innovazione</h3>
                        <p className="about-mission__card-text">
                            Strumenti digitali che velocizzano la vendita senza perdere il rapporto umano.
                        </p>
                    </div>
                    <div className="about-mission__card">
                        <img
                            src="/img/business-trip.svg"
                            alt="Territorialità"
                            className="about-mission__card-icon"
                        />
                        <h3 className="about-mission__card-title">Territorialità</h3>
                        <p className="about-mission__card-text">
                            Dati, esperienza e chiarezza in ogni passaggio.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-agents">
                <h2 className="about-agents__title">I nostri agenti</h2>
                <div className="about-agents__grid">
                    <div className="about-agents__card">
                        <img
                            src="/img/jeppe-monster-qIZNyuZe638-unsplash.jpg"
                            alt="Marco Rossi"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Marco Rossi</h3>
                        <p className="about-agents__card-location">Cuneo</p>
                    </div>
                    <div className="about-agents__card">
                        <img
                            src="/img/alex-starnes-PK_t0Lrh7MM-unsplash.jpg"
                            alt="Laura Bianchi"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Laura Bianchi</h3>
                        <p className="about-agents__card-location">Torino</p>
                    </div>
                    <div className="about-agents__card">
                        <img
                            src="/img/photo-1560250097-0b93528c311a.avif"
                            alt="Giuseppe Verdi"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Giuseppe Verdi</h3>
                        <p className="about-agents__card-location">Chieri</p>
                    </div>
                    <div className="about-agents__card">
                        <img
                            src="/img/clay-elliot-mpDV4xaFP8c-unsplash.jpg"
                            alt="Sofia Martini"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Sofia Martini</h3>
                        <p className="about-agents__card-location">Alba</p>
                    </div>
                    <div className="about-agents__card">
                        <img
                            src="/img/ernest-flowers-lrcTvNUrhUc-unsplash.jpg"
                            alt="Andrea Colombo"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Andrea Colombo</h3>
                        <p className="about-agents__card-location">Savigliano</p>
                    </div>
                    <div className="about-agents__card">
                        <img
                            src="/img/christina-wocintechchat-com-SJvDxw0azqw-unsplash.jpg"
                            alt="Giulia Romano"
                            className="about-agents__card-image"
                        />
                        <h3 className="about-agents__card-name">Giulia Romano</h3>
                        <p className="about-agents__card-location">Asti</p>
                    </div>
                </div>
            </section>

            <section className="about-newsletter">
                <div className="about-newsletter__container">
                    <div className="about-newsletter__icon">
                        <img
                            src="/img/newsletter.png"
                            alt="Newsletter"
                            className="about-newsletter__icon-image"
                        />
                    </div>
                    <div className="about-newsletter__content">
                        <h2 className="about-newsletter__title">Non perdere l'occasione</h2>
                        <p className="about-newsletter__text">
                            Un nostro agente è pronto ad ascoltarti e guidarti passo dopo passo nella vendita.
                        </p>
                        <button className="about-newsletter__button">CONTATTACI</button>
                    </div>
                </div>
            </section>
        </div>
    )
}