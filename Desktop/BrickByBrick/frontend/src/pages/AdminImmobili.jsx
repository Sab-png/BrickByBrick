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
    // Stato locale per tenere traccia degli ID delle righe selezionate
    const [selectedImmobileIds, setSelectedImmobileIds] = useState([]);

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
        // Resetta la selezione dopo una ricerca
        setSelectedImmobileIds([]);
    };

    // Reindirizza al form unificato in modalità Aggiunta.
    const handleAddImmobile = () => {
        // Rotta adattata per gli immobili
        navigate('/admin/gestione-immobili/aggiungi-immobile');
    };

    // Reindirizza al form unificato in modalità Modifica, includendo l'ID nell'URL.
    const handleEditImmobile = () => {
        // La modifica è consentita solo se è selezionato esattamente un elemento
        if (selectedImmobileIds.length !== 1) return;
        const idToEdit = selectedImmobileIds[0];
        // Navigazione a una rotta dinamica (es: /modifica-immobile/I001)
        navigate(`/admin/gestione-immobili/modifica-immobile/${idToEdit}`);
    };

    // Gestisce la rimozione degli immobili selezionati.
    const handleRemoveImmobili = async () => {
        if (selectedImmobileIds.length === 0) return;

        if (window.confirm(`Sei sicuro di voler rimuovere ${selectedImmobileIds.length} immobile/i?`)) {
            try {
                // Chiama la funzione di rimozione fornita dal custom hook
                await removeImmobili(selectedImmobileIds);
                // Dopo il successo, resetta la selezione
                setSelectedImmobileIds([]);
            } catch (err) {
                console.error('Errore durante la rimozione degli immobili:', err);
                // Si potrebbe aggiungere un feedback visivo all'utente qui
            }
        }
    };

    // Gestisce la selezione/deselezione di una singola riga
    const toggleImmobileSelection = (immobileId) => {
        setSelectedImmobileIds(prevIds =>
            prevIds.includes(immobileId)
                ? prevIds.filter(id => id !== immobileId) // Deseleziona
                : [...prevIds, immobileId]                // Seleziona
        );
    };

    // Determina se tutti gli elementi visibili sono selezionati
    const isAllSelected = immobiliList.length > 0 && selectedImmobileIds.length === immobiliList.length;

    // Gestisce la selezione/deselezione di tutte le righe
    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedImmobileIds([]);
        } else {
            // Seleziona tutti gli ID della lista corrente (filtrata)
            const allIds = immobiliList.map(item => item.id);
            setSelectedImmobileIds(allIds);
        }
    };

    // Configurazione delle colonne da passare al ReusableTable (ADATTA LE CHIAVI AI TUOI DATI)
    const immobileColumns = [
        { key: 'tipologia', header: 'Tipologia' },
        { key: 'address', header: 'Indirizzo' },
        { key: 'city', header: 'Città' },
        { key: 'price', header: 'Prezzo (€)' },
        { key: 'energyClass', header: 'Classe En.' },
        { key: 'status', header: 'Stato' }, // Esempio: "Disponibile", "Venduto"
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
                        <button
                            className="edit-btn"
                            onClick={handleEditImmobile}
                            // Modifica abilitata solo se UN elemento è selezionato
                            disabled={selectedImmobileIds.length !== 1 || isLoading}
                        >
                            ✏️ Modifica
                        </button>
                        <button
                            className="remove-btn"
                            onClick={handleRemoveImmobili}
                            // Rimuovi abilitato solo se ALMENO un elemento è selezionato
                            disabled={selectedImmobileIds.length === 0 || isLoading}
                        >
                            🗑️ Rimuovi
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
                        selectedItemIds={selectedImmobileIds}
                        onRowSelect={toggleImmobileSelection} // Usa la funzione specifica degli immobili
                        onSelectAll={handleSelectAll}
                        isAllSelected={isAllSelected}
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