/**
 * @fileoverview Hook personalizzato per gestione CRUD contratti.
 * Fornisce funzioni per fetch, creazione, modifica ed eliminazione contratti.
 * 
 * @module UseContratti
 * @requires react
 */

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8085';

/**
 * Hook per gestione contratti
 * 
 * Funzionalità:
 * - Fetch lista contratti con ricerca
 * - Recupero singolo contratto per ID
 * - Creazione nuovo contratto
 * - Modifica contratto esistente
 * - Eliminazione contratto
 * - Gestione filtri e stato
 * 
 * @hook
 * @returns {Object} Oggetto con stati e funzioni
 * @returns {Array<Object>} returns.data - Lista contratti
 * @returns {boolean} returns.isLoading - Stato caricamento
 * @returns {Error|null} returns.error - Errore eventuale
 * @returns {Function} returns.fetchContratti - Recupera lista
 * @returns {Function} returns.getContrattoById - Recupera singolo contratto
 * @returns {Function} returns.createContratto - Crea nuovo contratto
 * @returns {Function} returns.updateContratto - Aggiorna contratto
 * @returns {Function} returns.deleteContratto - Elimina contratto
 * @returns {Function} returns.applyFilters - Applica filtri
 * 
 * @example
 * const { data, createContratto, deleteContratto } = useContratti();
 * 
 * await createContratto({ tipo: 'Vendita', id_immobile: 1, ... });
 * await deleteContratto(5);
 */
const useContratti = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [filters, setFilters] = useState({});

    // --- 2. LOGICA DI LETTURA E FILTRAGGIO (GET /api/contratti) ---
    const fetchContratti = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const searchParam = filters.search ? `?search=${filters.search}` : '';
            const url = `${API_BASE_URL}/api/contratti${searchParam}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const contrattiList = await response.json();
            setData(contrattiList);
            
        } catch (err) {
            setError(new Error(`Errore nel caricamento dei contratti: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // --- 3. LOGICA DI LETTURA SINGOLA (GET /api/contratti/{id}) ---
    const getContrattoById = async (id) => {
        try {
            const url = `${API_BASE_URL}/api/contratti/${id}`; 
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Impossibile trovare il contratto ${id}. Errore: ${response.status}`);
            }

            const contrattoData = await response.json();
            return contrattoData;
        } catch (err) {
            console.error("Errore nel recupero contratto:", err);
            throw new Error(err.message || "Impossibile caricare i dati del contratto selezionato.");
        }
    };

    // --- 4. LOGICA DI ELIMINAZIONE (DELETE /api/contratti/delete/{id}) ---
    const removeContratti = async (ids) => {
        if (ids.length === 0) return;
        
        setIsLoading(true);
        setError(null);

        try {
            for (const id of ids) {
                const url = `${API_BASE_URL}/api/contratti/delete/${id}`;
                
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Errore sconosciuto');
                    throw new Error(`Impossibile eliminare il contratto ${id}: ${response.status} - ${errorText}`);
                }
                
                console.log(`Contratto ${id} eliminato con successo`);
            }
            
            await fetchContratti(); 
            
        } catch (err) {
            const errorMessage = `Errore durante l'eliminazione: ${err.message}`;
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. EFFECT: CARICA I DATI QUANDO CAMBIANO I FILTRI ---
    useEffect(() => {
        fetchContratti();
    }, [fetchContratti]);

    // --- 6. RITORNA STATI E FUNZIONI ---
    return {
        data,
        isLoading,
        error,
        refetch: fetchContratti,
        setFilters,
        removeContratti,
        getContrattoById
    };
};

export default useContratti;
