// src/back-office/components/AgentModalManager.jsx

import React from 'react';
// Importa il componente del form effettivo che contiene l'interfaccia utente (UI)
import AgentFormModal from './AdminAgentFormModal';

/**
 * Componente Gestore del Modale Agenti (Manager).
 * * RUOLO STRUTTURALE: Questo componente è un wrapper minimalista. 
 * Il suo unico scopo è "gestire il montaggio" (rendering) del Modal.
 * Serve a mantenere pulito il componente genitore (Agenti.jsx) e a isolare 
 * il rendering condizionale del Modal.
 * * @param {boolean} isOpen - Stato che determina se il Modal deve essere visualizzato.
 * @param {string | null} agentId - ID dell'agente (per la modalità 'edit').
 * @param {function} onClose - Funzione di chiusura.
 * @param {function} onSave - Funzione di salvataggio.
 * @param {object | null} initialData - Dati iniziali dell'agente.
 */
const AgentModalManager = ({ isOpen, agentId, onClose, onSave, initialData }) => {
    
    // --- 1. RENDERING CONDIZIONALE ---
    // Se 'isOpen' è false, il componente ritorna null, smontando il Modal dal DOM.
    // Questo è il modo standard di React per controllare la visibilità.
    if (!isOpen) return null;

    // --- 2. DELEGA DELLE PROPS ---
    // Se 'isOpen' è true, renderizza il Modale effettivo (AgentFormModal).
    return (
        <AgentFormModal
            // Le props ricevute dal genitore (Agenti.jsx) vengono passate direttamente 
            // al Form Modale, che si occuperà poi della logica del form e del layout.
            isOpen={isOpen}
            agentId={agentId} 
            onClose={onClose}
            onSave={onSave}
            initialAgentData={initialData} // Nota: viene rinominato in 'initialAgentData' per chiarezza nel form.
        />
    );
};

export default AgentModalManager;