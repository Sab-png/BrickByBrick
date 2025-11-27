import HeroSection from "../components/HeroSection"
import FAQSection from "../components/FAQSection"
import Questions from "../components/Questions"
import Newsletter from "../components/NewsLetter"

export default function FAQSupport() {
    return (
        <>
        <HeroSection title="Supporto Immobiliaris: siamo qui per aiutarti a casa." subtitle="Esplora le nostre FAQ o contattaci direttamente" showCTA={false} bgImage="/src/assets/images/hero-supporto.jpg"/>
        
        <FAQSection />

        <Questions/>

        <Newsletter/>
        </>
    )
}