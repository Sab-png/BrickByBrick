/**
 * @fileoverview Componente per protezione route basato su autenticazione e ruolo.
 * Gestisce redirect per utenti non autenticati o senza permessi.
 * 
 * @module ProtectedRoute
 * @requires react-router-dom
 * @requires ../providers/AuthContextProvider
 */

import { Navigate } from 'react-router-dom';
import { useAuthData } from '../providers/AuthContextProvider';

/**
 * Componente per Route Protette
 * 
 * Logica di protezione:
 * 1. Se loading -> mostra caricamento
 * 2. Se non autenticato -> redirect a /login
 * 3. Se ruolo richiesto non corrisponde -> redirect a /
 * 4. Altrimenti -> renderizza il componente
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {React.ComponentType} props.Component - Componente da renderizzare se autorizzato
 * @param {string|null} [props.requiredRole=null] - Ruolo richiesto (es: 'ADMIN', 'AGENTE', 'CLIENTE')
 * @returns {JSX.Element} Componente protetto o redirect
 * 
 * @example
 * // Protezione solo autenticazione
 * <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
 * 
 * @example
 * // Protezione con ruolo specifico
 * <Route path="/admin" element={<ProtectedRoute Component={AdminPanel} requiredRole="ADMIN" />} />
 */
const ProtectedRoute = ({ Component, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuthData();

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // se l'utente è autenticato ma non ha il ruolo richiesto -> home
    return <Navigate to="/" replace />;
  }

  // Component può essere un layout o una pagina; restituiscilo così com'è
  return <Component />;
};

export default ProtectedRoute;
