import HeroSection from '../components/HeroSection';
import VendiTech from '../components/VendiTech';
import Timeline from '../components/Timeline';
import PrenotaVisita from '../components/PrenotaVisita';
import Newsletter from '../components/NewsLetter';

import useSEO from '../hooks/useSEO';

import vendiBgJpg from "../assets/images/jpg/hero-vendi.jpg";
import vendiBgWebP from "../assets/images/webp/hero-vendi.webp";
import vendiBgAvif from "../assets/images/avif/hero-vendi.avif";

export default function Vendi() {

    useSEO({
        title: "Vendi Casa Velocemente e al Miglior Prezzo",
        description: "Affida la vendita del tuo immobile a Immobiliaris. Strategie di marketing digitale, foto professionali e zero stress burocratico per vendere casa.",
        keywords: "vendere casa torino, servizi vendita immobiliare, agenzia per vendere casa, provvigioni agenzia"
    })

    return (
            <>

            <HeroSection 
                title={"Vendi la tua casa in modo chiaro, veloce e sicuro"}
                subtitle="Con Immobiliaris hai un team locale, strumenti digitali avanzati e una valutazione reale in 72 ore."
                // Passiamo i file importati ai rispettivi props
                imageDesktop={vendiBgJpg}       // Fallback JPG
                imageDesktopWebP={vendiBgWebP}  // Versione WebP
                imageDesktopAvif={vendiBgAvif}  // Versione AVIF
                imageMobile={vendiBgWebP}       
                alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
            />

            <VendiTech />

            <Timeline />

            <PrenotaVisita />

            <Newsletter />
            </>
    )
}
