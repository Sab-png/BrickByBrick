import HeroSection from "../components/HeroSection"
import FAQSection from "../components/FAQSection"
import Questions from "../components/Questions"
import Newsletter from "../components/NewsLetter"

import supportoBgJpg from "../assets/images/jpg/hero-supporto.jpg";
import supportoBgWebP from "../assets/images/webp/hero-supporto.webp";
import supportoBgAvif from "../assets/images/avif/hero-supporto.avif";

export default function FAQSupport() {
    return (
        <>
        <HeroSection 
            title={"Supporto Immobiliaris: siamo qui per aiutarti a casa."}
            subtitle="Esplora le nostre FAQ o contattaci direttamente"
            showCTA={false}

            imageDesktop={supportoBgJpg}       // Fallback JPG
            imageDesktopWebP={supportoBgWebP}  // Versione WebP
            imageDesktopAvif={supportoBgAvif}  // Versione AVIF
            imageMobile={supportoBgWebP}       
            alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
        />    
        
        <FAQSection />

        <Questions/>

        <Newsletter/>
        </>
    )
}