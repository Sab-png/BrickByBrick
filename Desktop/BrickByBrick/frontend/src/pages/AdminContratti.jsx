// src/pages/AdminContratti.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useContratti from '../hooks/UseContratti';
import ReusableTable from '../components/AdminTableReusable';
import AdminContrattoForm from '../components/AdminContrattoForm';

/**
 * Componente principale per la Gestione Contratti.
 * Questa pagina è responsabile di:
 * 1. Caricare e visualizzare la lista dei contratti tramite useContratti.
 * 2. Gestire la logica di ricerca/filtro.
 * 3. Gestire la selezione delle righe per le azioni di massa (Modifica, Rimuovi).
 * 4. Reindirizzare ai form Aggiungi/Modifica.
 */
const AdminContratti = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContrattoId, setSelectedContrattoId] = useState(null);

    const {
        data: contrattiList,
        isLoading,
        error,
        removeContratti,
        setFilters,
        refetch
    } = useContratti();

    // --- LOGICA DI CONTROLLO ---

    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    const handleModificaContratto = () => {
        navigate('/admin/contratti/modifica-contratto');
    };

    const handleEditContratto = (contrattoId) => {
        setSelectedContrattoId(contrattoId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContrattoId(null);
        refetch(); // Ricarica i dati dopo la modifica
    };

    const handleDeleteContratto = async (contrattoId) => {
        if (!contrattoId) {
            alert('Errore: ID contratto non valido');
            return;
        }

        if (window.confirm('Sei sicuro di voler rimuovere questo contratto? ATTENZIONE: Se il contratto ha dati associati, l\'eliminazione fallirà.')) {
            try {
                await removeContratti([contrattoId]);
                alert('Contratto eliminato con successo!');
            } catch (err) {
                console.error('Errore durante la rimozione:', err);
                alert(err.message || 'Errore durante l\'eliminazione');
            }
        }
    };

    // Configurazione delle colonne da passare al ReusableTable
    const contrattiColumns = [
        { key: 'Id_contratto', header: 'ID Contratto' },
        { key: 'Id_immobile', header: 'ID Immobile' },
        { key: 'Id_utente', header: 'ID Utente' },
        { key: 'data_di_scadenza', header: 'Data Scadenza' },
        { key: 'prezzo', header: 'Prezzo' },
    ];

    return (
        <div className="user-management-page">
            <h1>Gestione Contratti</h1>
            <div className="user-table-card">

                {/* Controlli della tabella: Ricerca e Bottoni Azione */}
                <div className="table-header-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Cerca contratto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                        />
                        <button className="search-btn" onClick={handleSearchClick}>Cerca</button>
                    </div>

                    <div className="action-buttons">
                        <button className="add-btn" onClick={handleModificaContratto}>
                            Modifica Contratto
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {isLoading && <div className="data-status-message loading">Caricamento contratti... �</div>}
                {error && <div className="data-status-message error">Errore nel caricamento dei dati: {error.message} L</div>}

                {/* Rendering della Tabella */}
                {!isLoading && !error && contrattiList && (
                    <ReusableTable
                        data={contrattiList}
                        columns={contrattiColumns}
                        onEdit={handleEditContratto}
                        onDelete={handleDeleteContratto}
                        showEdit={true}
                        showDelete={true}
                    />
                )}

                {/* Messaggio se la lista � vuota */}
                {!isLoading && !error && contrattiList && contrattiList.length === 0 && (
                    <div className="data-status-message info">Nessun contratto trovato.</div>
                )}
            </div>

            {/* Modale per Modifica Contratto */}
            {isModalOpen && selectedContrattoId && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
                        <AdminContrattoForm
                            contrattoId={selectedContrattoId}
                            onClose={handleCloseModal}
                            mode="edit"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContratti;
