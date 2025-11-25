// src/back-office/components/TableActions.jsx

import React from 'react';

/**
 * Componente Riutilizzabile per i Bottoni delle Azioni Massivi sulla Tabella.
 * * RUOLO: Agisce come componente 'presentational' (di presentazione). 
 * Riceve le funzioni di azione e lo stato di selezione dal genitore (p. es., Agenti.jsx o ImmobiliAdmin.jsx) 
 * e le mappa ai bottoni corrispondenti.
 * * VANTAGGIO: Questo componente può essere usato in QUALSIASI tabella amministrativa 
 * che richieda Aggiunta, Modifica e Rimozione di elementi.
 * * @param {string[]} selectedIds - Array degli ID degli elementi selezionati nella tabella.
 * @param {function} onAdd - Funzione da chiamare al click su "Aggiungi".
 * @param {function} onEdit - Funzione da chiamare al click su "Modifica".
 * @param {function} onRemove - Funzione da chiamare al click su "Rimuovi".
 */
const TableActions = ({ selectedIds, onAdd, onEdit, onRemove }) => (
    <>
        {/* BOTTONE AGGIUNGI */}
        {/* L'azione "Aggiungi" è sempre disponibile, quindi non è mai disabilitato. */}
        <button className="add-btn" onClick={onAdd}>
          ➕ Aggiungi
        </button>
        
        {/* BOTTONE MODIFICA */}
        <button 
            className="edit-btn" 
            // Chiama la funzione onEdit passando l'array degli ID selezionati.
            onClick={() => onEdit(selectedIds)}
            // LOGICA DI DISABILITAZIONE: Abilita il bottone SOLO se è selezionato ESATTAMENTE un elemento.
            disabled={selectedIds.length !== 1}
        >
          ✏️ Modifica
        </button>
        
        {/* BOTTONE RIMUOVI */}
        <button 
            className="remove-btn" 
            // Chiama la funzione onRemove passando l'array degli ID selezionati.
            onClick={() => onRemove(selectedIds)}
            // LOGICA DI DISABILITAZIONE: Abilita il bottone SOLO se è selezionato almeno un elemento (lunghezza > 0).
            disabled={selectedIds.length === 0} 
        >
          🗑️ Rimuovi
        </button>
    </>
);

export default TableActions;