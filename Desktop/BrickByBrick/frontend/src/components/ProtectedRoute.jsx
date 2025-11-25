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
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;