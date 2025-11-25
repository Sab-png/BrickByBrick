import FeatureItem from './FeatureItem';

import imageFeature from '../assets/images/perche-immobiliaris.jpg';

import imageOneFeatItem from '../assets/images/valutazione.svg';
import imageTwoFeatItem from '../assets/images/efficenza.svg';
import imageThreeFeatItem from '../assets/images/valore.svg';
import imageFourFeatItem from '../assets/images/agenti.svg';

export default function FeaturesSection() {
    return (
        <section className="features-section">
            
            <div className="features-section__header">
                <h2 className="features-section__title">
                    Perché Immobiliaris?
                </h2>
                <p className="features-section__subtitle">
                    Ti offriamo la trasparenza e la velocità della tecnologia, unita alla profonda conoscenza del mercato locale e l'esperienza dei nostri agenti.
                </p>
            </div>

            <div className="features-section__content-wrapper">
                
                <div className="features-section__image-container">
                    <img 
                        src={imageFeature}
                        alt="Due uomini d'affari che discutono"
                        className="features-section__main-image"
                    />
                </div>

                <div className="features-section__list-card">
                    
                    <FeatureItem
                        icon={imageOneFeatItem}
                        title="Valutazione garantita"
                        description="Certezza di ottenere una stima precisa della casa entro sole 72 ore."
                    />

                    <FeatureItem
                        icon={imageTwoFeatItem}
                        title="Efficienza"
                        description="Processo di vendita snello, veloce e senza stress."
                    />

                    <FeatureItem
                        icon={imageThreeFeatItem}
                        title="Massimizzazione del valore"
                        description="Impegno nel raggiungere il prezzo di vendita più alto possibile."
                    />

                    <FeatureItem
                        icon={imageFourFeatItem}
                        title="Agenti specializzati"
                        description="I migliori agenti, specializzati nella vendita di case in Piemonte."
                    />

                </div>

            </div>
        </section>
    );
}