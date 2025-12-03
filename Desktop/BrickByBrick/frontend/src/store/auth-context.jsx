/**
 * @fileoverview Context React per gestione stato autenticazione globale.
 * Definisce la struttura dati e funzioni per auth.
 * 
 * @module auth-context
 * @requires react
 */

import { createContext } from 'react';

/**
 * Context Autenticazione
 * 
 * Stato globale per gestione autenticazione utente:
 * - Dati utente corrente
 * - Token JWT
 * - Stato autenticazione
 * - Funzioni login/logout
 * - Helper ruoli (isAdmin, isAgente, isCliente)
 * 
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - Oggetto utente (id, nome, cognome, email, ruolo, telefono)
 * @property {string|null} token - Token JWT per autenticazione API
 * @property {boolean} isAuthenticated - True se utente autenticato
 * @property {boolean} loading - True durante caricamento iniziale
 * @property {Function} login - Funzione login(email, password, remember) => Promise<{success, message, user, token}>
 * @property {Function} logout - Funzione logout() per pulizia sessione
 * @property {boolean} isAdmin - True se ruolo = 'ADMIN'
 * @property {boolean} isAgente - True se ruolo = 'AGENTE'
 * @property {boolean} isCliente - True se ruolo = 'CLIENTE'
 * 
 * @type {React.Context<AuthContextType>}
 * 
 * @example
 * // Uso del context
 * import { useContext } from 'react';
 * import AuthContext from '../store/auth-context';
 * 
 * const { user, isAuthenticated, login, logout } = useContext(AuthContext);
 * 
 * @example
 * // Con custom hook
 * import { useAuthData } from '../providers/AuthContextProvider';
 * const { user, isAdmin } = useAuthData();
 */
const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  isAdmin: false,
  isAgente: false,
  isCliente: false,
});

export default AuthContext;
