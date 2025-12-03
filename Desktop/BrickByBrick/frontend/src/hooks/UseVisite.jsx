/**
 * @fileoverview Hook personalizzato per gestione visite immobili.
 * Supporta filtro per agente specifico e gestione CRUD completa.
 * 
 * @module UseVisite
 * @requires react
 */

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8085';

/**
 * Hook per gestione visite
 * 
 * Funzionalità:
 * - Fetch lista visite (tutte o filtrate per agente)
 * - Recupero singola visita per ID
 * - Modifica visita esistente
 * - Eliminazione visita
 * - Filtro ricerca testuale
 * - Auto-refresh al mount
 * 
 * @hook
 * @param {number|null} [idAgente=null] - ID agente per filtrare visite (null = tutte)
 * @returns {Object} Oggetto con stati e funzioni
 * @returns {Array<Object>} returns.data - Lista visite
 * @returns {boolean} returns.isLoading - Stato caricamento
 * @returns {Error|null} returns.error - Errore eventuale
 * @returns {Function} returns.fetchVisite - Recupera lista visite
 * @returns {Function} returns.getVisitaById - Recupera singola visita
 * @returns {Function} returns.updateVisita - Aggiorna visita
 * @returns {Function} returns.deleteVisita - Elimina visita
 * @returns {Function} returns.applyFilters - Applica filtri ricerca
 * 
 * @example
 * // Tutte le visite
 * const { data, deleteVisita } = useVisite();
 * 
 * @example
 * // Solo visite di un agente
 * const { data, updateVisita } = useVisite(42);
 * await updateVisita(10, { stato: 'completata' });
 */
const useVisite = (idAgente = null) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ search: '' });

    /**
     * Fetch di tutte le visite (o filtrate per agente)
     */
    const fetchVisite = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const url = `${API_BASE_URL}/api/visite`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }

            let visite = await response.json();

            console.log(visite)

            // Se c'è un idAgente, filtra solo le visite di quell'agente
            if (idAgente) {
                visite = visite.filter(v => 
                    (v.id_agente === idAgente || v.Id_agente === idAgente)
                );
            }

            // Applica filtro di ricerca se presente
            if (filters.search && filters.search.trim() !== '') {
                const searchLower = filters.search.toLowerCase();
                visite = visite.filter(visita => {
                    // Cerca in tutti i campi rilevanti
                    const visitaStr = JSON.stringify(visita).toLowerCase();
                    return visitaStr.includes(searchLower);
                });
            }

            setData(visite);
        } catch (err) {
            console.error('Errore nel caricamento delle visite:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [filters, idAgente]);

    /**
     * Recupera una singola visita per ID
     */
    const getVisitaById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/visite/${id}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Impossibile trovare la visita ${id}`);
        }
        
        return await response.json();
    }, []);

    /**
     * Elimina una o più visite
     */
    const removeVisite = useCallback(async (ids) => {
        const idsArray = Array.isArray(ids) ? ids : [ids];
        
        try {
            const deletePromises = idsArray.map(id => 
                fetch(`${API_BASE_URL}/api/visite/delete/${id}`, {
                    method: 'DELETE'
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Errore nell'eliminazione della visita ${id}`);
                    }
                    return id;
                })
            );

            await Promise.all(deletePromises);
            
            // Ricarica i dati dopo l'eliminazione
            await fetchVisite();
        } catch (err) {
            console.error('Errore durante l\'eliminazione:', err);
            throw err;
        }
    }, [fetchVisite]);

    /**
     * Effettua il fetch iniziale e quando cambiano i filtri
     */
    useEffect(() => {
        fetchVisite();
    }, [fetchVisite]);

    return {
        data,
        isLoading,
        error,
        setFilters,
        refetch: fetchVisite,
        removeVisite,
        getVisitaById
    };
};

export default useVisite;
