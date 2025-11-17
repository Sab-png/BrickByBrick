import Layout from '../layout/Layout'

import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport'
import StepMultiForm from '../pages/StepMultiForm'
import NotFound from '../pages/NotFound'
import { Component } from 'react'
import Dashboard from '../back-office/pages/dashboard'

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
        path: 'step-multi-form',
        Component: StepMultiForm,
        showInNav: true,
        title: 'Step Multi Form'
      },
      {
        path: 'immobili/:id',
        Component: DettaglioImmobile,
        showInNav: false
      },
      {
        path: 'dashboard-admin',
        Component: Dashboard,
        showInNav: true,
        title: 'Dashboard Admin'

      },

      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]

export default routes;