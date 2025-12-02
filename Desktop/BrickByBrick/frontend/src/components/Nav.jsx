import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthData } from '../providers/AuthContextProvider';
import routes from '../routes/routes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isAgente, loading } = useAuthData();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  // Determina il percorso della dashboard
  const dashboardPath = isAdmin ? '/admin' : isAgente ? '/agente' : null;
  const showDashboard = isAdmin || isAgente;

  if (loading) {
    return null; 
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* 1. Logo */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/LogoBrik.svg" alt="Immobiliaris Logo" className="navbar__logo-image" />
          <span className="navbar__logo-text">IMMOBILIARIS</span>
        </NavLink>

        {/* 2. Hamburger Menu (Mobile) */}
        <button
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 3. Navigation Menu (Unificato) */}
        <div className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          
          {/* A. Link di Navigazione Standard */}
          <div className="navbar__nav-links">
            {routes[0].children
              .filter(el => el.showInNav && el.path !== 'login' && el.path !== 'registrati')
              .map((el, index) => (
                <NavLink
                  key={el.path ?? index}
                  to={el.path ?? '/'}
                  className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {el.title}
                </NavLink>
              ))
            }

            {/* B. Dashboard Link (Inserito nel flusso dei link) */}
            {showDashboard && (
              <NavLink
                to={dashboardPath}
                className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* C. Azioni Utente (Auth / Logout / Profilo) */}
          <div className="navbar__actions">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="navbar__link" onClick={closeMenu}>
                  Accedi
                </NavLink>
                <NavLink to="/registrati" className="navbar__register-btn" onClick={closeMenu}>
                  Registrati
                </NavLink>
              </>
            ) : (
              <>
                <div className="navbar__user-info">
                  <span className="navbar__user-name">
                    {user?.nome} {isMenuOpen ? user?.cognome : ''}
                  </span>
                  <span className="navbar__user-role-badge">
                    {user?.role === 'ADMIN' ? 'Admin' : user?.role === 'AGENTE' ? 'Agente' : ''}
                  </span>
                </div>
                
                <button
                  className="navbar__logout-btn"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay scuro */}
      <div 
        className={`navbar__menu-overlay ${isMenuOpen ? 'navbar__menu-overlay--visible' : ''}`}
        onClick={closeMenu}
      ></div>
    </nav>
  );
}