import React, { useState } from 'react';
import useContratti from '../hooks/UseContratti';
import ReusableTable from './AdminTableReusable';
import { useNavigate } from 'react-router-dom';

/**
 * Componente AdminContratti - Gestione Contratti Esclusivi
 * Visualizza e gestisce i contratti esistenti
 */
const AdminContratti = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Hook per gestire i contratti
    const { 
        data: contrattiList,
        isLoading: contrattiLoading,
        error: contrattiError,
        removeContratti,
        setFilters: setContrattiFilters
    } = useContratti();

    // Gestisce la ricerca
    const handleSearchClick = () => {
        setContrattiFilters({ search: searchTerm.trim() });
    };

    // Naviga al form per creare un nuovo contratto da zero
    const handleNuovoContratto = () => {
        navigate('/admin/contratti/nuovo');
    };

    // Naviga al form per modificare un contratto esistente
    const handleEditContratto = (contrattoOrId) => {
        // Gestisce sia l'oggetto contratto che l'ID diretto
        let contrattoId;
        
        if (typeof contrattoOrId === 'object') {
            // Se riceve un oggetto
            contrattoId = contrattoOrId.id_contratto || contrattoOrId.Id_contratto;
        } else {
            // Se riceve direttamente l'ID
            contrattoId = contrattoOrId;
        }
        
        console.log('handleEditContratto - Parametro ricevuto:', contrattoOrId);
        console.log('handleEditContratto - ID estratto:', contrattoId);
        
        if (!contrattoId) {
            alert('Errore: ID contratto non valido');
            return;
        }
        navigate(`/admin/contratti/modifica/${contrattoId}`);
    };

    // Elimina un contratto
    const handleDeleteContratto = async (contrattoOrId) => {
        // Gestisce sia l'oggetto contratto che l'ID diretto
        let contrattoId;
        
        if (typeof contrattoOrId === 'object') {
            // Se riceve un oggetto
            contrattoId = contrattoOrId.id_contratto || contrattoOrId.Id_contratto;
        } else {
            // Se riceve direttamente l'ID
            contrattoId = contrattoOrId;
        }
        
        console.log('handleDeleteContratto - Parametro ricevuto:', contrattoOrId);
        console.log('handleDeleteContratto - ID estratto:', contrattoId);
        
        if (!contrattoId) {
            alert('Errore: ID contratto non valido');
            return;
        }
        
        if (window.confirm('Sei sicuro di voler eliminare questo contratto?')) {
            try {
                await removeContratti([contrattoId]);
                alert('Contratto eliminato con successo!');
            } catch (err) {
                console.error('Errore durante l\'eliminazione:', err);
                alert(err.message || 'Errore durante l\'eliminazione');
            }
        }
    };

    // Configurazione colonne tabella contratti
    const contrattoColumns = [
        { key: 'id_contratto', header: 'ID Contratto' },
        { key: 'id_utente', header: 'ID Utente' },
        { key: 'id_immobile', header: 'ID Immobile' },
        { 
            key: 'data_di_scadenza', 
            header: 'Data Scadenza',
            render: (contratto) => {
                const value = contratto.data_di_scadenza;
                if (!value) return 'N/A';
                const date = new Date(value);
                return date.toLocaleDateString('it-IT');
            }
        },
        { key: 'prezzo', header: 'Prezzo €' }
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
                            // Attiva la ricerca anche con la pressione di 'Invio'
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                        />
                        <button className="search-btn" onClick={handleSearchClick}>Cerca</button>
                    </div>
                    
                    <div className="action-buttons">
                        <button className="add-btn" onClick={handleNuovoContratto}>
                            ➕ Nuovo Contratto
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {contrattiLoading && <div className="data-status-message loading">Caricamento contratti... ⏳</div>}
                {contrattiError && <div className="data-status-message error">Errore nel caricamento dei dati: {contrattiError.message} ❌</div>}
                
                {/* Rendering della Tabella: Viene mostrata solo se non ci sono errori e i dati sono presenti */}
                {!contrattiLoading && !contrattiError && contrattiList && (
                    <ReusableTable
                        data={contrattiList}
                        columns={contrattoColumns}
                        onEdit={handleEditContratto}
                        onDelete={handleDeleteContratto}
                        showEdit={true}
                        showDelete={true}
                        editButtonText="✏️ Modifica"
                    />
                )}
                
                {/* Messaggio se la lista è vuota (dopo il caricamento e senza errori) */}
                {!contrattiLoading && !contrattiError && contrattiList && contrattiList.length === 0 && (
                    <div className="data-status-message info">Nessun contratto trovato.</div>
                )}
            </div>
        </div>
    );
};

export default AdminContratti;
