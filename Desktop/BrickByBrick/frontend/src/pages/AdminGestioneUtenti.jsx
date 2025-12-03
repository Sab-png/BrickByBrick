/**
 * @fileoverview Pagina amministratore per gestione utenti e agenti.
 * Implementa navigazione a tab tra Agenti e Utenti.
 * 
 * @module pages/AdminGestioneUtenti
 * @requires react
 * @requires ../components/AdminAgenti
 * @requires ../components/AdminUtenti
 */

import React, { useState } from 'react';
// Importa i componenti delle pagine di gestione reali.
// Questi componenti (Agenti, UtentiAdmin) conterranno la TableManager e la logica CRUD.
import Agenti from '../components/AdminAgenti'; // Il componente che gestisce gli Agenti
import UtentiAdmin from '../components/AdminUtenti'; // Il componente che gestisce gli Utenti base

/**
 * Pagina Gestione Utenti (Admin)
 * 
 * Funzionalità:
 * - Navigazione a tab (Agenti / Utenti)
 * - Stato locale per tab attiva
 * - Renderizza AdminAgenti o AdminUtenti in base alla selezione
 * 
 * Tab disponibili:
 * - agents: Gestione agenti (CRUD completo)
 * - users: Gestione utenti clienti (solo visualizzazione/modifica/elimina)
 * 
 * @page
 * @returns {JSX.Element} Pagina con tab navigation
 * 
 * @example
 * // Route protetta admin
 * <Route path="/admin/utenti" element={<GestioneUtenti />} />
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