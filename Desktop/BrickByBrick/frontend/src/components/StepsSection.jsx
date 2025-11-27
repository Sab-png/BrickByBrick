import StepItem from './StepItem';
import CTAButton from './CTAButton';

export default function StepsSection({ title, steps, ctaText, ctaLink }) {
    return (
        <section className="steps-section">
            <div className="steps-section__container">
                <h2 className="steps-section__title">{title}</h2>

                <ol className="steps-section__list">
                    {steps.map((step, index) => (
                        <StepItem
                            key={index}
                            number={index + 1}
                            // image={step.image}
                            imageAvif={step.imageAvif}
                            imageWebp={step.imageWebp}
                            imageJpg={step.imageJpg}
                            
                            title={step.title}
                            description={step.description}
                            alignRight={index === 1} // Allinea a destra solo il secondo step
                        />
                    ))}
                </ol>

                <div className="steps-section__cta">
                    <CTAButton ctaLink={ctaLink}/>
                </div>

            </div>
        </section>
    );
}