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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestione Utenti</h1>

            {/* --- SEZIONE TASTI (IL TOGGLE / TAB NAVIGATION) --- */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                
                {/* Bottone per Gestione Agenti */}
                <button
                    onClick={() => setActiveTab('agents')} // Aggiorna lo stato per mostrare questa scheda
                    className={`pb-2 px-4 font-medium ${
                        // Logica CSS Condizionale (Tailwind CSS)
                        activeTab === 'agents' 
                            // Se la scheda è attiva
                            ? 'border-b-2 border-blue-500 text-blue-600' 
                            // Se la scheda non è attiva
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Gestione Agenti
                </button>

                {/* Bottone per Gestione Utenti */}
                <button
                    onClick={() => setActiveTab('users')} // Aggiorna lo stato per mostrare questa scheda
                    className={`pb-2 px-4 font-medium ${
                        // Logica CSS Condizionale (Tailwind CSS)
                        activeTab === 'users' 
                            // Se la scheda è attiva
                            ? 'border-b-2 border-blue-500 text-blue-600' 
                            // Se la scheda non è attiva
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Gestione Utenti
                </button>
            </div>

            {/* --- 3. RENDERING CONDIZIONALE DEL CONTENUTO --- */}
            <div className="bg-white shadow rounded-lg p-4">
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