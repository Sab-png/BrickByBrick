import HeroSection from '../components/HeroSection';
import Filters from '../components/Filters';
import ImmobiliResults from '../components/ImmobiliResults';
import Newsletter from '../components/NewsLetter';

import immobiliBgJpg from "../assets/images/jpg/hero-immobili.jpg";
import immobiliBgWebP from "../assets/images/webp/hero-immobili.webp";
import immobiliBgAvif from "../assets/images/avif/hero-immobili.avif";

export default function Immobili() {

  return (
    <>
      <HeroSection 
          title={"Trova la casa dei tuoi sogni!"}
          subtitle="Inizia ora la ricerca"
          showCTA={false}

          imageDesktop={immobiliBgJpg}       // Fallback JPG
          imageDesktopWebP={immobiliBgWebP}  // Versione WebP
          imageDesktopAvif={immobiliBgAvif}  // Versione AVIF
          imageMobile={immobiliBgWebP}       
          alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
      />    

      <Filters />

      <ImmobiliResults />

      <Newsletter />
    </>
  );
}