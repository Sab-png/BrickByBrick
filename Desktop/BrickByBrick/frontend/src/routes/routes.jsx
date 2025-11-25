import Layout from '../layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

// Pages Pubbliche
import Homepage from '../pages/Homepage';
import About from '../pages/About';
import Immobili from '../pages/Immobili';
import DettaglioImmobile from '../pages/DettaglioImmobile';
import FAQSupport from '../pages/FAQSupport';
import Vendi from '../pages/Vendi';
import Valuta from '../pages/Valuta';
import Login from '../pages/Login';
import Registrati from '../pages/Registrati';
import NotFound from '../pages/NotFound';

// Pages Protette
import StepMultiForm from '../pages/StepMultiForm';
// import AdminDashboard from '../pages/AdminDashboard';
// import AgenteDashboard from '../pages/AgenteDashboard';

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
        showInNav: false,
        title: 'Dettaglio Immobile'
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
    // element: <ProtectedRoute Component={StepMultiForm} />,
    Component: StepMultiForm,
    title: 'Valuta Immobile'
  },
  // {
  //   path: 'dashboard',
  //   element: <ProtectedRoute Component={AdminDashboard} requiredRole="ADMIN" />,
  //   title: 'Admin Dashboard'
  // },

  // {
  //   path: 'dashboard/agente',
  //   element: <ProtectedRoute Component={AgenteDashboard} requiredRole="AGENTE" />,
  //   title: 'Agente Dashboard'
  // },
  {
    path: 'login',
    Component: Login,
    showInNav: false,
    title: 'Login'
  },
  {
    path: 'registrati',
    Component: Registrati,
    showInNav: false,
    title: 'Registrati'
  },
  {
    path: '*',
    Component: NotFound
  }
];

export default routes;