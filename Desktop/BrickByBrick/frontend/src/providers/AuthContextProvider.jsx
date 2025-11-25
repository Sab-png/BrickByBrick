import { useState, useContext, useEffect } from 'react';
import AuthContext from '../store/auth-context';

const LOCAL_STORAGE_KEY_USER = 'brickByBrickUser';
const LOCAL_STORAGE_KEY_TOKEN = 'brickByBrickToken';

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati di autenticazione:', error);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:8085/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenziali non valide');
      }

      const data = await response.json();

      // Estrai il token e le informazioni dell'utente
      const userData = {
        id: data.user?.id || data.accountId,
        email: data.user?.email,
        nome: data.user?.nome,
        cognome: data.user?.cognome,
        role: data.user?.role,
        telefono: data.user?.telefono,
        codice_fiscale: data.user?.codice_fiscale
      };

      const jwtToken = data.token;

      // Salva nel state
      setUser(userData);
      setToken(jwtToken);

      // Salva nel localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(userData));

      localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, jwtToken);

      return {
        success: true,
        user: userData,
        token: jwtToken
      };

    } catch (error) {
      console.error('Errore durante il login:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
  }

  function isAuthenticated() {
    return !!user && !!token;
  }

  function isAdmin() {
    return isAuthenticated() && user?.role === 'ADMIN';
  }

  function isAgente() {
    return isAuthenticated() && user?.role === 'AGENTE';
  }

  function isCliente() {
    return isAuthenticated() && user?.role === 'CLIENTE';
  }

  const contextValue = {
    user,
    token,
    isAuthenticated: isAuthenticated(),
    loading,
    login,
    logout,
    isAdmin,
    isAgente,
    isCliente
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthData deve essere usato dentro AuthContextProvider');
  }
  return context;
};