import { useState, useContext, useEffect, useMemo } from 'react';
import AuthContext from '../store/auth-context';

const LOCAL_STORAGE_KEY_USER = 'brickByBrickUser';
const LOCAL_STORAGE_KEY_TOKEN = 'brickByBrickToken';
const STORAGE_KEY_REMEMBER = 'brickByBrickRemember';

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carica i dati dal localStorage o sessionStorage all'avvio
  useEffect(() => {
    try {
      // controlla preferenza "remember"
      const remember = localStorage.getItem(STORAGE_KEY_REMEMBER) === 'true';
      const storage = remember ? localStorage : sessionStorage;

      const storedUser = storage.getItem(LOCAL_STORAGE_KEY_USER);
      const storedToken = storage.getItem(LOCAL_STORAGE_KEY_TOKEN);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei dati di autenticazione:', error);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      sessionStorage.removeItem(LOCAL_STORAGE_KEY_USER);
      sessionStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGIN: usa la shape restituita dal tuo backend
  async function login(email, password, remember = false) {
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
        // Leggi l'errore dal body se presente
        let errorData;
        try {
          errorData = await response.json();
        } catch (_) {
          throw new Error('Credenziali non valide');
        }
        throw new Error(errorData.message || 'Credenziali non valide');
      }

      const data = await response.json();

      // Il backend restituisce: accessToken, accessTokenExpiry, refreshToken, role, accountId, email
      const jwtToken = data.accessToken;
      const userData = {
        id: data.accountId,
        email: data.email,
        role: data.role,
        // altri campi non forniti dal backend: lasciamo vuoti o null
        nome: data.nome,
        cognome: data.cognome,
        telefono: data.telefono,
        codice_fiscale: data.codice_fiscale,
      };

      // salva state
      setUser(userData);
      setToken(jwtToken);

      // salva in storage a seconda di "remember"
      if (remember) {
        localStorage.setItem(STORAGE_KEY_REMEMBER, 'true');
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(userData));
        localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, jwtToken);
        // rimuovi eventuale sessionStorage
        sessionStorage.removeItem(LOCAL_STORAGE_KEY_USER);
        sessionStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      } else {
        localStorage.removeItem(STORAGE_KEY_REMEMBER);
        sessionStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(userData));
        sessionStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, jwtToken);
        // rimuovi eventuale localStorage token/user
        localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
      }

      return {
        success: true,
        user: userData,
        token: jwtToken
      };

    } catch (error) {
      console.error('Errore durante il login:', error);
      return {
        success: false,
        error: error.message || 'Errore durante il login'
      };
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_REMEMBER);
    sessionStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    sessionStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
  }

  const isAuthenticated = useMemo(() => {
    return !!user && !!token;
  }, [user, token]);

  const isAdmin = useMemo(() => isAuthenticated && user?.role === 'ADMIN', [isAuthenticated, user]);
  const isAgente = useMemo(() => isAuthenticated && user?.role === 'AGENTE', [isAuthenticated, user]);
  const isCliente = useMemo(() => isAuthenticated && (user?.role === 'CLIENTE' || user?.role === 'UTENTE' ), [isAuthenticated, user]);

  const contextValue = {
    user,
    token,
    isAuthenticated,
    loading,
    login: (email, password, remember = false) => login(email, password, remember),
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
  if (context === undefined) {
    throw new Error('useAuthData deve essere usato dentro AuthContextProvider');
  }
  return context;
};
