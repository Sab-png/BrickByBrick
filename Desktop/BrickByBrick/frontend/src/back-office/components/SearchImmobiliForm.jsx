// SearchImmobiliForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable from './TableReusable';
import { immobiliFittizi } from '../dati_fittizzi/immobili';
import '../../styles/components/_searchImmobiliForm.scss';

const SearchImmobiliForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [selectedImmobiliIds, setSelectedImmobiliIds] = useState([]);
  const [immobili, setImmobili] = useState(immobiliFittizi);

  // Definisci le colonne per la tabella
  const columns = [
    { key: 'foto', header: 'Immobile', isImage: true },
    { key: 'citta', header: 'Città' },
    { key: 'indirizzo', header: 'Indirizzo' },
    { key: 'prezzo', header: 'Prezzo' },
    { key: 'status', header: 'Stato' }
  ];

  // Gestisci la ricerca quando si clicca il pulsante
  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  // Filtra gli immobili in base al termine di ricerca attivo
  const filteredImmobili = immobili.filter((immobile) => {
    const searchLower = activeSearchTerm.toLowerCase();
    return (
      immobile.titolo.toLowerCase().includes(searchLower) ||
      immobile.indirizzo.toLowerCase().includes(searchLower) ||
      immobile.citta.toLowerCase().includes(searchLower) ||
      immobile.prezzo.toLowerCase().includes(searchLower) ||
      immobile.status.toLowerCase().includes(searchLower)
    );
  });

  // Gestisci la selezione delle righe
  const handleRowSelect = (id) => {
    console.log('ID selezionato:', id, 'Tipo:', typeof id);
    setSelectedImmobiliIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((immobileId) => immobileId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Gestisci la modifica dell'immobile selezionato
  const handleEdit = () => {
    if (selectedImmobiliIds.length === 1) {
      navigate(`/admin/immobili/modifica/${selectedImmobiliIds[0]}`);
    }
  };

  // Gestisci la cancellazione degli immobili selezionati
  const handleDelete = () => {
    if (selectedImmobiliIds.length === 0) {
      alert('Nessun immobile selezionato');
      return;
    }

    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare ${selectedImmobiliIds.length} immobile/i?`
    );

    if (confirmed) {
      // Filtra via gli immobili selezionati
      console.log('IDs da eliminare:', selectedImmobiliIds);
      console.log('Immobili correnti:', immobili.map(i => ({ id: i.id, tipo: typeof i.id })));

      setImmobili((prevImmobili) => {
        const nuoviImmobili = prevImmobili.filter((immobile) => {
          // Confronto sia con conversione che senza per sicurezza
          const isSelected = selectedImmobiliIds.includes(immobile.id) ||
                           selectedImmobiliIds.includes(String(immobile.id)) ||
                           selectedImmobiliIds.includes(Number(immobile.id));
          console.log(`Immobile ${immobile.id} (${immobile.titolo}) - Selezionato: ${isSelected}`);
          return !isSelected;
        });
        console.log('Immobili prima:', prevImmobili.length, 'Immobili dopo:', nuoviImmobili.length);
        return nuoviImmobili;
      });
      setSelectedImmobiliIds([]);
      alert('Immobili eliminati con successo!');
    }
  };

  return (
    <div className="search-immobili-container">
      <div className="search-header">
        <h2>Gestione Immobili</h2>

        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cerca per immobile, indirizzo, città..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="search-input"
            />
            <button
              onClick={handleSearch}
              className="search-button"
            >
              Cerca
            </button>
          </div>

          <div className="action-buttons">
            <button
              className="add-button"
              onClick={() => navigate('/admin/immobili/aggiungi')}
            >
              Aggiungi Immobile
            </button>
            <button
              className="edit-button"
              onClick={handleEdit}
              disabled={selectedImmobiliIds.length !== 1}
            >
              Modifica Immobile
            </button>
            {selectedImmobiliIds.length > 0 && (
              <button
                onClick={handleDelete}
                className="delete-button"
              >
                Elimina Selezionati ({selectedImmobiliIds.length})
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Trovati {filteredImmobili.length} immobili</p>
      </div>

      <ReusableTable
        data={filteredImmobili}
        columns={columns}
        selectedUserIds={selectedImmobiliIds}
        onRowSelect={handleRowSelect}
      />
    </div>
  );
};

export default SearchImmobiliForm;
