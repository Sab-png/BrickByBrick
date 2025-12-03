/**
 * @fileoverview Sezione Mission e Valori con card dei principi aziendali.
 * Mostra territorialità, innovazione e affidabilità.
 * 
 * @module MissionSection
 * @requires ./Card
 */

import Card from './Card';

import iconAffidabilita from '../assets/images/svg/affidabilita.svg';
import iconInnovazione from '../assets/images/svg/innovazione.svg';
import iconTerritorialita from '../assets/images/svg/territorialita.svg';

export default function MissionSection() {
    return (
        <section className="card-section">
            <h2 className="card-section__title">Mission e Valori</h2>

            <div className="card-section__grid">
                <Card
                    image={iconTerritorialita}
                    subtitle="Territorialità"
                    text="Conoscenza profonda del mercato locale piemontese e delle sue dinamiche."
                />

                <Card
                    image={iconInnovazione}
                    subtitle="Innovazione"
                    text="Strumenti digitali che velocizzano la vendita senza perdere il rapporto umano."
                />
                <Card
                    image={iconAffidabilita}
                    subtitle="Affidabilità"
                    text="Dati, esperienza e chiarezza in ogni passaggio per garantire la tua sicurezza."
                />
            </div>
        </section>
    );
}