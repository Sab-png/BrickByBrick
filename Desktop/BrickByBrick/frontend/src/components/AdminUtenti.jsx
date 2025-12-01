// AdminUtenti.jsx - Gestione Clienti
import React, { useState } from 'react';
import useUtenti from '../hooks/UseUtenti';
import ReusableTable from './AdminTableReusable';

/**
 * Componente per la Gestione Clienti/Utenti.
 * Visualizza la lista, permette ricerca ed eliminazione.
 * NON include modifica o aggiunta (solo visualizzazione e delete).
 */
const UtentiAdmin = () => {
    // Stato locale per l'input di ricerca
    const [searchTerm, setSearchTerm] = useState('');

    // Hook per gestire i dati degli utenti
    const { 
        data: usersList,
        isLoading,
        error,
        removeUtenti,
        setFilters
    } = useUtenti();

    // Gestisce l'attivazione della ricerca
    const handleSearchClick = () => {
        setFilters({ search: searchTerm.trim() });
    };

    // Gestisce la rimozione di un singolo utente
    const handleDeleteUser = async (userId) => {
        if (!userId) {
            alert('Errore: ID utente non valido');
            return;
        }
        
        if (window.confirm('Sei sicuro di voler rimuovere questo utente? ATTENZIONE: Se l\'utente ha dati associati, l\'eliminazione fallirà.')) {
            try {
                await removeUtenti([userId]);
                alert('Utente eliminato con successo!');
            } catch (err) {
                console.error('Errore durante la rimozione:', err);
                alert(err.message || 'Errore durante l\'eliminazione');
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
        </div>
    );
};

export default UtentiAdmin;