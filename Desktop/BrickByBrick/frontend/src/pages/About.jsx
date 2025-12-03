import Newsletter from "../components/NewsLetter"
import HeroSection from "../components/HeroSection"
import MissionSection from "../components/MissionSection"
import StorySection from "../components/StorySection"
import AgentsSection from "../components/AgentSection"

import useSEO from "../hooks/useSEO"

import aboutBgJpg from "../assets/images/jpg/hero-about.jpg";
import aboutBgWebP from "../assets/images/webp/hero-about.webp";
import aboutBgAvif from "../assets/images/avif/hero-about.avif";

export default function About() {

    useSEO({
        title: "Chi Siamo - La nostra storia e il team",
        description: "Immobiliaris nasce dall'esperienza del gruppo Indomus. Scopri il nostro team di agenti immobiliari esperti in Piemonte e la nostra missione.",
        keywords: "chi siamo immobiliaris, team agenzia immobiliare, storia immobiliaris, agenti immobiliari torino",
        image: "https://www.immobiliaris.it/images/team-about.jpg"
    })

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