import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeatureSection"
import Newsletter from "../components/NewsLetter"
import CardSection from "../components/CardSection"

import heroBgJpg from "../assets/images/jpg/hero-homepage.jpg";
import heroBgWebP from "../assets/images/webp/hero-homepage.webp";
import heroBgAvif from "../assets/images/avif/hero-homepage.avif";

export default function Homepage() {
    return (
      <>

      <HeroSection 
          title={"Vendi la tua casa in Piemonte con un valore garantito e senza stress."}
          imageDesktop={heroBgJpg}       // Fallback JPG
          imageDesktopWebP={heroBgWebP}  // Versione WebP
          imageDesktopAvif={heroBgAvif}  // Versione AVIF
          imageMobile={heroBgWebP}       // Su mobile usiamo la WebP o un file specifico
          alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" // Descrizione SEO importante
      />

      <FeaturesSection/>

      <CardSection />

      <Newsletter />
      </>

    )
}