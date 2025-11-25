// src/pages/Agenti.jsx 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Hook personalizzato che gestisce l'interazione con i dati (simulazione API/localStorage).
// Fornisce lo stato dei dati (data, isLoading, error) e le funzioni di modifica (removeAgents, setFilters).
import useAgents from '../hooks/UseAgents'; 
// Componente generico per visualizzare i dati in formato tabella.
import ReusableTable from './AdminTableReusable'; 

/**
 * Componente principale per la Gestione Agenti.
 * Questa pagina è responsabile di:
 * 1. Caricare e visualizzare la lista degli agenti tramite useAgents.
 * 2. Gestire la logica di ricerca/filtro.
 * 3. Gestire la selezione delle righe per le azioni di massa (Modifica, Rimuovi).
 * 4. Reindirizzare ai form Aggiungi/Modifica.
 */
const Agenti = () => {
    const navigate = useNavigate();
    // Stato locale per l'input di ricerca
    const [searchTerm, setSearchTerm] = useState('');
    // Stato locale per tenere traccia degli ID delle righe selezionate (necessario per Modifica/Rimuovi)
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    // Destrutturazione delle funzioni e degli stati forniti dal custom hook
    const { 
        data: usersList, // I dati degli agenti filtrati o completi
        isLoading,      // Stato di caricamento
        error,          // Eventuale errore
        removeAgents,   // Funzione per eliminare gli agenti
        setFilters      // Funzione per aggiornare i filtri (triggera un nuovo fetch)
    } = useAgents(); 

    // --- LOGICA DI CONTROLLO ---

    // Gestisce l'attivazione della ricerca. Aggiorna lo stato dei filtri nell'hook.
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
        // Resetta la selezione dopo una ricerca per evitare azioni indesiderate
        setSelectedUserIds([]); 
    };

    // Reindirizza al form unificato in modalità Aggiunta.
    const handleAddAgent = () => {
        navigate('/admin/gestione-utenti/aggiungi-agente');
    };

    // Reindirizza al form unificato in modalità Modifica, includendo l'ID nell'URL.
    // L'ID viene preso dal primo elemento selezionato.
    const handleEditAgent = () => {
        // La modifica è consentita solo se è selezionato esattamente un elemento
        if (selectedUserIds.length !== 1) return;
        const idToEdit = selectedUserIds[0];
        // Navigazione a una rotta dinamica (es: /modifica-agente/A001)
        navigate(`/admin/gestione-utenti/modifica-agente/${idToEdit}`);
    };
  
    // Gestisce la rimozione degli agenti selezionati.
    const handleRemoveAgents = async () => {
        if (selectedUserIds.length === 0) return;

        if (window.confirm(`Sei sicuro di voler rimuovere ${selectedUserIds.length} agente/i?`)) {
            try {
                // Chiama la funzione di rimozione fornita dal custom hook
                await removeAgents(selectedUserIds);
                // Dopo il successo, resetta la selezione
                setSelectedUserIds([]);
            } catch (err) {
                console.error('Errore durante la rimozione:', err);
                // Qui si potrebbe aggiungere un setApiError(err.message) per feedback utente
            }
        }
    };

    // Gestisce la selezione/deselezione di una singola riga
    const toggleUserSelection = (userId) => {
        setSelectedUserIds(prevIds => 
            prevIds.includes(userId) 
                ? prevIds.filter(id => id !== userId) // Deseleziona
                : [...prevIds, userId]                  // Seleziona
        );
    };

    // Determina se tutti gli elementi visibili sono selezionati
    const isAllSelected = usersList.length > 0 && selectedUserIds.length === usersList.length;
    
    // Gestisce la selezione/deselezione di tutte le righe
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedUserIds([]);
        } else {
            // Seleziona tutti gli ID della lista corrente (che potrebbe essere già filtrata)
            const allIds = usersList.map(user => user.id);
            setSelectedUserIds(allIds);
        }
    };
    
    // Configurazione delle colonne da passare al ReusableTable
    const userColumns = [
        { key: 'fullName', header: 'Nome e cognome' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Telefono' },
        { key: 'cittaOperativa', header: 'Città operativa' },
        { key: 'status', header: 'Stato' },
        // Nota: Il rendering specifico per 'status' è gestito all'interno del ReusableTable
    ];

    return (
        <div className="user-management-page">
            <h1>Gestione Agenti</h1>
            <div className="user-table-card">
                
                {/* Controlli della tabella: Ricerca e Bottoni Azione */}
                <div className="table-header-controls">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Cerca agente..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // Attiva la ricerca anche con la pressione di 'Invio'
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                        />
                        <button className="search-btn" onClick={handleSearchClick}>Cerca</button>
                    </div>
                    
                    <div className="action-buttons">
                        <button className="add-btn" onClick={handleAddAgent}>
                            ➕ Aggiungi Agente
                        </button>
                        <button 
                            className="edit-btn" 
                            onClick={handleEditAgent}
                            // Bottone Modifica abilitato solo se UN elemento è selezionato
                            disabled={selectedUserIds.length !== 1}
                        >
                            ✏️ Modifica
                        </button>
                        <button 
                            className="remove-btn" 
                            onClick={handleRemoveAgents}
                            // Bottone Rimuovi abilitato solo se ALMENO un elemento è selezionato
                            disabled={selectedUserIds.length === 0}
                        >
                            🗑️ Rimuovi
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {isLoading && <div className="data-status-message loading">Caricamento agenti... ⏳</div>}
                {error && <div className="data-status-message error">Errore nel caricamento dei dati: {error.message} ❌</div>}
                
                {/* Rendering della Tabella: Viene mostrata solo se non ci sono errori e i dati sono presenti */}
                {!isLoading && !error && usersList && (
                    <ReusableTable 
                        data={usersList} 
                        columns={userColumns} 
                        selectedItemIds={selectedUserIds}
                        onRowSelect={toggleUserSelection}
                        onSelectAll={handleSelectAll}
                        isAllSelected={isAllSelected}
                    />
                )}
                
                {/* Messaggio se la lista è vuota (dopo il caricamento e senza errori) */}
                {!isLoading && !error && usersList && usersList.length === 0 && (
                    <div className="data-status-message info">Nessun agente trovato.</div>
                )}
            </div>
        </div>
    );
};

export default Agenti;