// src/back-office/components/ImmobiliModalManager.jsx

import React from 'react';
// Importa il Form Modale effettivo che contiene l'interfaccia utente del form (i campi input).
import AdminImmobiliModal from './modals/AdminImmobiliModal'; 

/**
 * Componente Gestore del Modale Immobili (Manager). 🏠
 * * RUOLO: Agisce come un 'passacarte' o un wrapper. Il suo compito principale è gestire 
 * la logica di montaggio/smontaggio (rendering condizionale) del Form Modale, 
 * isolando questa logica dalla pagina principale (ImmobiliAdmin.jsx).
 * * * È un componente che appartiene al pattern di Design "Container/Presentational"
 * (dove questo è il Container) che gestisce la logica di visualizzazione.
 * * @param {boolean} isOpen - Determina se il Modal deve essere visualizzato.
 * @param {string | null} immobileId - L'ID dell'immobile, usato per la modalità 'edit'.
 * @param {function} onClose - Funzione per chiudere il Modal.
 * @param {function} onSave - Funzione per gestire il salvataggio dei dati del form.
 * @param {object | null} initialData - I dati preesistenti dell'immobile (se si modifica).
 */
const ImmobiliModalManager = ({ isOpen, immobileId, onClose, onSave, initialData }) => {
    
    // --- 1. RENDERING CONDIZIONALE ---
    // Se 'isOpen' è false (ovvero, il genitore ha deciso di chiudere il Modale), 
    // il componente non renderizza nulla, rimuovendosi dal DOM.
    if (!isOpen) return null;

    // --- 2. DELEGA DELLE PROPS ---
    // Se 'isOpen' è true, renderizza il Modale del Form (AdminImmobiliModal).
    return (
        <AdminImmobiliModal
            // Tutte le props ricevute dal componente genitore (ImmobiliAdmin.jsx) 
            // vengono re-indirizzate (passate) al Form Modale.
            isOpen={isOpen}
            immobileId={immobileId} 
            onClose={onClose}
            onSave={onSave}
            // Passa i dati iniziali, rinominando la prop per maggiore chiarezza nel componente figlio.
            initialImmobileData={initialData} 
        />
    );
};

export default ImmobiliModalManager;