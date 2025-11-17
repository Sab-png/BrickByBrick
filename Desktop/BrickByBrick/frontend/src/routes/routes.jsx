import Layout from '../layout/Layout'

import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport'
import StepMultiForm from '../pages/StepMultiForm'
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
        path: 'support',
        Component: FAQSupport,
        showInNav: true,
        title: 'Supporto'

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
  },
  {
    path: 'valuta-immobile',
    Component: StepMultiForm,
    showInNav: false,
    title: 'Step Multi Form'
  }
]

export default routes;