// src/components/ReusableTable.jsx

import React from 'react';
// Importa il tuo file SCSS
// import '../../styles/components/_tableReusable.scss';

/**
 * Componente Tabella Riutilizzabile (Senza ottimizzazione React.memo)
 * @param {Array<Object>} data - L'array di dati da visualizzare.
 * @param {Array<Object>} columns - La configurazione delle colonne (key, header, render).
 * @param {Array<string>} selectedItemIds - Array di ID degli elementi selezionati.
 * @param {function} onRowSelect - Funzione da chiamare quando viene selezionata una riga.
 * @param {function} onSelectAll - Funzione da chiamare per selezionare/deselezionare tutti.
 * @param {boolean} isAllSelected - Indica se tutti gli elementi visibili sono selezionati.
 */
const ReusableTable = ({ 
    data, 
    columns, 
    // ✨ QUI LA MODIFICA: Assegna un array vuoto come valore di default.
    selectedItemIds = [], 
    onRowSelect, 
    onSelectAll,
    isAllSelected
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
        <table className="reusable-table">
            <thead>
                <tr>
                    {/* Header per la colonna checkbox 'Seleziona Tutti' */}
                    <th className="select-col">
                        <input 
                            type="checkbox" 
                            checked={isAllSelected}
                            onChange={onSelectAll}
                        />
                    </th>
                    {columns.map((column) => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    // La riga è ora sicura perché selectedItemIds è garantito non essere undefined
                    <tr 
                        key={item.id} 
                        className={selectedItemIds.includes(item.id) ? 'selected-row' : ''}
                    >
                        {/* Cella checkbox */}
                        <td className="select-col">
                            <input 
                                type="checkbox" 
                                checked={selectedItemIds.includes(item.id)}
                                onChange={() => onRowSelect(item.id)}
                            />
                        </td>

                        {/* Celle dei dati */}
                        {columns.map((column) => (
                            <td key={`${item.id}-${column.key}`}>
                                {renderCellContent(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReusableTable;