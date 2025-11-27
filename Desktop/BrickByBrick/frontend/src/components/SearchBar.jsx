import { useContext } from 'react';
import  FiltersContext  from '../store/filters-context';

export default function SearchBar() {
  const { filters, updateFilter, toggleAdvancedFilters, showAdvancedFilters } = useContext(FiltersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Il filtro è già applicato tramite updateFilter
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-bar__form">
        <input
          type="text"
          placeholder="Cerca una città"
          value={filters.citta}
          onChange={(e) => updateFilter('citta', e.target.value)}
          className="search-bar__input"
        />
        <button type="submit" className="search-bar__button">
          <i className="fas fa-search"></i> Cerca
        </button>
      </form>

      <button 
        type="button"
        className="search-bar__advanced-toggle"
        onClick={toggleAdvancedFilters}
      >
        <i className={`fas fa-chevron-${showAdvancedFilters ? 'up' : 'down'}`}></i>
        {showAdvancedFilters ? 'Chiudi filtri avanzati' : 'Ricerca Avanzata'}
      </button>
    </div>
  );
}