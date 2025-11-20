import HeroSection from '../components/HeroSection';
import VendiTech from '../components/VendiTech';
import Timeline from '../components/Timeline';
import PrenotaVisita from '../components/PrenotaVisita';
import Newsletter from '../components/NewsLetter';

export default function Vendi() {
    return (
            <>
            <HeroSection title={"Vendi la tua casa in modo chiaro, veloce e sicuro"} subtitle={"Con Immobiliaris hai un team locale, strumenti digitali avanzati e una valutazione reale in 72 ore."} bgImage={"/src/assets/images/hero-vendi.avif"}/>

            <VendiTech />

            <Timeline />

            <PrenotaVisita />

            <Newsletter />
            </>
    )
}
