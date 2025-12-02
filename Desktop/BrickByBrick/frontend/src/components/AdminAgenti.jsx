import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAgents from '../hooks/UseAgents'; 
import ReusableTable from './AdminTableReusable';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal'; 

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
    const [searchTerm, setSearchTerm] = useState('');
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();

    const { 
        data: usersList,
        isLoading,
        error,
        removeAgents,
        setFilters
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
  
    // Gestisce la rimozione di un singolo agente
    const handleDeleteAgent = async (agentId) => {
        if (!agentId) {
            await showConfirm({
                title: 'Errore',
                message: 'ID agente non valido',
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
            return;
        }
        
        const confirmed = await showConfirm({
            title: 'Conferma Eliminazione',
            message: 'Sei sicuro di voler rimuovere questo agente? ATTENZIONE: Se l\'agente ha dati associati, l\'eliminazione fallirà.',
            type: 'danger',
            confirmText: 'Elimina',
            cancelText: 'Annulla'
        });

        if (confirmed) {
            try {
                await removeAgents([agentId]);
                await showConfirm({
                    title: 'Successo',
                    message: 'Agente eliminato con successo!',
                    type: 'success',
                    confirmText: 'OK',
                    showCancel: false
                });
            } catch (err) {
                console.error('Errore durante la rimozione:', err);
                await showConfirm({
                    title: 'Errore',
                    message: err.message || 'Errore durante l\'eliminazione',
                    type: 'danger',
                    confirmText: 'OK',
                    showCancel: false
                });
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

            {/* Modale di conferma */}
            <ConfirmModal
                isOpen={modalState.isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                showCancel={modalState.showCancel}
            />
        </div>
    );
};

export default Agenti;