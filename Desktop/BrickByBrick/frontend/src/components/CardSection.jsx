

import React from 'react';
import Card from './Card';

import '../styles/components/_cardSection.scss'; 




export default function CardSection() {
    return (

        <section className="card-section"> 

            <h2 className="section-title">
                Come funziona
            </h2>

            <div className="cards-grid">
                <Card
                    image=""
                    subtitle="Valuta Online"
                    text="Ricevi la prima stima e l'analisi di mercato entro 72 ore."
                />
                <Card
                    image=""
                    subtitle="Proposta su misura"
                    text="Il nostro consulente ti contatta con la proposta di vendita in esclusiva e la strategia marketing dedicata."
                />
                <Card
                    image=""
                    subtitle="Vendi rapidamente"
                    text="Gestiamo noi tutte le trattative e le procedure legali per finalizzare la vendita al miglior prezzo."
                />

            </div>
        </section>
    );
}