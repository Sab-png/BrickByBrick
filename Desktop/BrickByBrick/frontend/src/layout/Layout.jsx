import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Header from '../components/Header'
import Footer from '../components/Footer'

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