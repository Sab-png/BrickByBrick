// UsersManager.jsx
import React, { useState, useEffect } from 'react';
import ReusableTable from '../components/TableReusable'; // Assicurati del percorso corretto

const UtentiAdmin = () => {
  // Dati fittizi per gli utenti (in un caso reale verrebbero da un'API o un file separato)
  const mockUsers = [
    { id: 'U001', fullName: 'Luigi Verdi', email: 'luigi@test.com', phone: '3331234567', status: 'Attivo', role: 'Cliente' },
    { id: 'U002', fullName: 'Anna Neri', email: 'anna@test.com', phone: '3339876543', status: 'Sospeso', role: 'Cliente VIP' },
    { id: 'U003', fullName: 'Marco Gialli', email: 'marco@test.com', phone: '3334567890', status: 'Attivo', role: 'Cliente' },
  ];

  // 1. Stato per i dati visualizzati
  const [usersList, setUsersList] = useState(mockUsers);
  // 2. Stato per la ricerca
  const [searchTerm, setSearchTerm] = useState('');
  // 3. Stato selezione (Necessario perché ReusableTable lo richiede, anche se non cancelliamo)
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // --- Logica di Filtraggio ---
  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      setUsersList(mockUsers);
    } else {
      const filtered = mockUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsersList(filtered);
    }
    // Reset selezione dopo ricerca
    setSelectedUserIds([]); 
  };

  // --- Logica Selezione Checkbox ---
  // Manteniamo questa funzione perché ReusableTable si aspetta "onRowSelect"
  const toggleUserSelection = (userId) => {
    setSelectedUserIds(prevIds => {
      if (prevIds.includes(userId)) {
        return prevIds.filter(id => id !== userId);
      } else {
        return [...prevIds, userId];
      }
    });
  };

  // Configurazione colonne (Adattate per gli Utenti generici)
  const userColumns = [
    { key: 'fullName', header: 'Nome Completo' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Tipologia Cliente' }, // Colonna diversa dagli Agenti
    { key: 'phone', header: 'Telefono' },
    { key: 'status', header: 'Stato' },
  ];

  return (
    <div className="user-management-page">
      <h1>Gestione Utenti</h1>
      
      <div className="user-table-card">
        
        {/* Header con controlli - Solo Ricerca, niente bottoni azione */}
        <div className="table-header-controls" style={{ justifyContent: 'flex-start' }}>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Cerca utente..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                />
                <button className="search-btn" onClick={handleSearchClick}>
                    Cerca
                </button>
            </div>
            
            {/* Qui abbiamo rimosso il div "action-buttons".
               Se in futuro vorrai aggiungere azioni (es. "Esporta Utenti"), 
               puoi rimetterlo qui.
            */}
        </div>
        
        {/* Tabella Riutilizzabile */}
        <ReusableTable 
            data={usersList} 
            columns={userColumns} 
            selectedUserIds={selectedUserIds}
            onRowSelect={toggleUserSelection}
        />
      </div>
    </div>
  );
};

export default UtentiAdmin;