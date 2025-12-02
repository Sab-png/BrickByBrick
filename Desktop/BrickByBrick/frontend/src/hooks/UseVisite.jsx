import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8085';

/**
 * Hook personalizzato per la gestione delle visite
 * Gestisce fetch, filtri, eliminazione e recupero singola visita
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
