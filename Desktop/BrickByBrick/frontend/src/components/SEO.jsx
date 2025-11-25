import { Helmet } from 'react-helmet'

export default function SEO({
  // fallback values
  title = 'Valutazioni e Vendite Immobili',
  description = 'Scopri il portale Immobiliaris: valutazioni, vendita e gestione di immobili in Piemonte e a Torino.',
  url = 'https://www.immobiliaris.it',
  image = 'https://www.immobiliaris.it/images/og-default.jpg',
  imageAlt = 'Logo Immobiliaris',
  type = 'website',
  keywords = 'immobili, valutazione casa, vendita, Torino, Piemonte, agenzia immobiliare',
  twitterCard = 'summary_large_image'
}) {
  const fullTitle = `${title} - Immobiliaris`
  
  return (
    <Helmet>
      {/* Meta tag base specifici della pagina */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph specifici della pagina */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:type" content={type} />

      {/* Twitter Card specifici della pagina */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  )
}