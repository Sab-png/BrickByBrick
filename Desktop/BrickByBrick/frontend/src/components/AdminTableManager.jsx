// src/back-office/components/AdminTableManager.jsx

import React, { useEffect } from 'react';
// Importa il Custom Hook che contiene tutta la logica di stato e manipolazione dei dati.
import useTableData from '../hooks/useTable'; 

/**
 * Componente Manager Universale per la Visualizzazione e l'Interazione con la Tabella.
 * * RUOLO: Contenitore e Presentatore dei dati.
 * 1. Estrae lo stato e le funzioni dal Custom Hook (useTableData).
 * 2. Riceve la configurazione (colonne, chiavi di ricerca) dalle pagine (Agenti/Immobili).
 * 3. Renderizza la tabella, l'input di ricerca e l'area delle azioni.
 * * @param {string} title - Titolo della tabella (e.g., "Gestione Agenti").
 * @param {object[]} initialData - I dati iniziali non filtrati (p.es., mockImmobili).
 * @param {object[]} columns - Array di oggetti per definire le colonne (header e key).
 * @param {string[]} searchKeys - Chiavi dell'oggetto su cui eseguire la ricerca.
 * @param {function} renderActions - Funzione render props che restituisce i bottoni di azione.
 */
const AdminTableManager = ({ title, initialData, columns, searchKeys, renderActions }) => {
    
    // --- 1. ESTRAZIONE STATO E FUNZIONI DAL HOOK ---
    // Questo è il punto chiave: tutte le funzionalità (dati, selezione, ricerca, rimozione)
    // sono gestite esternamente dal Custom Hook, mantenendo il componente 'pulito'.
    const { 
        displayedData,  // Dati attuali (filtrati o completi) da visualizzare
        searchTerm,     // Valore attuale dell'input di ricerca
        setSearchTerm,  // Funzione per aggiornare il termine di ricerca
        selectedIds,    // Array degli ID selezionati
        handleSearch,   // Funzione per filtrare i dati
        toggleSelection,// Funzione per selezionare/deselezionare una riga
        handleRemove    // Funzione per rimuovere gli elementi selezionati
    } = useTableData(initialData);

    // --- 2. LOGICA DI RICERCA AUTOMATICA (useEffect) ---
    // Esegue la ricerca ogni volta che 'searchTerm' cambia (input utente).
    // Esegue anche la ricerca se 'initialData' cambia (p.es., se un genitore aggiorna i dati 
    // dopo un'operazione di salvataggio/aggiunta).
    useEffect(() => {
        handleSearch(searchKeys); // Passa le chiavi specifiche della colonna su cui cercare.
    }, [searchTerm, initialData, handleSearch, searchKeys]); // Dipendenze per l'hook.

    // --- 3. RENDERING ---
    return (
        <div className="table-manager-container">
            
            {/* Titolo e conteggio elementi visibili */}
            <h2>{title} ({displayedData.length})</h2>
            
            {/* Input di Ricerca */}
            <input 
                type="text" 
                placeholder="Cerca..." 
                value={searchTerm}
                // Ad ogni modifica, aggiorna lo stato 'searchTerm' nel hook.
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="table-actions-bar">
                {/* Area dei Bottoni d'Azione */}
                {/* Chiama la funzione 'renderActions' passata come prop dal genitore 
                    e inietta lo stato e la funzione di rimozione dal hook. 
                    Il genitore usa questi dati per renderizzare TableActions.jsx. */}
                {renderActions({ selectedIds, handleRemove })} 
            </div>

            {/* Tabella vera e propria */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Seleziona</th> {/* Colonna per il checkbox */}
                        {/* Mappa le colonne definite dal genitore */}
                        {columns.map(col => (
                            <th key={col.key}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Mappa i dati VISUALIZZATI (filtrati) */}
                    {displayedData.map(item => (
                        <tr 
                            key={item.id} 
                            // Aggiunge la classe 'selected' se l'ID è nell'array 'selectedIds'
                            className={selectedIds.includes(item.id) ? 'selected' : ''}
                        >
                            <td>
                                {/* Checkbox per la selezione */}
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.includes(item.id)}
                                    // Al click, chiama la funzione del hook per aggiornare 'selectedIds'
                                    onChange={() => toggleSelection(item.id)}
                                />
                            </td>
                            {/* Mappa i valori delle celle in base alle chiavi delle colonne */}
                            {columns.map(col => (
                                <td key={col.key}>{item[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTableManager;