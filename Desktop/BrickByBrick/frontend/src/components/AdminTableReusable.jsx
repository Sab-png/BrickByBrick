// src/components/ReusableTable.jsx

import React from 'react';
// Importa il tuo file SCSS
// import '../../styles/components/_tableReusable.scss';

/**
 * Componente Tabella Riutilizzabile (Senza ottimizzazione React.memo)
 * @param {Array<Object>} data - L'array di dati da visualizzare.
 * @param {Array<Object>} columns - La configurazione delle colonne (key, header, render).
 * @param {function} onEdit - Funzione da chiamare quando viene cliccato il bottone modifica.
 * @param {function} onDelete - Funzione da chiamare quando viene cliccato il bottone elimina.
 * @param {boolean} showEdit - Mostra il bottone modifica (default: true).
 * @param {boolean} showDelete - Mostra il bottone elimina (default: true).
 */
const ReusableTable = ({ 
    data, 
    columns,
    onEdit,
    onDelete,
    showEdit = true,
    showDelete = true
}) => {
    
    // Gestione di un array di dati vuoto
    if (!data || data.length === 0) {
        return <p className="no-data-message">Nessun elemento da visualizzare.</p>;
    }

    // Gestisce il rendering del contenuto della cella, usando il render personalizzato se fornito
    const renderCellContent = (item, column) => {
        if (column.render && typeof column.render === 'function') {
            return column.render(item);
        }

        if (column.key === 'status') {
             return (
                 <span className={`status-badge status-${String(item[column.key]).toLowerCase()}`}>
                     {item[column.key]}
                 </span>
             );
        }

        return item[column.key];
    };

    return (
        <div className="admin-table-container" style={{ overflowX: 'auto', width: '100%' }}>
            <table className="admin-table" style={{ minWidth: '100%', width: 'max-content' }}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.header}</th>
                        ))}
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        // Determina l'ID in base al tipo di entità - prova tutte le varianti possibili
                        // Per i contratti, id_contratto ha la priorità assoluta
                        const itemId = item.Id_contratto || item.id_contratto ||
                                      item.Id_visita || item.id_visita ||
                                      item.Id_agente || item.id_agente || 
                                      item.Id_immobile || item.id_immobile || 
                                      item.Id_utente || item.id_utente || 
                                      item.id;
                        
                        // Debug: verifica che l'ID venga estratto correttamente
                        if (!itemId) {
                            console.warn('ATTENZIONE: ID non trovato per l\'item:', item);
                            console.log('Chiavi disponibili nell\'oggetto:', Object.keys(item));
                        }
                        
                        return (
                            <tr key={itemId || Math.random()}>
                                {/* Celle dei dati */}
                                {columns.map((column) => (
                                    <td key={`${itemId}-${column.key}`}>
                                        {renderCellContent(item, column)}
                                    </td>
                                ))}
                                
                                {/* Cella Azioni */}
                                <td>
                                    <div className="table-actions">
                                        {showEdit && (
                                            <button
                                                className="action-btn edit-action-btn"
                                                onClick={() => {
                                                    console.log('Modifica cliccato, ID:', itemId, 'Item completo:', item);
                                                    onEdit && onEdit(itemId);
                                                }}
                                                aria-label={`Modifica ${item.fullName || item.name || 'elemento'}`}
                                                title="Modifica"
                                                disabled={!itemId}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        )}
                                        {showDelete && (
                                            <button
                                                className="action-btn delete-action-btn"
                                                onClick={() => {
                                                    console.log('Elimina cliccato, ID:', itemId, 'Item completo:', item);
                                                    onDelete && onDelete(itemId);
                                                }}
                                                aria-label={`Elimina ${item.fullName || item.name || 'elemento'}`}
                                                title="Elimina"
                                                disabled={!itemId}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReusableTable;