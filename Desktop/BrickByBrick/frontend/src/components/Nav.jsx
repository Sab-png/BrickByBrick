import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes/routes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Blocca lo scroll
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

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
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen} type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 3. Navigation Menu  */}
        <div className={`navbar__nav ${isMenuOpen ? 'navbar__nav--open' : ''}`}>
          
          {/* Lista Link */}
          <div className="navbar__nav-links">
            {routes[0].children.map((el, index) =>
              el.showInNav && (
                <NavLink
                  key={el.path ?? index}
                  to={el.path ?? '/'}
                  className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {el.title}
                </NavLink>
              )
            )}
          </div>

          {/* Pulsanti Autenticazione - Mobile Only */}
          <div className="navbar__mobile-auth">
            <NavLink to="/accedi" className="navbar__link" onClick={closeMenu}>
              Accedi
            </NavLink>
            <NavLink to="/registrati" className="navbar__register-btn navbar__register-btn--mobile" onClick={closeMenu}>
              Registrati
            </NavLink>
          </div>
        </div>

        {/* 4. Pulsanti Autenticazione - Desktop Only */}
        <div className="navbar__desktop-actions">
          <NavLink to="/accedi" className="navbar__login-btn" onClick={closeMenu}>
            Accedi
          </NavLink>
          <NavLink to="/registrati" className="navbar__register-btn" onClick={closeMenu}>
            Registrati
          </NavLink>
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