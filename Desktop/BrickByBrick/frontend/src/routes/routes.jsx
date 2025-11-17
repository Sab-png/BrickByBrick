import Layout from '../layout/Layout'

import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport'
import NotFound from '../pages/NotFound'
import Valuta from '../pages/Valuta';

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Homepage,
        showInNav: true,
        title: 'Home'
      },
      // Nuove rotte
      {
        path: 'about',
        Component: About,
        showInNav: true,
        title: 'Chi Siamo'
      },
      {
        path: 'valuta',
        Component: Valuta,
        showInNav: true,
        title: 'Valuta'
      },
      {
        path: 'immobili',
        Component: Immobili,
        showInNav: true,
        title: 'Immobili'
      },
      {
        path: 'faq-support',
        Component: FAQSupport,
        showInNav: true,
        title: 'FAQ & Supporto'

      },
      {
        path: 'immobili/:id',
        Component: DettaglioImmobile,
        showInNav: false
      },

      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]

export default routes;