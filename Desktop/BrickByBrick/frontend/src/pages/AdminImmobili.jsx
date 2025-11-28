// src/pages/Immobili.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Hook personalizzato che gestisce l'interazione con i dati degli immobili.
import useImmobiliManager from '../hooks/UseImmobili';
// Componente generico per visualizzare i dati in formato tabella.
import ReusableTable from '../components/AdminTableReusable'

/**
 * Componente principale per la Gestione Immobili.
 * Responsabile di:
 * 1. Caricare e visualizzare la lista degli immobili tramite useImmobiliManager.
 * 2. Gestire la logica di ricerca/filtro.
 * 3. Gestire la selezione delle righe per le azioni di massa (Modifica, Rimuovi).
 * 4. Reindirizzare ai form Aggiungi/Modifica.
 */
const Immobili = () => {
    const navigate = useNavigate();
    // Stato locale per l'input di ricerca (ad esempio per indirizzo, città)
    const [searchTerm, setSearchTerm] = useState('');

    // Destrutturazione delle funzioni e degli stati forniti dal custom hook
    const {
        data: immobiliList, // I dati degli immobili filtrati o completi
        isLoading,
        error,
        removeImmobili, // Funzione per eliminare gli immobili
        setFilters     // Funzione per aggiornare i filtri (triggera un nuovo fetch)
    } = useImmobiliManager();

    // --- LOGICA DI CONTROLLO ---

    // Gestisce l'attivazione della ricerca. Aggiorna lo stato dei filtri nell'hook.
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    // Reindirizza al form unificato in modalità Aggiunta.
    const handleAddImmobile = () => {
        // Rotta adattata per gli immobili
        navigate('/admin/immobili/aggiungi-immobile');
    };

    // Reindirizza al form unificato in modalità Modifica, includendo l'ID nell'URL.
    const handleEditImmobile = (immobileId) => {
        navigate(`/admin/immobili/modifica-immobile/${immobileId}`);
    };

    // Gestisce la rimozione di un singolo immobile.
    const handleDeleteImmobile = async (immobileId) => {
        if (!immobileId) {
            alert('Errore: ID immobile non valido');
            return;
        }
        
        if (window.confirm('Sei sicuro di voler rimuovere questo immobile? ATTENZIONE: Se l\'immobile ha visite associate, l\'eliminazione fallirà.')) {
            try {
                await removeImmobili([immobileId]);
                alert('Immobile eliminato con successo!');
            } catch (err) {
                console.error('Errore durante la rimozione dell\'immobile:', err);
                alert(err.message || 'Errore durante l\'eliminazione');
            }
        }
    };

    // Configurazione delle colonne da passare al ReusableTable con campi DB
    const immobileColumns = [
        { 
            key: 'tipologia', 
            header: 'Tipologia',
            render: (item) => item.caratteristiche?.tipologia || 'N/D'
        },
        { key: 'indirizzo', header: 'Indirizzo' },
        { key: 'citta', header: 'Città' },
        { 
            key: 'prezzo', 
            header: 'Prezzo (€)',
            render: (item) => item.prezzo ? `€ ${item.prezzo.toLocaleString()}` : 'N/D'
        },
        { 
            key: 'disponibilita', 
            header: 'Disponibilità',
            render: (item) => item.caratteristiche?.disponibilita || 'N/D'
        },
    ];

    return (
        <div className="immobile-management-page">
            <h1>Gestione Immobili</h1>
            <div className="immobile-table-card">

                {/* Controlli della tabella: Ricerca e Bottoni Azione */}
                <div className="table-header-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Cerca immobile (es. città, indirizzo)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                        />
                        <button className="search-btn" onClick={handleSearchClick} disabled={isLoading}>Cerca</button>
                    </div>

                    <div className="action-buttons">
                        <button className="add-btn" onClick={handleAddImmobile} disabled={isLoading}>
                            ➕ Aggiungi Immobile
                        </button>
                    </div>
                </div>

                {/* Stato Dati: Feedback utente */}
                {isLoading && <div className="data-status-message loading">Caricamento immobili... ⏳</div>}
                {error && <div className="data-status-message error">Errore nel caricamento dei dati: {error.message} ❌</div>}

                {/* Rendering della Tabella */}
                {!isLoading && !error && immobiliList && (
                    <ReusableTable
                        data={immobiliList}
                        columns={immobileColumns}
                        onEdit={handleEditImmobile}
                        onDelete={handleDeleteImmobile}
                        showEdit={true}
                        showDelete={true}
                    />
                )}

                {/* Messaggio se la lista è vuota */}
                {!isLoading && !error && immobiliList && immobiliList.length === 0 && (
                    <div className="data-status-message info">Nessun immobile trovato.</div>
                )}
            </div>
        </div>
    );
};

export default Immobili;