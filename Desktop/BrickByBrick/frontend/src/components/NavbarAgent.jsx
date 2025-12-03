import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";


const navbarItems = [
    { 
        name: "Visite", 
        path: "/agente",
        end: true,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
        )
    },
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
                    {/* Logo */}
                    <div className="sidebar-logo">
                        <img src="/LogoBrik.svg" alt="BrickByBrick Logo" />
                    </div>
                    
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
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `nav-button ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <span className="nav-icon" aria-hidden="true">
                                        {item.icon}
                                    </span>
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
                        aria-label="Esci"
                    >
                        <span className="home-icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </span>
                        <span className="home-label">Esci</span>
                    </button>
                </footer>
            </div>
        </aside>
    );
};