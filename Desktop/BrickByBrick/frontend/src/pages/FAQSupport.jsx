/**
 * @fileoverview Pagina FAQ e supporto clienti.
 * Include hero, sezione FAQ con categorie e form contatti.
 * 
 * @module pages/FAQSupport
 * @requires ../components/HeroSection
 * @requires ../components/FAQSection
 * @requires ../components/Questions
 * @requires ../components/NewsLetter
 * @requires ../hooks/useSEO
 */

import HeroSection from "../components/HeroSection"
import FAQSection from "../components/FAQSection"
import Questions from "../components/Questions"
import Newsletter from "../components/NewsLetter"

import useSEO from "../hooks/useSEO"

import supportoBgJpg from "../assets/images/jpg/hero-supporto.jpg";
import supportoBgWebP from "../assets/images/webp/hero-supporto.webp";
import supportoBgAvif from "../assets/images/avif/hero-supporto.avif";

/**
 * Pagina FAQ e Supporto
 * 
 * Sezioni:
 * - Hero section con immagine supporto
 * - FAQ con categorie (Generali, Processo, Tecnologia, Legale)
 * - Form contatti per domande personalizzate
 * - Newsletter subscription
 * 
 * SEO: Ottimizzata per "faq immobiliare, documenti vendita casa"
 * 
 * @page
 * @returns {JSX.Element} Pagina FAQ completa
 * 
 * @example
 * // Route
 * <Route path="/faq" element={<FAQSupport />} />
 */
export default function FAQSupport() {

    useSEO({
        title: "FAQ e Supporto - Domande Frequenti",
        description: "Hai dubbi sulla compravendita immobiliare? Leggi le nostre risposte sulle valutazioni, i documenti necessari e le tempistiche di vendita.",
        keywords: "faq immobiliare, documenti vendita casa, tempistiche rogito, supporto clienti immobiliaris"
    })

    return (
        <>
        <HeroSection 
            title={"Supporto Immobiliaris: siamo qui per aiutarti a casa."}
            subtitle="Esplora le nostre FAQ o contattaci direttamente"
            showCTA={false}

            imageDesktop={supportoBgJpg}       // Fallback JPG
            imageDesktopWebP={supportoBgWebP}  // Versione WebP
            imageDesktopAvif={supportoBgAvif}  // Versione AVIF
            imageMobile={supportoBgWebP}       
            alt="Panorama di Torino con vista sulla Mole Antonelliana, sfondo per servizio valutazione immobiliare" 
        />    
        
        <FAQSection />

        <Questions/>

        <Newsletter/>
        </>
    )
}