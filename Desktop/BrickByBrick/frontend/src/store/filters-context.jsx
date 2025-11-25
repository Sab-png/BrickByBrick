import { createContext } from "react";

const FiltersContext = createContext({
  filters: {
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
  },
  showAdvancedFilters: false,
  updateFilter: () => {},
  updateRangeFilter: () => {},
  resetFilters: () => {},
  toggleAdvancedFilters: () => {},
});

export default FiltersContext;