import { useState,useEffect, useMemo } from 'react';

import { useContext } from 'react';
import  FiltersContext  from '../store/filters-context';

import MapSection from './MapSection';
import ImmobileCard from './ImmobileCard';

// import { mockImmobili } from '../data/mockImmobili';


let fetchImmobili = async () => {

  try {

    let res = await fetch("http://localhost:8085/api/immobili");

    let data = await res.json()

    console.log(data)

    return data;

  } catch (error) {
    console.error("Errore: " + error);
  }

}




export default function ImmobiliResults() {

  const [immobili, setImmobili] = useState([])

  useEffect(() => {

  const loadImmobili = async () => {

    const immobiliFetchati = await fetchImmobili();

    setImmobili(immobiliFetchati || []);
  };

  loadImmobili();
  }, []);

  const { filters } = useContext(FiltersContext);
  const [showMap, setShowMap] = useState(true);

  // Applica i filtri agli immobili usando useMemo per performance
  const filteredImmobili = useMemo(() => {
    // let result = [...mockImmobili];
    let result = [...immobili];

    // Filtro per città
    if (filters.citta) {
      result = result.filter(immobile => 
        immobile.citta.toLowerCase().includes(filters.citta.toLowerCase())
      );
    }

    // Filtro per contratto
    if (filters.contratto) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.contratto === filters.contratto
      );
    }

    // Filtro per tipologia
    if (filters.tipologia) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.tipologia === filters.tipologia
      );
    }

    // Filtro per prezzo
    if (filters.prezzo.min) {
      result = result.filter(immobile => immobile.prezzo >= Number(filters.prezzo.min));
    }
    if (filters.prezzo.max) {
      result = result.filter(immobile => immobile.prezzo <= Number(filters.prezzo.max));
    }

    // Filtro per superficie
    if (filters.superficie.min) {
      result = result.filter(immobile => immobile.superficie >= Number(filters.superficie.min));
    }
    if (filters.superficie.max) {
      result = result.filter(immobile => immobile.superficie <= Number(filters.superficie.max));
    }

    // Filtro per camere
    if (filters.camere) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.camere >= Number(filters.camere)
      );
    }

    // Filtro per bagni
    if (filters.bagni) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.bagni >= Number(filters.bagni)
      );
    }

    // Filtro per piano
    if (filters.piano) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.piano === Number(filters.piano)
      );
    }

    // Filtro per box auto
    if (filters.box_auto) {
      result = result.filter(immobile => 
        immobile.caratteristiche?.box_auto >= Number(filters.box_auto)
      );
    }

    // Filtri booleani
    if (filters.arredato) {
      result = result.filter(immobile => immobile.caratteristiche?.arredato === true);
    }
    if (filters.terrazzo) {
      result = result.filter(immobile => immobile.caratteristiche?.terrazzo === true);
    }
    if (filters.giardino) {
      result = result.filter(immobile => immobile.caratteristiche?.giardino === true);
    }
    if (filters.cantina) {
      result = result.filter(immobile => immobile.caratteristiche?.cantina === true);
    }
    if (filters.ascensore) {
      result = result.filter(immobile => immobile.caratteristiche?.ascensore === true);
    }

    return result;
  }, [filters, immobili]);

  console.log("Stato 'immobili':", immobili);
  console.log("Immobili filtrati:", filteredImmobili);
  
    return (
      <div className="immobili-results">
        <div className="immobili-results__container">
          <MapSection isOpen={showMap}
            onToggle={() => setShowMap(!showMap)}
            immobili={filteredImmobili}
          />

          <div className="immobili-results__content">
            <h2 className="immobili-results__title">
              Le nostre case
              <span className="immobili-results__count">
                ({filteredImmobili.length} {filteredImmobili.length === 1 ? 'risultato' : 'risultati'})
              </span>
            </h2>

            <div className="immobili-results__grid">
              {filteredImmobili.length > 0 ? (
                filteredImmobili.map(immobile => (
                  <ImmobileCard key={immobile.id_immobile} immobile={immobile} />
                ))
              ) : (
                <div className="immobili-results__no-results">
                  <i className="fas fa-search"></i>
                  <p>Nessun immobile trovato con i filtri selezionati.</p>
                </div>
              )}
            </div>

            {filteredImmobili.length > 6 && (
              <div className="immobili-results__load-more">
                <button className="immobili-results__load-more-btn">
                  Altre case <i className="fas fa-arrow-down"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
}