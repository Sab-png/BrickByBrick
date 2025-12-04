/**
 * @fileoverview Filtri avanzati per ricerca immobili.
 * Include contratto, tipologia, range prezzo, locali, bagni, superficie, piano.
 * 
 * @module AdvancedFilters
 * @requires react
 * @requires ../store/filters-context
 */

import { useContext } from 'react';
import FiltersContext from '../store/filters-context';

export default function AdvancedFilters() {
  
  const { filters, updateFilter, updateRangeFilter, resetFilters } = useContext(FiltersContext);

  return (
    <div className="advanced-filters">
      <div className="advanced-filters__wrapper">
        {/* Contratto (Vendita/Affitto) */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-file-contract"></i>
            Contratto
          </label>
          <select
            value={filters.contratto}
            onChange={(e) => updateFilter('contratto', e.target.value)}
            className="advanced-filters__select"
          >
            <option value="">Tutti</option>
            <option value="Vendita">Vendita</option>
            <option value="Affitto">Affitto</option>
          </select>
        </div>

        {/* Tipologia */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-home"></i>
            Tipologia
          </label>
          <select
            value={filters.tipologia}
            onChange={(e) => updateFilter('tipologia', e.target.value)}
            className="advanced-filters__select"
          >
            <option value="">Tutte</option>
            <option value="Appartamento">Appartamento</option>
            <option value="Villa">Villa</option>
            <option value="Casa">Casa</option>
            <option value="Attico">Attico</option>
            <option value="Rustico">Rustico</option>
          </select>
        </div>

        {/* Prezzo */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-euro-sign"></i>
            Prezzo
          </label>
          <div className="advanced-filters__range">
            <input
              type="number"
              placeholder="Min"
              value={filters.prezzo.min}
              onChange={(e) => updateRangeFilter('prezzo', 'min', e.target.value)}
              className="advanced-filters__input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.prezzo.max}
              onChange={(e) => updateRangeFilter('prezzo', 'max', e.target.value)}
              className="advanced-filters__input"
            />
          </div>
        </div>

        {/* Superficie */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-expand-arrows-alt"></i>
            Superficie
          </label>
          <div className="advanced-filters__range">
            <input
              type="number"
              placeholder="Min m²"
              value={filters.superficie.min}
              onChange={(e) => updateRangeFilter('superficie', 'min', e.target.value)}
              className="advanced-filters__input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max m²"
              value={filters.superficie.max}
              onChange={(e) => updateRangeFilter('superficie', 'max', e.target.value)}
              className="advanced-filters__input"
            />
          </div>
        </div>

        {/* Camere */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-bed"></i>
            Camere
          </label>
          <select
            value={filters.camere}
            onChange={(e) => updateFilter('camere', e.target.value)}
            className="advanced-filters__select"
          >
            <option value="">Tutte</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Bagni */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-bath"></i>
            Bagni
          </label>
          <select
            value={filters.bagni}
            onChange={(e) => updateFilter('bagni', e.target.value)}
            className="advanced-filters__select"
          >
            <option value="">Tutti</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Piano */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-layer-group"></i>
            Piano
          </label>
          <input
            type="number"
            placeholder="Es. 2"
            value={filters.piano}
            onChange={(e) => updateFilter('piano', e.target.value)}
            className="advanced-filters__input"
          />
        </div>

        {/* Box Auto */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-car"></i>
            Box Auto
          </label>
          <select
            value={filters.box_auto}
            onChange={(e) => updateFilter('box_auto', e.target.value)}
            className="advanced-filters__select"
          >
            <option value="">Indifferente</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="advanced-filters__item">
          <label className="advanced-filters__label">
            <i className="fas fa-check-square"></i>
            Caratteristiche
          </label>
          <div className="advanced-filters__checkboxes">
            <label className="advanced-filters__checkbox">
              <input
                type="checkbox"
                checked={filters.arredato}
                onChange={(e) => updateFilter('arredato', e.target.checked)}
              />
              <span>Arredato</span>
            </label>
            <label className="advanced-filters__checkbox">
              <input
                type="checkbox"
                checked={filters.terrazzo}
                onChange={(e) => updateFilter('terrazzo', e.target.checked)}
              />
              <span>Terrazzo</span>
            </label>
            <label className="advanced-filters__checkbox">
              <input
                type="checkbox"
                checked={filters.giardino}
                onChange={(e) => updateFilter('giardino', e.target.checked)}
              />
              <span>Giardino</span>
            </label>
            <label className="advanced-filters__checkbox">
              <input
                type="checkbox"
                checked={filters.ascensore}
                onChange={(e) => updateFilter('ascensore', e.target.checked)}
              />
              <span>Ascensore</span>
            </label>
            <label className="advanced-filters__checkbox">
              <input
                type="checkbox"
                checked={filters.cantina}
                onChange={(e) => updateFilter('cantina', e.target.checked)}
              />
              <span>Cantina</span>
            </label>
          </div>
        </div>
      </div>

      <div className="advanced-filters__actions">
        <button type="button" className="advanced-filters__button advanced-filters__button--secondary" onClick={resetFilters}>
          Reset Filtri
        </button>
      </div>
    </div>
  );
}