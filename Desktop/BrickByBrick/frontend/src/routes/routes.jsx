import Layout from '../layout/Layout'

import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport';
import Vendi from '../pages/Vendi';
import Valuta from '../pages/Valuta';
import NotFound from '../pages/NotFound'
import StepMultiForm from '../pages/StepMultiForm';



// Admin sections 
import AdminLayout from '../layout/AdminLayout';
import Statistiche from '../pages/AdminStatistiche';
import GestioneUtenti from '../pages/AdminGestioneUtenti';
import ImmobiliAdmin from '../pages/AdminImmobili';
import AgendaAdmin from '../pages/AdminAgenda';

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Homepage,
        showInNav: false,
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
        path: 'vendi',
        Component: Vendi,
        showInNav: true,
        title: 'Vendi'
      },
    ]
  },
  {
    path: 'valuta-immobile',
    Component: StepMultiForm,
    showInNav: false,
    title: 'Step Multi Form'
  },
  {
    path: '*',
    Component: NotFound
  },
  {
    path: '/admin',
    Component: AdminLayout, // Layout con la SideBar
    children: [
      
      {
        index: true,
        // path: 'statistiche',
        Component: Statistiche,
        title: 'Statistiche'
      },
      {
        path: 'gestione-utenti',
        Component: GestioneUtenti,
        title: 'Gestione Utenti'
      },
      {
        path: 'immobili',
        Component: ImmobiliAdmin,
        title: 'Immobili'
      },
      {
        path: 'agenda',
        Component: AgendaAdmin,
        title: 'Agenda'
      },
    ]
  }
]

export default routes;