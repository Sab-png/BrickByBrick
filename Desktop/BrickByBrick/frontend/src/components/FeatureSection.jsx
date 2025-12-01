import FeatureItem from './FeatureItem';

import imageOneFeatItem from '../assets/images/svg/valutazione.svg';
import imageTwoFeatItem from '../assets/images/svg/efficenza.svg';
import imageThreeFeatItem from '../assets/images/svg/valore.svg';
import imageFourFeatItem from '../assets/images/svg/agenti.svg';

import imageFeatureAvif from '../assets/images/avif/perche-immobiliaris.avif'; 
import imageFeatureWebp from '../assets/images/webp/perche-immobiliaris.webp'; 
import imageFeatureJpg from '../assets/images/jpg/perche-immobiliaris.jpg';

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
                    <picture>
                        <source srcSet={imageFeatureAvif} type="image/avif" />
                        <source srcSet={imageFeatureWebp} type="image/webp" />
                        <img src={imageFeatureJpg} alt="Interior Design" className="features-section__main-image" loading="lazy" />
                    </picture>
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