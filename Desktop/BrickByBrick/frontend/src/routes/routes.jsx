import { lazy, Suspense } from 'react';
import Layout from '../layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

// Componente di fallback per il loading - temporaneo
const Loading = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    Caricamento...
  </div>
);

import Homepage from '../pages/Homepage';

const About = lazy(() => import('../pages/About'));
const Immobili = lazy(() => import('../pages/Immobili'));
const DettaglioImmobile = lazy(() => import('../pages/DettaglioImmobile'));
const FAQSupport = lazy(() => import('../pages/FAQSupport'));
const Vendi = lazy(() => import('../pages/Vendi'));
const Valuta = lazy(() => import('../pages/Valuta'));
const Login = lazy(() => import('../pages/Login'));
const Registrati = lazy(() => import('../pages/Registrati'));
const NotFound = lazy(() => import('../pages/NotFound'));

const StepMultiForm = lazy(() => import('../pages/StepMultiForm'));

// Admin sections 
import AdminLayout from '../layout/AdminLayout';
import Statistiche from '../pages/AdminStatistiche';
import GestioneUtenti from '../pages/AdminGestioneUtenti';
import ImmobiliAdmin from '../pages/AdminImmobili';
import AgentForm from '../components/AdminAgentForm';
import ImmobileForm from '../components/AdminImmobileForm';
import AgendaAdmin from '../pages/AdminAgenda';

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => withSuspense(Homepage),
        showInNav: false,
        title: 'Home'
      },
      {
        path: 'about',
        Component: () => withSuspense(About),
        showInNav: true,
        title: 'Chi Siamo'
      },
      {
        path: 'valuta',
        Component: () => withSuspense(Valuta),
        showInNav: true,
        title: 'Valuta'
      },
      {
        path: 'immobili',
        Component: () => withSuspense(Immobili),
        showInNav: true,
        title: 'Immobili'
      },
      {
        path: 'support',
        Component: () => withSuspense(FAQSupport),
        showInNav: true,
        title: 'Supporto'
      },
      {
        path: 'immobili/:id',
        Component: () => withSuspense(DettaglioImmobile),
        showInNav: false,
        title: 'Dettaglio Immobile'
      },
      {
        path: 'vendi',
        Component: () => withSuspense(Vendi),
        showInNav: true,
        title: 'Vendi'
      },
    ]
  },
  {
    path: 'valuta-immobile',
    Component: () => withSuspense(StepMultiForm),
    title: 'Valuta Immobile'
  },
  // {
  //   path: 'dashboard',
  //   Component: () => withSuspense(() => <ProtectedRoute Component={AdminDashboard} requiredRole="ADMIN" />),
  //   title: 'Admin Dashboard'
  // },
  // {
  //   path: 'dashboard/agente',
  //   Component: () => withSuspense(() => <ProtectedRoute Component={AgenteDashboard} requiredRole="AGENTE" />),
  //   title: 'Agente Dashboard'
  // },
  {
    path: 'login',
    Component: () => withSuspense(Login),
    showInNav: false,
    title: 'Login'
  },
  {
    path: 'registrati',
    Component: () => withSuspense(Registrati),
    showInNav: false,
    title: 'Registrati'
  },
  {
    path: '*',
    Component: () => withSuspense(NotFound)
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
        Component: () => <AgentForm mode="add" />,
        title: 'Aggiungi agente'
      },
      {
        path: 'gestione-utenti/modifica-agente/:id',
        Component: () => <AgentForm mode="edit" />,
        title: 'Modifica agente'
      },
      {
        path: 'immobili',
        Component: ImmobiliAdmin,
        title: 'Immobili'
      },
      {
        path: 'immobili/aggiungi-immobile',
        Component: () => <ImmobileForm mode="add" />,
        title: 'Aggiungi immobile'
      },
      {
        path: 'immobili/modifica-immobile/:id',
        Component: () => <ImmobileForm mode="edit" />,
        title: 'Modifica immobile'
      },
      {
        path: 'agenda',
        Component: AgendaAdmin,
        title: 'Agenda'
      }
    ]
  }

];

export default routes;