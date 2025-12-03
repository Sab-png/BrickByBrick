import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeatureSection"
import Newsletter from "../components/NewsLetter"
import CardSection from "../components/CardSection"

import useSEO from "../hooks/useSEO"

import heroBgJpg from "../assets/images/jpg/hero-homepage.jpg";
import heroBgWebP from "../assets/images/webp/hero-homepage.webp";
import heroBgAvif from "../assets/images/avif/hero-homepage.avif";

export default function Homepage() {

  useSEO({
    title: "Agenzia Immobiliare Torino e Piemonte",
    description: "Vendi la tua casa velocemente con Immobiliaris. Offriamo valutazioni immobiliari precise in 72 ore e un team di agenti esperti su tutto il territorio piemontese.",
    keywords: "agenzia immobiliare torino, valutazione casa piemonte, vendere casa velocemente, stima immobile gratuita, agenti immobiliari esperti",
    image: "https://www.immobiliaris.it/images/home-social-share.jpg",
    imageAlt: "Team Immobiliaris al lavoro a Torino",
    type: "website"
  })

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