import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import Newsletter from "../components/NewsLetter"

import useSEO from '../hooks/useSEO';

// Step 1
import step1Avif from '../assets/images/avif/step-1.avif';
import step1Webp from '../assets/images/webp/step-1.webp';
import step1Jpg from '../assets/images/jpg/step-1.jpg'; 

// Step 2
import step2Avif from '../assets/images/avif/step-2.avif';
import step2Webp from '../assets/images/webp/step-2.webp';
import step2Jpg from '../assets/images/jpg/step-2.jpg';

// Step 3
import step3Avif from '../assets/images/avif/step-3.avif';
import step3Webp from '../assets/images/webp/step-3.webp';
import step3Jpg from '../assets/images/jpg/step-3.jpg';


import valutaBgJpg from "../assets/images/jpg/hero-valuta.jpg";
import valutaBgWebP from "../assets/images/webp/hero-valuta.webp";
import valutaBgAvif from "../assets/images/avif/hero-valuta.avif";

export default function Valuta() {
  
    const steps = [
        {
            image: step1Image,
            title: 'Compila il form passo dopo passo',
            description: 'Inserisci i dati dell\'immobile: tipologia, zona, superficie e servizi. Puoi completare il form in pochi minuti.'
        },
        {
            image: step2Image,
            title: 'Ricevi la stima di prezzo entro 72 ore',
            description: 'La nostra piattaforma elabora i dati e ti invia una valutazione preliminare via email in tempi rapidissimi.'
        },
        {
            image: step3Image,
            title: 'Valutazione e appuntamento con l\'esperto locale',
            description: 'Fissa l\'incontro per la verifica sul posto e ottieni la valutazione definitiva.'
        }
    ];

    return (
        <>
            <HeroSection 
                title={"Vuoi scoprire quanto vale la tua casa?"}
                subtitle="Inizia adesso la tua valutazione in 3 semplici passaggi."

                imageDesktop={valutaBgJpg}       // Fallback JPG
                imageDesktopWebP={valutaBgWebP}  // Versione WebP
                imageDesktopAvif={valutaBgAvif}  // Versione AVIF
                imageMobile={valutaBgWebP}       
                alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
            />        

            <StepsSection 
                title="Quali sono i passaggi?"
                steps={steps}
                ctaText="VALUTA IL TUO IMMOBILE"
                ctaLink="/valuta-immobile"
            />

            <Newsletter />
        </>
    );
}