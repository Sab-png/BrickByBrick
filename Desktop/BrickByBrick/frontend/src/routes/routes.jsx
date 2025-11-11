import Layout from '../layout/Layout'

import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import NotFound from '../pages/NotFound'
import ComeFunziona from '../pages/comefunziona'

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
        path: 'comefunziona',
        Component: ComeFunziona,
        showInNav: true,
        title: 'Come funziona'
      },
      {
        path: 'immobili',
        Component: Immobili,
        showInNav: true,
        title: 'Immobili'
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