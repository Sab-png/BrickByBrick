import { useState } from 'react';

import FiltersContext from '../store/filters-context';

export default function FiltersContextProvider({ children }) {
  const [filters, setFilters] = useState({
    citta: '',
    tipologia: '',
    contratto: '',
    prezzo: { min: '', max: '' },
    superficie: { min: '', max: '' },
    camere: '',
    bagni: '',
    piano: '',
    balcone: '',
    box_auto: '',
    arredato: false,
    terrazzo: false,
    giardino: false,
    cantina: false,
    ascensore: false,
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  function updateFilter(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }

  function updateRangeFilter(key, type, value) {
    setFilters(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value
      }
    }));
  }

  function resetFilters() {
    setFilters({
      citta: '',
      tipologia: '',
      contratto: '',
      prezzo: { min: '', max: '' },
      superficie: { min: '', max: '' },
      camere: '',
      bagni: '',
      piano: '',
      balcone: '',
      box_auto: '',
      arredato: false,
      terrazzo: false,
      giardino: false,
      cantina: false,
      ascensore: false,
    });
  }

  function toggleAdvancedFilters() {
    setShowAdvancedFilters(prev => !prev);
  }

  // Valore del Context
  const ctxValue = {
    filters,
    showAdvancedFilters,
    updateFilter,
    updateRangeFilter,
    resetFilters,
    toggleAdvancedFilters,
  };

  return (
    <FiltersContext.Provider value={ctxValue}>
      {children}
    </FiltersContext.Provider>
  );
}