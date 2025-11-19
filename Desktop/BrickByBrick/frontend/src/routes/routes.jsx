import Layout from '../layout/Layout'
import AdminLayout from '../back-office/layout/AdminLayout' // Nuovo layout per admin

// Pages pubbliche
import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport'
import StepMultiForm from '../pages/StepMultiForm'
import NotFound from '../pages/NotFound'

// Pages back-office
import Dashboard from '../back-office/pages/Dashboard'
import Statistiche from '../back-office/pages/AdminStatistica'
import GestionePiattaforma from '../back-office/pages/AdminGestioneUtenti'
import AddAgentPage from '../back-office/pages/AddAgent'
import ImmobiliAdmin from '../back-office/pages/AdminImmobili'
import Agenda from '../back-office/pages/AdminAgenda'

import { Component } from 'react'

const routes = [
  // Rotte pubbliche
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
        path: 'immobili/:id',
        Component: DettaglioImmobile,
        showInNav: false
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
        path: '*',
        Component: NotFound
      }
    ]
  },
  // Rotte back-office
  {
    path: '/admin',
    Component: AdminLayout, // Layout con la SideBar
    children: [
      {
        index: true,
        Component: Dashboard, // O redirect a statistiche
      },
      {
        path: 'statistiche',
        Component: Statistiche,
        title: 'Statistiche'
      },
      {
        path: 'gestione-utenti',
        Component: GestionePiattaforma,
        title: 'Gestione Utenti'
      },
 {
        path: 'gestione-utenti/aggiungi-agente',
        Component: AddAgentPage,
        title: 'Aggiungi agente'
      },
      {
        path: 'immobili',
        Component: ImmobiliAdmin,
        title: 'Immobili'
      },
      {
        path: 'agenda',
        Component: Agenda,
        title: 'Agenda'
      }
    ]
  }
]

export default routes;