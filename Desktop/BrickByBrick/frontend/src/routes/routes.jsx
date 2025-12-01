import Layout from '../layout/Layout'

// Pages pubbliche
import Homepage from '../pages/Homepage'
import About from '../pages/About'
import Immobili from '../pages/Immobili'
import DettaglioImmobile from '../pages/DettaglioImmobile'
import FAQSupport from '../pages/FAQSupport'
import Vendi from '../pages/Vendi'
import Valuta from '../pages/Valuta'
import NotFound from '../pages/NotFound'
import StepMultiForm from '../pages/StepMultiForm'

// Admin sections 
import AdminLayout from '../layout/AdminLayout'
import Statistiche from '../pages/AdminStatistiche'
import AdminAgenti from '../components/AdminAgenti'
import UtentiAdmin from '../components/AdminUtenti'
import ImmobiliAdmin from '../pages/AdminImmobili'
import AgentForm from '../components/AdminAgentForm'
import ImmobileForm from '../components/AdminImmobileForm'
import AgendaAdmin from '../pages/AdminAgenda'
import AdminContratti from '../components/AdminContratti'
import AdminContrattoForm from '../components/AdminContrattoForm'

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
        path: 'agenti',
        Component: AdminAgenti,
        title: 'Gestione Agenti'
      },
      {
        path: 'agenti/aggiungi-agente',
        Component: AgentForm,
        title: 'Aggiungi agente'
      },
      {
        path: 'agenti/modifica-agente/:id',
        Component: AgentForm,
        title: 'Modifica agente'
      },
      {
        path: 'utenti',
        Component: UtentiAdmin,
        title: 'Gestione Utenti'
      },
      {
        path: 'contratti',
        Component: AdminContratti,
        title: 'Gestione Contratti'
      },
      {
        path: 'contratti/nuovo',
        Component: AdminContrattoForm,
        title: 'Nuovo Contratto'
      },
      {
        path: 'contratti/modifica/:id',
        Component: AdminContrattoForm,
        title: 'Modifica Contratto'
      },
      {
        path: 'immobili',
        Component: ImmobiliAdmin,
        title: 'Immobili'
      },
      {
        path: 'immobili/aggiungi-immobile',
        Component: ImmobileForm,
        title: 'Aggiungi immobile'
      },
      {
        path: 'immobili/modifica-immobile/:id',
        Component: ImmobileForm,
        title: 'Modifica immobile'
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