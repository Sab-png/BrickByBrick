import React from 'react';

export default function Dashboard() {
    return (
        <div className="content-container">
            <h1>Dashboard</h1>
            <p>Benvenuto nel pannello di amministrazione</p>
            
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Statistiche</h3>
                    <p>Contenuto...</p>
                </div>
                
                <div className="dashboard-card">
                    <h3>Utenti</h3>
                    <p>Contenuto...</p>
                </div>
                
                <div className="dashboard-card">
                    <h3>Immobili</h3>
                    <p>Contenuto...</p>
                </div>
            </div>
        </div>
    )
}