/**
 * @fileoverview Componente filtri principale con SearchBar e AdvancedFilters.
 * Gestisce visibilità condizionale dei filtri avanzati.
 * 
 * @module Filters
 * @requires react
 * @requires ../store/filters-context
 * @requires ./SearchBar
 * @requires ./AdvancedFilters
 */

import { useContext } from 'react';
import  FiltersContext  from '../store/filters-context';

import SearchBar from './SearchBar';
import AdvancedFilters from './AdvancedFilters';

export default function Filters() {
  const { showAdvancedFilters } = useContext(FiltersContext);

  return (
    <section className="filters">
      <div className="filters__container">
        <SearchBar />
        {showAdvancedFilters && <AdvancedFilters />}
      </div>
    </section>
  );
}