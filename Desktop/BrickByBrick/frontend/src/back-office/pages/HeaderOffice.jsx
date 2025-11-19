import React, { useState } from 'react';
import '../../styles/components/_admin-header.scss'; // Assumo che il CSS sia qui

export const AdminHeader = ({ currentUser = { name: 'Utente', role: 'guest' }, messages = [] }) => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

    // 1. Calcoliamo i messaggi NON letti destinati all'utente corrente
    // (Assumiamo che se sono Admin vedo tutto, o filtro in base alla logica)
    const unreadMessages = messages.filter(msg => 
        msg.type === 'received' && !msg.isRead
    );
    
    const unreadCount = unreadMessages.length;

    const handleLogout = () => {
        console.log('Logout in corso per:', currentUser.name);
    };

    return (
        <header className="admin-header">
            <div className="admin-header-content">
                
                {/* --- LOGO --- */}
                <div className="admin-header-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 13l9-9 9 9M5 11v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="logo-text">IMMOBILIARIS</span>
                </div>

                <div className="admin-header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    {/* --- NOTIFICHE (Campanella) --- */}
                    <div className="notification-wrapper" style={{ position: 'relative' }}>
                        <button 
                            className="notification-button" 
                            aria-label="Notifiche"
                            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            
                            {/* Mostra il badge solo se ci sono messaggi non letti */}
                            {unreadCount > 0 && (
                                <span className="notification-badge" style={{
                                    position: 'absolute', top: '-5px', right: '-5px', 
                                    background: 'red', color: 'white', borderRadius: '50%', 
                                    fontSize: '10px', width: '18px', height: '18px', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Dropdown Anteprima Messaggi */}
                        {isNotifDropdownOpen && (
                            <div className="dropdown-menu notifications" style={{
                                position: 'absolute', top: '100%', right: 0, width: '300px',
                                background: 'white', border: '1px solid #ddd', borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, padding: '10px'
                            }}>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Notifiche ({unreadCount})</h4>
                                {unreadCount === 0 ? (
                                    <p style={{ fontSize: '12px', color: '#888' }}>Nessun nuovo messaggio.</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {unreadMessages.slice(0, 3).map(msg => (
                                            <li key={msg.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', fontSize: '12px' }}>
                                                <strong>{msg.agentName}</strong>
                                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {msg.subject}
                                                </div>
                                                <small style={{ color: '#999' }}>{msg.time}</small>
                                            </li>
                                        ))}
                                        {unreadCount > 3 && <li style={{ textAlign: 'center', fontSize: '12px', color: 'blue', marginTop: '5px' }}>Vedi tutti...</li>}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* --- USER SECTION (Dinamica) --- */}
                    <div className="admin-header-user" style={{ position: 'relative' }}>
                        <div className="greeting" style={{ marginRight: '10px', textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold' }}>{currentUser.name}</div>
                            {/* Mostra ruolo in maiuscolo e colore diverso se Admin */}
                            <div style={{ fontSize: '11px', color: currentUser.role === 'admin' ? '#d32f2f' : '#1976d2', textTransform: 'uppercase' }}>
                                {currentUser.role}
                            </div>
                        </div>
                        
                        <div className="user-dropdown">
                            <button 
                                className="user-button"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <div className="user-avatar">
                                    <img 
                                        src={currentUser.avatar || "/images/default-avatar.png"} 
                                        alt="Avatar"
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                </div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '5px' }}>
                                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>

                            {isUserDropdownOpen && (
                                <div className="dropdown-menu" style={{
                                    position: 'absolute', top: '100%', right: 0, width: '180px',
                                    background: 'white', border: '1px solid #ddd', borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, padding: '5px 0'
                                }}>
                                    <button className="dropdown-item" style={dropdownItemStyle}>👤 Profilo</button>
                                    <button className="dropdown-item" style={dropdownItemStyle}>⚙️ Impostazioni</button>
                                    <div className="dropdown-divider" style={{ borderTop: '1px solid #eee', margin: '5px 0' }}></div>
                                    <button className="dropdown-item logout" onClick={handleLogout} style={{ ...dropdownItemStyle, color: 'red' }}>🚪 Esci</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const dropdownItemStyle = {
    display: 'block', width: '100%', textAlign: 'left', padding: '10px 15px',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px'
};