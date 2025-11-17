// UserManagementPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../components/TableReusable';
// Importa la lista chiamandola 'utenti'
import { users as utenti } from '../dati_fittizzi/users'; 

const Utenti = () => {
    const navigate = useNavigate();
  // 1. Stato per i dati (l'unica fonte di verità modificabile)
  const [usersList, setUsersList] = useState(utenti);
  // 2. Stato per il termine di ricerca nell'input
  const [searchTerm, setSearchTerm] = useState('');
  // 3. Stato per tenere traccia degli ID degli utenti selezionati
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // --- Logica di Filtraggio (Eseguita solo al click su "Cerca") ---

  const handleSearchClick = () => {
    // Il filtraggio avviene utilizzando la lista 'utenti' originale
    if (searchTerm.trim() === '') {
      // Se la ricerca è vuota, resetta alla lista iniziale 'utenti'
      setUsersList(utenti);
    } else {
      const filtered = utenti.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsersList(filtered);
    }
    // Opzionale: deseleziona tutto dopo una nuova ricerca
    setSelectedUserIds([]); 
  };

  // --- Logica Aggiungi Agente ---
   const handleAddAgent = () => {
    // Naviga alla nuova rotta per il form
    navigate('/admin/utenti/aggiungi agente');
    // La logica di creazione utente sarà gestita nel AddAgentPage.jsx
  };

  // --- Logica Rimuovi Agente ---
   const handleRemoveAgents = () => {
    if (selectedUserIds.length === 0) return;

    if (window.confirm(`Sei sicuro di voler rimuovere ${selectedUserIds.length} agente/i?`)) {
      const remainingUsers = usersList.filter(user => !selectedUserIds.includes(user.id));
      setUsersList(remainingUsers);
      setSelectedUserIds([]);

      // Rimuovi anche dall'array iniziale importato (hack per fittizi)
      selectedUserIds.forEach(id => {
        const index = utenti.findIndex(u => u.id === id);
        if (index > -1) utenti.splice(index, 1);
      });
    }
  };

  // --- Logica Selezione Checkbox ---
  const toggleUserSelection = (userId) => {
    setSelectedUserIds(prevIds => {
      if (prevIds.includes(userId)) {
        return prevIds.filter(id => id !== userId); // Deseleziona
      } else {
        return [...prevIds, userId]; // Seleziona
      }
    });
  };

  // Configurazione delle colonne passate alla tabella
  const userColumns = [
    { key: 'fullName', header: 'Nome e cognome' },
    { key: 'id', header: 'ID Agente' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Telefono' },
    { key: 'status', header: 'Stato' },
  ];

  return (
    <div className="user-management-page">
      <h1>Gestione Agenti</h1>
      
      <div className="user-table-card">
        
        {/* Header con controlli */}
        <div className="table-header-controls">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Cerca da nome, ID, email" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                />
                <button className="search-btn" onClick={handleSearchClick}>
                    Cerca
                </button>
            </div>
            <div className="action-buttons">
                <button className="add-agent-btn" onClick={handleAddAgent}>
                    Aggiungi agente
                </button>
                <button 
                    className="remove-agent-btn" 
                    onClick={handleRemoveAgents}
                    disabled={selectedUserIds.length === 0} 
                >
                    Rimuovi agente
                </button>
            </div>
        </div>
        
        {/* Passa i dati filtrati e la logica di selezione alla tabella */}
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

export default Utenti;
