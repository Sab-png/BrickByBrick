import React, { useState } from 'react';
// Importa i componenti delle pagine di gestione reali.
// Questi componenti (Agenti, UtentiAdmin) conterranno la TableManager e la logica CRUD.
import Agenti from '../components/AdminAgenti'; // Il componente che gestisce gli Agenti
import UtentiAdmin from '../components/AdminUtenti'; // Il componente che gestisce gli Utenti base

/**
 * Componente Contenitore: GestioneUtenti
 * * RUOLO: Implementa la navigazione a schede (tabbed navigation) per passare 
 * tra la gestione degli Agenti e la gestione degli Utenti normali, mantenendo l'URL pulito.
 * Utilizza lo stato locale per determinare quale componente figlio (tab) deve essere mostrato.
 */
const GestioneUtenti = () => {
    
    // --- 1. STATO PER IL CONTROLLO DELLE TAB ---
    // 'activeTab' memorizza la chiave della scheda attualmente selezionata ('agents' o 'users').
    // 'agents' è impostato come valore di default per visualizzare subito gli Agenti all'avvio.
    const [activeTab, setActiveTab] = useState('agents');

    // --- 2. RENDERING ---
    return (
        <div className="user-management-page">
            <h1>Gestione Utenti</h1>

            {/* --- SEZIONE TASTI (IL TOGGLE / TAB NAVIGATION) --- */}
            <div className="admin-tabs">
                
                {/* Bottone per Gestione Agenti */}
                <button
                    onClick={() => setActiveTab('agents')} // Aggiorna lo stato per mostrare questa scheda
                    className={`admin-tab-button ${activeTab === 'agents' ? 'active' : ''}`}
                >
                    Gestione Agenti
                </button>

                {/* Bottone per Gestione Utenti */}
                <button
                    onClick={() => setActiveTab('users')} // Aggiorna lo stato per mostrare questa scheda
                    className={`admin-tab-button ${activeTab === 'users' ? 'active' : ''}`}
                >
                    Gestione Clienti
                </button>
            </div>

            {/* --- 3. RENDERING CONDIZIONALE DEL CONTENUTO --- */}
            <div className="admin-tab-content">
                {/* Se activeTab è 'agents', renderizza il componente Agenti */}
                {/* L'uso di '&&' (Short-circuit evaluation) assicura che solo il componente attivo venga montato. */}
                {activeTab === 'agents' && <Agenti/>}
                
                {/* Se activeTab è 'users', renderizza il componente UtentiAdmin */}
                {activeTab === 'users' && <UtentiAdmin />}
            </div>
        </div>
    );
};

export default GestioneUtenti;