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
import GestioneUtenti from '../pages/AdminGestioneUtenti'
import ImmobiliAdmin from '../pages/AdminImmobili'
import AgentForm from '../components/AdminAgentForm'
import ImmobileForm from '../components/AdminImmobileForm'
import AgendaAdmin from '../pages/AdminAgenda'
import AdminContratti from '../pages/AdminContratti'
import ContrattoForm from '../components/AdminContrattoForm'

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
        path: 'gestione-utenti/aggiungi-agente',
        Component: AgentForm,
        title: 'Aggiungi agente'
      },
      {
        path: 'gestione-utenti/modifica-agente/:id',
        Component: AgentForm,
        title: 'Modifica agente'
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
      {
        path: 'contratti',
        Component: AdminContratti,
        title: 'Contratti'
      },
      {
        path: 'contratti/modifica-contratto',
        Component: ContrattoForm,
        title: 'Modifica contratto'
      },
      {
        path: 'contratti/modifica-contratto/:id',
        Component: ContrattoForm,
        title: 'Modifica contratto'
      },
    ]
  }
]

export default routes;