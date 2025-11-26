import Newsletter from "../components/NewsLetter"
import HeroSection from "../components/HeroSection"
import MissionSection from "../components/MissionSection"
import StorySection from "../components/StorySection"
import AgentsSection from "../components/AgentSection"

import aboutBgJpg from "../assets/images/jpg/hero-about.jpg";
import aboutBgWebP from "../assets/images/webp/hero-about.webp";
import aboutBgAvif from "../assets/images/avif/hero-about.avif";

export default function About() {
    return (
        <div className="about-page">
            <HeroSection 
                title={"Vendi la tua casa in Piemonte con un valore garantito e senza stress."}
                subtitle="Acquisiamo e vendiamo immobili in esclusiva con metodo digitale e competenza territoriale"
                showCTA={false}

                imageDesktop={aboutBgJpg}       // Fallback JPG
                imageDesktopWebP={aboutBgWebP}  // Versione WebP
                imageDesktopAvif={aboutBgAvif}  // Versione AVIF
                imageMobile={aboutBgWebP}       
                alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
            />            

            <StorySection />

            <MissionSection />

            <AgentsSection />

            <Newsletter />  
        </div>
    )
}