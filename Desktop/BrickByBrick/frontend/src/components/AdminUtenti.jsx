/**
 * @fileoverview Componente per la gestione degli utenti/clienti.
 * Fornisce interfaccia per visualizzare, cercare ed eliminare utenti.
 * 
 * @module AdminUtenti
 * @requires react
 * @requires ../hooks/UseUtenti
 * @requires ./AdminTableReusable
 * @requires ./ConfirmModal
 * @requires ../hooks/UseConfirmModal
 */

import React, { useState } from 'react';
import useUtenti from '../hooks/UseUtenti';
import ReusableTable from './AdminTableReusable';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';

/**
 * Componente per la Gestione Clienti/Utenti
 * 
 * Responsabilità:
 * - Visualizza lista utenti in formato tabella
 * - Gestisce ricerca/filtro utenti
 * - Permette eliminazione utenti
 * - Mostra feedback tramite modali personalizzati
 * 
 * Nota: NON include funzionalità di modifica o aggiunta
 * 
 * @component
 * @returns {JSX.Element} Interfaccia gestione utenti
 * 
 * @example
 * <Route path="/admin/utenti" element={<UtentiAdmin />} />
 */
const UtentiAdmin = () => {
    /** @type {[string, Function]} Termine di ricerca inserito dall'utente */
    const [searchTerm, setSearchTerm] = useState('');
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();

    /** Hook personalizzato per operazioni CRUD sugli utenti */
    const { 
        data: usersList,
        isLoading,
        error,
        removeUtenti,
        setFilters
    } = useUtenti();

    /**
     * Attiva la ricerca aggiornando i filtri
     * @function
     */
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    /**
     * Gestisce l'eliminazione di un singolo utente
     * 
     * Processo:
     * 1. Valida l'ID utente
     * 2. Mostra modale di conferma
     * 3. Elimina utente se confermato
     * 4. Mostra modale di successo/errore
     * 
     * @function
     * @async
     * @param {number|string} userId - ID dell'utente da eliminare
     */
    const handleDeleteUser = async (userId) => {
        if (!userId) {
            await showConfirm({
                title: 'Errore',
                message: 'ID utente non valido',
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
            return;
        }
        
        const confirmed = await showConfirm({
            title: 'Conferma Eliminazione',
            message: 'Sei sicuro di voler rimuovere questo utente? ATTENZIONE: Se l\'utente ha dati associati, l\'eliminazione fallirà.',
            type: 'danger',
            confirmText: 'Elimina',
            cancelText: 'Annulla'
        });

        if (confirmed) {
            try {
                await removeUtenti([userId]);
                await showConfirm({
                    title: 'Successo',
                    message: 'Utente eliminato con successo!',
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

    // Configurazione delle colonne per la tabella
    const userColumns = [
        { key: 'nome', header: 'Nome' },
        { key: 'cognome', header: 'Cognome' },
        { key: 'email', header: 'Email' },
        { key: 'telefono', header: 'Telefono' },
        { key: 'codice_fiscale', header: 'Codice Fiscale' },
    ];

    return (
        <div className="user-management-page">
            <h1>Gestione Utenti</h1>
            
            <div className="user-table-card">
                {/* Controlli della tabella: Solo Ricerca */}
                <div className="table-header-controls" style={{ justifyContent: 'flex-start' }}>
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Cerca cliente..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                        />
                        <button className="search-btn" onClick={handleSearchClick}>
                            Cerca
                        </button>
                    </div>
                </div>

                {/* Visualizzazione errori */}
                {error && (
                    <div className="error-alert" style={{ color: 'red', padding: '10px', margin: '10px 0' }}>
                        ⚠️ {error.message}
                    </div>
                )}

                {/* Stato di caricamento */}
                {isLoading && <div className="loading">Caricamento utenti in corso...</div>}

                {/* Tabella utenti */}
                {!isLoading && (
                    <ReusableTable 
                        data={usersList} 
                        columns={userColumns}
                        onDelete={handleDeleteUser}
                        showEdit={false}  // Nessun bottone modifica
                        showDelete={true}  // Solo bottone elimina
                    />
                )}
            </div>
            
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

export default UtentiAdmin;