/**
 * @fileoverview Pagina catalogo immobili con ricerca e filtri.
 * Include hero, filtri avanzati, risultati e mappa.
 * 
 * @module pages/Immobili
 * @requires ../components/HeroSection
 * @requires ../components/Filters
 * @requires ../components/ImmobiliResults
 * @requires ../components/NewsLetter
 * @requires ../hooks/useSEO
 */

import HeroSection from '../components/HeroSection';
import Filters from '../components/Filters';
import ImmobiliResults from '../components/ImmobiliResults';
import Newsletter from '../components/NewsLetter';

import useSEO from '../hooks/useSEO';

import immobiliBgJpg from "../assets/images/jpg/hero-immobili.jpg";
import immobiliBgWebP from "../assets/images/webp/hero-immobili.webp";
import immobiliBgAvif from "../assets/images/avif/hero-immobili.avif";

/**
 * Pagina Catalogo Immobili
 * 
 * Sezioni:
 * - Hero section "Trova la casa dei tuoi sogni"
 * - Filtri ricerca (SearchBar + AdvancedFilters tramite FiltersContext)
 * - Risultati immobili con card e mappa
 * - Newsletter subscription
 * 
 * Filtri disponibili:
 * - Città, tipologia, contratto
 * - Range prezzo e superficie
 * - Camere, bagni, piano
 * - Caratteristiche (balcone, box, arredato, ecc.)
 * 
 * SEO: Ottimizzata per "case in vendita torino, appartamenti piemonte"
 * 
 * @page
 * @returns {JSX.Element} Pagina immobili con filtri
 * 
 * @example
 * // Route
 * <Route path="/immobili" element={<Immobili />} />
 */
export default function Immobili() {

    useSEO({
    title: "Immobili in Vendita a Torino e Piemonte",
    description: "Sfoglia il nostro catalogo di case, appartamenti e ville in vendita. Trova la soluzione ideale per te tra centinaia di proposte immobiliari certificate.",
    keywords: "case in vendita torino, vendita appartamenti piemonte, annunci immobiliari, comprare casa, ville in vendita",
    image: "https://www.immobiliaris.it/images/catalogo-preview.jpg"
  })

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