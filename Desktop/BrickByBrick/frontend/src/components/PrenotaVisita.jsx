import React from 'react';
import CTAButton from '../components/CTAButton'; 

export default function PrenotaVisita() {
    return (
        <section className="prenota-visita-section">
            <div className="prenota-visita-section__container">
                <h2 className="prenota-visita-section__title">Vuoi parlare con un esperto della tua zona?</h2>
                <p className="prenota-visita-section__text">
                    Prenota un appuntamento gratuito con uno dei nostri agenti. 
                    Ti aiuterà a capire meglio il valore della tua casa e il percorso di vendita più adatto. 
                    In sede, online o telefonicamente, come preferisci.
                </p>
                
                <CTAButton 
                    content="PRENOTA ORA" 
                    ctaLink="/" 
                />
            </div>
        </section>
    );
}