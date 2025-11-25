import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthData } from '../providers/AuthContextProvider';
import routes from '../routes/routes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isAgente, loading } = useAuthData();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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

  const handleDashboardClick = () => {
    if (isAdmin()) {
      navigate('/dashboard');
    } else if (isAgente()) {
      navigate('/dashboard/agente');
    }
    closeMenu();
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* 1. Logo + Testo */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/LogoBrik.svg" alt="Immobiliaris Logo" className="navbar__logo-image" />
          <span className="navbar__logo-text">IMMOBILIARIS</span>
        </NavLink>

        {/* 2. Hamburger Menu - Mobile  */}
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

        {/* 3. Navigation Menu  */}
        <div className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          
          {/* Lista Link */}
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
          </div>

          {/* Dashboard Link - Mobile Only (per Admin e Agenti) */}
          {(isAdmin() || isAgente()) && (
            <button
              className="navbar__link navbar__link--dashboard"
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          )}

          {/* Sezione Autenticazione Mobile */}
          {!isAuthenticated ? (
            <div className="navbar__mobile-auth">
              <NavLink to="/login" className="navbar__link" onClick={closeMenu}>
                Accedi
              </NavLink>
              <NavLink to="/registrati" className="navbar__register-btn navbar__register-btn--mobile" onClick={closeMenu}>
                Registrati
              </NavLink>
            </div>
          ) : (
            <div className="navbar__mobile-auth">
              <div className="navbar__user-info-mobile">
                <span className="navbar__user-name">{user?.nome} {user?.cognome}</span>
                <span className="navbar__user-role">
                  {user?.role === 'ADMIN' && 'Amministratore'}
                  {user?.role === 'AGENTE' && 'Agente'}
                  {user?.role === 'CLIENTE' && 'Cliente'}
                </span>
              </div>
              <button
                className="navbar__logout-btn navbar__logout-btn--mobile"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* 4. Pulsanti Autenticazione - Desktop Only */}
        <div className="navbar__desktop-actions">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="navbar__login-btn" onClick={closeMenu}>
                Accedi
              </NavLink>
              <NavLink to="/registrati" className="navbar__register-btn" onClick={closeMenu}>
                Registrati
              </NavLink>
            </>
          ) : (
            <>
              {/* Dashboard Link - Desktop (per Admin e Agenti) */}
              {(isAdmin() || isAgente()) && (
                <button
                  className="navbar__dashboard-btn"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
              )}
              
              {/* Profilo Utente Desktop */}
              <div className="navbar__user-profile">
                <span className="navbar__user-name">{user?.nome}</span>
                <span className="navbar__user-role">
                  {user?.role === 'ADMIN' && 'Admin'}
                  {user?.role === 'AGENTE' && 'Agente'}
                  {user?.role === 'CLIENTE' && 'Cliente'}
                </span>
              </div>

              {/* Logout Button */}
              <button
                className="navbar__logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
      
      {/* Overlay scuro per chiudere cliccando fuori */}
      <div 
        className={`navbar__menu-overlay ${isMenuOpen ? 'navbar__menu-overlay--visible' : ''}`}
        onClick={closeMenu}
      ></div>
    </nav>
  );
}