import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isAdmin: () => {},
  isAgente: () => {},
  isCliente: () => {},
});

export default AuthContext;