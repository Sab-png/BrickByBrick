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
  }
];

export default routes;