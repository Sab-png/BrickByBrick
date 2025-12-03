import storyImageAvif from '../assets/images/avif/story-image.avif';
import storyImageWebp from '../assets/images/webp/story-image.webp';
import storyImageJpg from '../assets/images/jpg/story-image.jpg'; 

export default function StorySection() {
    return (
        <section className="story-section">
            <div className="story-section__container">
                
                <div className="story-section__image-wrapper">
                    <picture>
                        <source srcSet={storyImageAvif} type="image/avif" />
                        <source srcSet={storyImageWebp} type="image/webp" />
                        <img src={storyImageJpg} alt="La nostra storia - Team al lavoro" className="story-section__image" width="800" height="800" loading="lazy" decoding='async' sizes="(max-width: 768px) 100vw, 400px"/>
                    </picture>
                </div>

                <div className="story-section__content">
                    <h2 className="story-section__title">La nostra storia</h2>
                    <div className="story-section__text">
                        <p>
                            Nata in Piemonte come realtà locale dentro il gruppo Indomus, Immobiliaris unisce radici sul territorio e strumenti digitali moderni.
                        </p>
                        <p>
                            Negli anni abbiamo trasformato il passaparola in processi misurabili, per offrire ai proprietari valutazioni rapide e trasparenti.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}