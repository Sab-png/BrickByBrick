import { createContext } from 'react';

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
