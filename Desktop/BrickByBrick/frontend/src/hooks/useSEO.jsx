/**
 * @fileoverview Hook per gestione SEO e meta tag dinamici.
 * Aggiorna title, description, Open Graph e Twitter Card.
 * 
 * @module useSEO
 * @requires react
 * @requires react-router-dom
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook per SEO dinamico
 * 
 * Aggiorna automaticamente:
 * - Title tag
 * - Meta description
 * - Open Graph tags (og:title, og:description, og:image, og:url)
 * - Twitter Card tags
 * - Keywords
 * - Robots (index/noindex)
 * 
 * @hook
 * @param {Object} options - Configurazione SEO
 * @param {string} options.title - Titolo pagina (verrà suffissato con " - Immobiliaris")
 * @param {string} [options.description] - Descrizione meta tag
 * @param {string} [options.image] - URL immagine per Open Graph
 * @param {string} [options.imageAlt] - Alt text immagine
 * @param {string} [options.type='website'] - Tipo Open Graph (website/article)
 * @param {string} [options.keywords] - Keywords SEO
 * @param {boolean} [options.noindex=false] - Impedisce indicizzazione
 * 
 * @example
 * // In una pagina
 * useSEO({
 *   title: 'Chi Siamo',
 *   description: 'Scopri la storia di Immobiliaris',
 *   keywords: 'agenzia immobiliare, Torino, Piemonte'
 * });
 * 
 * @example
 * // Per pagina non indicizzabile
 * useSEO({
 *   title: 'Admin Panel',
 *   noindex: true
 * });
 */
export default function useSEO({
    title,
    description = 'Scopri il portale Immobiliaris: valutazioni, vendita e gestione di immobili in Piemonte e a Torino.',
    image = 'https://www.immobiliaris.it/images/og-default.jpg',
    imageAlt = 'Logo Immobiliaris',
    type = 'website',
    keywords = 'immobili, valutazione casa, vendita, Torino, Piemonte, agenzia immobiliare',
    noindex = false,
}) {
    
    const location = useLocation()

    useEffect(() => {
        const siteUrl = 'https://www.immobiliaris.it'
        const currentUrl = `${siteUrl}${location.pathname}`
        const defaultTitle = 'Immobiliaris - Valutazioni e Vendite Immobili'
        const fullTitle = title ? `${title} - Immobiliaris` : defaultTitle
        const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

        // Imposta il title
        document.title = fullTitle

        // Funzione helper per aggiornare/creare meta tag
        const setMeta = (name, content, isProperty = false) => {
            let element = document.querySelector(
                isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
            )
            if (!element) {
                element = document.createElement('meta')
                isProperty ? element.setAttribute('property', name) : element.setAttribute('name', name)
                document.head.appendChild(element)
            }
            element.setAttribute('content', content)
        }

        // Imposta i meta tag
        setMeta('description', description)
        setMeta('keywords', keywords)
        setMeta('robots', robotsContent)

        // Open Graph
        setMeta('og:title', fullTitle, true)
        setMeta('og:description', description, true)
        setMeta('og:url', currentUrl, true)
        setMeta('og:image', image, true)
        setMeta('og:image:alt', imageAlt, true)
        setMeta('og:type', type, true)

        // Twitter
        setMeta('twitter:title', fullTitle)
        setMeta('twitter:description', description)
        setMeta('twitter:image', image)
        setMeta('twitter:card', 'summary_large_image')

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.rel = 'canonical'
            document.head.appendChild(canonical)
        }
        canonical.href = currentUrl

    }, [title, description, image, imageAlt, type, keywords, noindex, location.pathname])
}