// ReusableTable.jsx
import React from 'react';
// Importa il tuo file SCSS
import '../../styles/components/_tableReusable.scss';
// Accetta le nuove props: selectedUserIds e onRowSelect
const ReusableTable = ({ data, columns, selectedUserIds, onRowSelect }) => {
  return (
    <table className="reusable-table">
      <thead>
        <tr>
          {/* Header vuoto per la colonna checkbox */}
          <th></th>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {/* Mostra la checkbox per ogni agente */}
            <td>
              <input 
                type="checkbox" 
                checked={selectedUserIds.includes(item.id)}
                onChange={() => onRowSelect(item.id)}
              />
            </td>

            {columns.map((column) => (
              <td key={`${item.id}-${column.key}`}>
                {column.isImage ? (
                  <img
                    src={item[column.key]}
                    alt={`Foto ${item.titolo || item.nome || ''}`}
                    className="table-image-circle"
                  />
                ) : column.key === 'status' ? (
                  <span className={`status-${item.status.toLowerCase()}`}>
                    {item[column.key]}
                  </span>
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
