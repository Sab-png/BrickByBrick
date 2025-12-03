import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useVisite from '../hooks/UseVisite';
import ReusableTable from './AdminTableReusable';
import { useAuthData } from '../providers/AuthContextProvider';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';

/**
 * Componente per la visualizzazione e gestione delle visite dell'agente
 * Mostra solo le visite associate all'agente loggato
 */
const VisiteAgente = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuthData();
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();
    
    // Recupera l'ID dell'agente loggato dal context
    const idAgenteLoggato = user?.id;

    const {
        data: visiteList,
        isLoading,
        error,
        removeVisite,
        setFilters
    } = useVisite(idAgenteLoggato);

    // Gestisce l'attivazione della ricerca
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    // Reindirizza al form per modificare una visita
    const handleEditVisita = (visitaId) => {
        navigate(`/agente/visite/modifica/${visitaId}`);
    };

    // Gestisce l'eliminazione di una visita
    const handleDeleteVisita = async (visitaId) => {
        if (!visitaId) {
            await showConfirm({
                title: 'Errore',
                message: 'ID visita non valido',
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
            return;
        }

        const confirmed = await showConfirm({
            title: 'Conferma Eliminazione',
            message: 'Sei sicuro di voler eliminare questa visita?',
            type: 'danger',
            confirmText: 'Elimina',
            cancelText: 'Annulla'
        });

        if (confirmed) {
            try {
                await removeVisite([visitaId]);
                await showConfirm({
                    title: 'Successo',
                    message: 'Visita eliminata con successo!',
                    type: 'success',
                    confirmText: 'OK',
                    showCancel: false
                });
            } catch (err) {
                console.error('Errore durante l\'eliminazione:', err);
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

    // Formatta la data per visualizzazione
    const formatDate = (dateString) => {
        if (!dateString) return 'N/D';
        const date = new Date(dateString);
        return date.toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Configurazione delle colonne per la tabella
    const visiteColumns = [
        { 
            key: 'id_visita', 
            header: 'ID',
            render: (item) => item.id_visita || item.Id_Visita || 'N/D'
        },
        { 
            key: 'id_immobile', 
            header: 'ID Immobile',
            render: (item) => item.id_immobile || item.Id_immobile || 'N/D'
        },
        { 
            key: 'id_utente', 
            header: 'ID Utente',
            render: (item) => item.id_utente || item.Id_utente || 'N/D'
        },
        { 
            key: 'data', 
            header: 'Data e Ora',
            render: (item) => formatDate(item.data)
        }
    ];

    // Verifica che l'agente sia loggato
    if (!idAgenteLoggato) {
        return (
            <div className="user-management-page">
                <div className="data-status-message error">
                    Errore: Impossibile identificare l'agente. Effettua il login.
                </div>
            </div>
        );
    }

    return (
        <div className="user-management-page">
            <h1>Le Mie Visite Programmate</h1>

            <div className="user-table-card">
                {/* Controlli della tabella: Ricerca */}
                <div className="table-header-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Cerca visita..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                        />
                        <button className="search-btn" onClick={handleSearchClick} disabled={isLoading}>
                            Cerca
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {isLoading && (
                    <div className="data-status-message loading">
                        Caricamento visite... ⏳
                    </div>
                )}

                {error && (
                    <div className="data-status-message error">
                        Errore nel caricamento dei dati: {error.message} ❌
                    </div>
                )}

                {/* Rendering della Tabella */}
                {!isLoading && !error && visiteList && (
                    <ReusableTable
                        data={visiteList}
                        columns={visiteColumns}
                        onEdit={handleEditVisita}
                        onDelete={handleDeleteVisita}
                        showEdit={true}
                        showDelete={true}
                    />
                )}

                {/* Messaggio se la lista è vuota */}
                {!isLoading && !error && visiteList && visiteList.length === 0 && (
                    <div className="data-status-message info">
                        Nessuna visita programmata trovata.
                    </div>
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

export default VisiteAgente;