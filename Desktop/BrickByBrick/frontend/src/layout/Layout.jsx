/**
 * @fileoverview Layout principale per pagine pubbliche.
 * Include Header, Footer e meta tags SEO.
 * 
 * @module Layout
 * @requires react-router-dom
 * @requires react-helmet-async
 * @requires ../components/Header
 * @requires ../components/Footer
 */

import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Componente Layout Pubblico
 * 
 * Struttura:
 * - Helmet con meta tags base (charset, viewport, favicon)
 * - Header con navigazione pubblica
 * - Main con Outlet per route figlie
 * - Footer con link e social
 * 
 * Pagine pubbliche che usano questo layout:
 * - / (home)
 * - /chi-siamo
 * - /immobili
 * - /immobili/:id
 * - /valuta-immobile
 * - /faq
 * - /contatti
 * - /login
 * - /register
 * 
 * @component
 * @returns {JSX.Element} Layout completo con header/footer
 * 
 * @example
 * // In routes
 * <Route element={<Layout />}>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/chi-siamo" element={<ChiSiamo />} />
 * </Route>
 */
export default function Layout() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Byta - Gruppo 2" />

        <link rel="icon" type="image/png" href="/LogoBrik.svg" />
        <link rel="apple-touch-icon" href="/LogoBrik.svg" />
      </Helmet>
      
      <Header />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}