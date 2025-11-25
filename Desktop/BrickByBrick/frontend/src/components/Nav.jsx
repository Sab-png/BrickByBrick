import { NavLink } from 'react-router-dom';
import routes from '../routes/routes';

export default function Navbar() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo */}
                <NavLink to="/" className="navbar__logo">
                    <img src="/LogoBrik.svg" alt="Immobiliaris Logo"  className="navbar__logo-image" />
                    <span className="navbar__logo-text">IMMOBILIARIS</span>
                </NavLink>

                {/* Hamburger Menu (Mobile) - Work In Progress*/}
                {/* <button 
                    className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button> */}

                {/* Navigation Links */}
                {/* ${isMenuOpen ? 'navbar__nav--open' : ''} */}
                <nav className={`navbar__nav`}>
                    {routes[0].children.map((el, index) =>
                        el.showInNav && (
                            <NavLink  key={el.path ?? index} to={el.path ?? '/'} className="navbar__link">
                                {el.title}
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Action Buttons */}
                <div className="navbar__actions">
                    {/* <button className="navbar__search-btn" aria-label="Search">
                        <i className="fas fa-search"></i>
                    </button> */}
                    <NavLink to="/accedi" className="navbar__login-btn">
                        Accedi
                    </NavLink>
                    <NavLink to="/registrati" className="navbar__register-btn">
                        Registrati
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}