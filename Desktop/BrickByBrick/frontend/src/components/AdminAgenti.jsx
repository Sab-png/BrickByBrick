/**
 * @fileoverview Componente per la gestione della lista agenti.
 * Fornisce interfaccia per visualizzare, cercare, aggiungere, modificare ed eliminare agenti.
 * Utilizza modali per conferme e feedback utente.
 * 
 * @module AdminAgenti
 * @requires react
 * @requires react-router-dom
 * @requires ../hooks/UseAgents
 * @requires ./AdminTableReusable
 * @requires ./ConfirmModal
 * @requires ../hooks/UseConfirmModal
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAgents from '../hooks/UseAgents'; 
import ReusableTable from './AdminTableReusable';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal'; 

/**
 * Componente principale per la Gestione Agenti
 * 
 * Responsabilità:
 * - Visualizza lista agenti in formato tabella
 * - Gestisce ricerca/filtro agenti
 * - Permette aggiunta, modifica ed eliminazione agenti
 * - Mostra feedback tramite modali personalizzati
 * 
 * @component
 * @returns {JSX.Element} Interfaccia gestione agenti
 * 
 * @example
 * // Utilizzo nelle routes
 * <Route path="/admin/agenti" element={<Agenti />} />
 */
const Agenti = () => {
    const navigate = useNavigate();
    
    /** @type {[string, Function]} Termine di ricerca inserito dall'utente */
    const [searchTerm, setSearchTerm] = useState('');
    
    /** Hook per gestire modali di conferma */
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();

    /** Hook personalizzato per operazioni CRUD sugli agenti */
    const { 
        data: usersList,
        isLoading,
        error,
        removeAgents,
        setFilters
    } = useAgents(); 

    /**
     * Attiva la ricerca aggiornando i filtri
     * Passa il termine di ricerca all'hook useAgents
     * 
     * @function
     */
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    /**
     * Reindirizza al form di aggiunta nuovo agente
     * 
     * @function
     */
    const handleAddAgent = () => {
        navigate('/admin/agenti/aggiungi-agente');
    };

    /**
     * Reindirizza al form di modifica agente esistente
     * 
     * @function
     * @param {number|string} agentId - ID dell'agente da modificare
     */
    const handleEditAgent = (agentId) => {
        navigate(`/admin/agenti/modifica-agente/${agentId}`);
    };
  
    /**
     * Gestisce l'eliminazione di un singolo agente
     * 
     * Processo:
     * 1. Valida l'ID agente
     * 2. Mostra modale di conferma
     * 3. Elimina agente se confermato
     * 4. Mostra modale di successo/errore
     * 
     * @function
     * @async
     * @param {number|string} agentId - ID dell'agente da eliminare
     */
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
    
    /**
     * Configurazione delle colonne per la tabella agenti
     * 
     * @constant {Array<{key: string, header: string}>}
     */
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
                            + Aggiungi Agente
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {isLoading && <div className="data-status-message loading">Caricamento agenti... </div>}
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