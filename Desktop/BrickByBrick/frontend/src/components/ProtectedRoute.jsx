import { Navigate } from 'react-router-dom';
import { useAuthData } from '../providers/AuthContextProvider';

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
