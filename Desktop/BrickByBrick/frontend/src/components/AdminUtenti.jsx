// src/back-office/pages/UtentiAdmin.jsx

import React from 'react';
import TableManager from '../components/AdminTableManager';

const mockUsers = [
    { id: 'U001', fullName: 'Luigi Verdi', email: 'luigi@test.com', phone: '3331234567', age: 38, status: 'Attivo', role: 'Cliente' },
    { id: 'U002', fullName: 'Anna Neri', email: 'anna@test.com', phone: '3339876543', age: 45, status: 'Sospeso', role: 'Cliente VIP' },
    { id: 'U003', fullName: 'Marco Gialli', email: 'marco@test.com', phone: '3334567890', age: 29, status: 'Attivo', role: 'Cliente' },
    
];

const UtentiAdmin = () => {
    
    // Configurazione colonne
    const userColumns = [
        { key: 'fullName', header: 'Nome Completo' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Tipologia Cliente' },
        { key: 'phone', header: 'Telefono' },
        { key: 'age', header: 'Età' },
    ];

    // Chiavi su cui si deve eseguire la ricerca
    const searchKeys = ['fullName', 'email', 'id', 'role'];

    // --- RENDERING: Bottoni d'Azione Specifici (Solo Rimuovi) ---
    // Riceve le props da TableManager
    const renderUserActions = ({ selectedIds, handleRemove }) => (
        <button 
            className="remove-user-btn" 
            onClick={() => handleRemove(`Sei sicuro di voler rimuovere ${selectedIds.length} utente/i cliente?`)}
            disabled={selectedIds.length === 0}
        >
          Elimina utente
        </button>
    );

    return (
        <TableManager 
            title="Gestione Utenti"
            initialData={mockUsers} // Passa i dati fittizi
            columns={userColumns}
            searchKeys={searchKeys}
            renderActions={renderUserActions} // Passa solo i bottoni di eliminazione
        />
    );
};

export default UtentiAdmin;