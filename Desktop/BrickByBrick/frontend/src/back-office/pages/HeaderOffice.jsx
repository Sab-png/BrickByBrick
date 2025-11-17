import { useState } from 'react';
import '../../styles/components/_admin-header.scss';

export const AdminHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userName = "Mario"; // Sostituisci con dato dinamico

    const handleLogout = () => {
        // Logica di logout
        console.log('Logout...');
    };

    return (
        <header className="admin-header">
            <div className="admin-header-content">
                {/* Logo */}
                <div className="admin-header-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 13l9-9 9 9M5 11v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="logo-text">IMMOBILIARIS</span>
                </div>

                {/* User Section */}
                <div className="admin-header-user">
                    <span className="greeting">Ciao, {userName}!</span>
                    
                    <div className="user-dropdown">
                        <button 
                            className="user-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <div className="user-avatar">
                                <img 
                                    src="/images/default-avatar.png" 
                                    alt="Avatar utente"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="avatar-fallback" style={{ display: 'none' }}>
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <span className="user-role">Admin</span>
                            <svg 
                                className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none"
                            >
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={() => console.log('Profilo')}>
                                    <span>👤</span> Il mio profilo
                                </button>
                                <button className="dropdown-item" onClick={() => console.log('Impostazioni')}>
                                    <span>⚙️</span> Impostazioni
                                </button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout" onClick={handleLogout}>
                                    <span>🚪</span> Esci
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Notifiche */}
                    <button className="notification-button" aria-label="Notifiche">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2a6 6 0 016 6v3.586l1.707 1.707A1 1 0 0117 15H3a1 1 0 01-.707-1.707L4 11.586V8a6 6 0 016-6zm0 16a2 2 0 01-2-2h4a2 2 0 01-2 2z" fill="currentColor"/>
                        </svg>
                        <span className="notification-badge">3</span>
                    </button>
                </div>
            </div>
        </header>
    );
};