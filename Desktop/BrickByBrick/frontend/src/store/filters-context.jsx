/**
 * @fileoverview Context React per gestione filtri ricerca immobili.
 * Definisce la struttura dati e funzioni per filtri.
 * 
 * @module filters-context
 * @requires react
 */

import { createContext } from "react";

/**
 * Context Filtri Ricerca
 * 
 * Stato globale per filtri ricerca immobili:
 * - Filtri semplici (città, tipologia, contratto)
 * - Filtri range (prezzo, superficie)
 * - Filtri numerici (camere, bagni, piano)
 * - Filtri boolean (caratteristiche immobile)
 * - Visibilità filtri avanzati
 * - Funzioni di aggiornamento e reset
 * 
 * @typedef {Object} FiltersContextType
 * @property {Object} filters - Oggetto con tutti i filtri
 * @property {string} filters.citta - Città ricerca
 * @property {string} filters.tipologia - Tipologia immobile (Appartamento, Villa, ecc.)
 * @property {string} filters.contratto - Tipo contratto (Vendita/Affitto)
 * @property {Object} filters.prezzo - Range prezzo {min, max}
 * @property {Object} filters.superficie - Range superficie {min, max}
 * @property {string} filters.camere - Numero camere
 * @property {string} filters.bagni - Numero bagni
 * @property {string} filters.piano - Piano
 * @property {string} filters.balcone - Balcone (Sì/No)
 * @property {string} filters.box_auto - Box auto (Sì/No)
 * @property {boolean} filters.arredato - Arredato
 * @property {boolean} filters.terrazzo - Terrazzo
 * @property {boolean} filters.giardino - Giardino
 * @property {boolean} filters.cantina - Cantina
 * @property {boolean} filters.ascensore - Ascensore
 * @property {boolean} showAdvancedFilters - Visibilità filtri avanzati
 * @property {Function} updateFilter - Aggiorna singolo filtro(key, value)
 * @property {Function} updateRangeFilter - Aggiorna range(key, type, value)
 * @property {Function} resetFilters - Reset tutti i filtri
 * @property {Function} toggleAdvancedFilters - Toggle visibilità filtri avanzati
 * 
 * @type {React.Context<FiltersContextType>}
 * 
 * @example
 * // Uso del context
 * import { useContext } from 'react';
 * import FiltersContext from '../store/filters-context';
 * 
 * const { filters, updateFilter, resetFilters } = useContext(FiltersContext);
 * updateFilter('citta', 'Torino');
 * 
 * @example
 * // Aggiornamento range
 * const { updateRangeFilter } = useContext(FiltersContext);
 * updateRangeFilter('prezzo', 'min', 100000);
 * updateRangeFilter('prezzo', 'max', 300000);
 */
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