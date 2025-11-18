import storyImage from '../assets/images/story-image.jpg'; 

export default function StorySection() {
    return (
        <section className="story-section">
            <div className="story-section__container">
                <div className="story-section__image-wrapper">
                    <img
                        src={storyImage}
                        alt="La nostra storia"
                        className="story-section__image"
                    />
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