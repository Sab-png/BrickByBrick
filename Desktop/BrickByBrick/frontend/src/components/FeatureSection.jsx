// FeaturesSection.jsx

import React from 'react';
import '../styles/components/_featuresSection.scss';




// Un componente interno per le singole feature rende il codice più pulito
const FeatureItem = ({ icon, title, description }) => (
    <div className="feature-item">
        <div className="feature-item__icon-wrapper">
            {/* Se l'icona è un SVG/PNG importato */}
            <img src={icon} alt={title} className="feature-item__icon" />
            
            {/* Se usi un font icon, puoi usare <i> al posto di <img> */}
            {/* <i className={`icon-class ${icon}`}></i> */}
        </div>
        <div className="feature-item__text-content">
            <h4 className="feature-item__title">{title}</h4>
            <p className="feature-item__description">{description}</p>
        </div>
    </div>
);


export default function FeaturesSection() {
    return (
        <section className="features-section">
            
            {/* Intestazione */}
            <h2 className="section-title">
                Perché Immobiliaris?
            </h2>
            <p className="section-subtitle">
                Ti offriamo la trasparenza e la velocità della tecnologia, unita alla profonda conoscenza del mercato locale e l'esperienza dei nostri agenti.
            </p>

            {/* Contenuto Principale: Immagine + Card di Punti */}
            <div className="features-section__content-wrapper">
                
                {/* LATO SINISTRO: Immagine */}
                <div className="features-section__image-container">
                    <img 
                        src="{talkingImage} "
                        alt="Due uomini d'affari che discutono"
                        className="features-section__main-image"
                    />
                </div>

                {/* LATO DESTRO: Lista delle Features (La Card Bianca) */}
                <div className="features-section__list-card">
                    
                    <FeatureItem
                        icon="{iconaValutazione}"
                        title="Valutazione garantita"
                        description="Certezza di ottenere una stima precisa della casa entro sole 72 ore."
                    />

                    <FeatureItem
                        icon="{iconaEfficienza}"
                        title="Efficienza"
                        description="Processo di vendita snello, veloce e senza stress."
                    />

                    <FeatureItem
                        icon="{iconaValore}"
                        title="Massimizzazione del valore"
                        description="Impegno nel raggiungere il prezzo di vendita più alto possibile."
                    />

                    <FeatureItem
                        icon="{iconaAgente}"
                        title="Agenti specializzati"
                        description="I migliori agenti, specializzati nella vendita di case in Piemonte."
                    />

                </div>

            </div>
        </section>
    );
}