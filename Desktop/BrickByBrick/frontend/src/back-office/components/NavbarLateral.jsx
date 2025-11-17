import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styles/components/_navbarlateral.scss';

const navbarItems = [
    { name: "statistiche", path: "/admin/statistiche" },
    { name: "utenti", path: "/admin/utenti" },
    { name: "immobili", path: "/admin/immobili" },
    { name: "agenda", path: "/admin/agenda" }
];

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGoToHome = () => {
        navigate('/');
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} aria-expanded={isOpen}>
            <div className="sidebar-inner">
                <header className="sidebar-header">
                    <button
                        type="button"
                        className="sidebar-toggle"
                        aria-label={isOpen ? 'Chiudi menu laterale' : 'Apri menu laterale'}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="toggle-icon">{isOpen ? '×' : '☰'}</span>
                    </button>
                </header>

                <nav className="sidebar-nav" aria-hidden={!isOpen}>
                    <ul>
                        {navbarItems.map((item) => (
                            <li key={item.name} className="nav-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `nav-button ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <span className="nav-icon" aria-hidden="true">○</span>
                                    <span className="nav-label">{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <footer className="sidebar-footer">
                    <button
                        type="button"
                        className="home-button"
                        onClick={handleGoToHome}
                        aria-label="Torna alla home"
                    >
                        <span className="home-icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </span>
                        <span className="home-label">Torna alla Home</span>
                    </button>
                </footer>
            </div>
        </aside>
    );
};