import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <>
      {/* Meta tag globali */}
      <Helmet>
        {/* Meta tag di base */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Team Immobiliaris" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="it" />
        <link rel="canonical" href="https://www.immobiliaris.it" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Open Graph globali */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Immobiliaris" />
        <meta property="og:image" content="https://www.immobiliaris.it/images/og-default.jpg" />
        <meta property="og:image:alt" content="Logo Immobiliaris" />

        {/* Twitter card globale */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@immobiliaris" />
        <meta name="twitter:creator" content="@immobiliaris" />

        {/* Titolo di fallback */}
        <title>Immobiliaris - Valutazioni e Vendite Immobili</title>
        <meta
          name="description"
          content="Scopri il portale Immobiliaris: valutazioni, vendita e gestione di immobili in Piemonte e a Torino."
        />
      </Helmet>
      
      <Header />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}