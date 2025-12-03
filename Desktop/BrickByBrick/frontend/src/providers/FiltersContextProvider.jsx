/**
 * @fileoverview Provider per contesto filtri ricerca immobili.
 * Gestisce stato filtri avanzati e ricerca.
 * 
 * @module FiltersContextProvider
 * @requires react
 * @requires ../store/filters-context
 */

import { useState } from 'react';

import FiltersContext from '../store/filters-context';

/**
 * Provider per Filtri Ricerca
 * 
 * Funzionalità:
 * - Gestione filtri semplici (città, tipologia, contratto)
 * - Filtri range (prezzo, superficie)
 * - Filtri numerici (camere, bagni, piano)
 * - Filtri boolean (balcone, box_auto, arredato, ecc.)
 * - Toggle visibilità filtri avanzati
 * - Reset completo filtri
 * 
 * Filtri disponibili:
 * - citta, tipologia, contratto
 * - prezzo.min/max, superficie.min/max
 * - camere, bagni, piano
 * - balcone, box_auto
 * - arredato, terrazzo, giardino, cantina, ascensore
 * 
 * @component
 * @param {Object} props - Proprietà del provider
 * @param {React.ReactNode} props.children - Componenti figli
 * @returns {JSX.Element} Provider con contesto filtri
 * 
 * @example
 * // Avvolgi componenti ricerca
 * <FiltersContextProvider>
 *   <SearchBar />
 *   <AdvancedFilters />
 *   <ImmobiliResults />
 * </FiltersContextProvider>
 * 
 * @example
 * // Uso del contesto
 * const { filters, updateFilter, updateRangeFilter, resetFilters } = useContext(FiltersContext);
 * 
 * updateFilter('citta', 'Torino');
 * updateRangeFilter('prezzo', 'min', 100000);
 * resetFilters();
 */
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