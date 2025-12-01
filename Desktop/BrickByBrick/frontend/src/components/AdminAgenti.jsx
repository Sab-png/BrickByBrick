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
    };

    // Reindirizza al form unificato in modalità Aggiunta.
    const handleAddAgent = () => {
        navigate('/admin/agenti/aggiungi-agente');
    };

    // Reindirizza al form unificato in modalità Modifica, includendo l'ID nell'URL.
    const handleEditAgent = (agentId) => {
        navigate(`/admin/agenti/modifica-agente/${agentId}`);
    };
  
    // Gestisce la rimozione di un singolo agente.
    const handleDeleteAgent = async (agentId) => {
        if (!agentId) {
            alert('Errore: ID agente non valido');
            return;
        }
        
        if (window.confirm('Sei sicuro di voler rimuovere questo agente? ATTENZIONE: Se l\'agente ha dati associati, l\'eliminazione fallirà.')) {
            try {
                await removeAgents([agentId]);
                alert('Agente eliminato con successo!');
            } catch (err) {
                console.error('Errore durante la rimozione:', err);
                alert(err.message || 'Errore durante l\'eliminazione');
            }
        }
    };
    
    // Configurazione delle colonne da passare al ReusableTable
    const userColumns = [
        { key: 'nome', header: 'Nome' },
        { key: 'cognome', header: 'Cognome' },
        { key: 'email', header: 'Email' },
        { key: 'telefono', header: 'Telefono' },
        { key: 'città', header: 'Città' },
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
                        onEdit={handleEditAgent}
                        onDelete={handleDeleteAgent}
                        showEdit={true}
                        showDelete={true}
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