import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import Newsletter from "../components/NewsLetter"

import step1Image from '../assets/images/img step 1.avif';
import step2Image from '../assets/images/img step 2.avif';
import step3Image from '../assets/images/img step 3.avif';

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
                title="Vuoi scoprire quanto vale la tua casa?"
                subtitle="Inizia adesso la tua valutazione in 3 semplici passaggi."
                bgImage="/src/assets/images/hero-valuta.avif"
            />

            <StepsSection 
                title="Quali sono i passaggi?"
                steps={steps}
                ctaText="VALUTA IL TUO IMMOBILE"
                ctaLink="/valuta"
            />

            <Newsletter />
        </>
    );
}