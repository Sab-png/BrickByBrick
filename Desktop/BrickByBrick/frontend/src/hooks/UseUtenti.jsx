/**
 * @fileoverview Hook personalizzato per gestione CRUD utenti.
 * Fornisce funzioni per fetch, modifica ed eliminazione utenti.
 * Nota: La creazione utenti avviene tramite registrazione pubblica.
 * 
 * @module UseUtenti
 * @requires react
 */

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8085';

/**
 * Hook per gestione utenti
 * 
 * Funzionalità:
 * - Fetch lista utenti con ricerca
 * - Recupero singolo utente per ID
 * - Modifica utente esistente
 * - Eliminazione utente
 * - Gestione filtri
 * 
 * Nota: Non include createUtente perché la registrazione
 * avviene tramite endpoint pubblico di registrazione.
 * 
 * @hook
 * @returns {Object} Oggetto con stati e funzioni
 * @returns {Array<Object>} returns.data - Lista utenti
 * @returns {boolean} returns.isLoading - Stato caricamento
 * @returns {Error|null} returns.error - Errore eventuale
 * @returns {Function} returns.fetchUtenti - Recupera lista
 * @returns {Function} returns.getUtenteById - Recupera singolo utente
 * @returns {Function} returns.updateUtente - Aggiorna utente
 * @returns {Function} returns.deleteUtente - Elimina utente
 * @returns {Function} returns.applyFilters - Applica filtri
 * 
 * @example
 * const { data, updateUtente, deleteUtente } = useUtenti();
 * 
 * await updateUtente(5, { ruolo: 'AGENTE' });
 * await deleteUtente(10);
 */
const useUtenti = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [filters, setFilters] = useState({});

    // --- 2. LOGICA DI LETTURA E FILTRAGGIO (GET /utenti) ---
    const fetchUtenti = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Endpoint: /api/utenti?search=term
            const searchParam = filters.search ? `?search=${encodeURIComponent(filters.search)}` : '';
            const url = `${API_BASE_URL}/api/utenti${searchParam}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const utentiList = await response.json();
            
            setData(utentiList);
            
        } catch (err) {
            setError(new Error(`Errore nel caricamento dei dati: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // --- 3. LOGICA DI LETTURA SINGOLA (GET /api/utenti/{id}) ---
    const getUtenteById = async (id) => {
        try {
            const url = `${API_BASE_URL}/api/utenti/${id}`; 
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Impossibile trovare l'utente ${id}. Errore: ${response.status}`);
            }

            const utenteData = await response.json();
            return utenteData;
        } catch (err) {
            console.error("Errore nel recupero utente:", err);
            throw new Error(err.message || "Impossibile caricare i dati dell'utente selezionato.");
        }
    };

    // --- 4. LOGICA DI ELIMINAZIONE (DELETE /api/utenti/{id}) ---
    const removeUtenti = async (ids) => {
        if (ids.length === 0) return;
        
        setIsLoading(true);
        setError(null);

        try {
            // Eseguiamo una chiamata DELETE per ogni ID
            for (const id of ids) {
                const url = `${API_BASE_URL}/api/utenti/delete/${id}`;
                
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Errore sconosciuto');
                    throw new Error(`Impossibile eliminare l'utente ${id}: ${response.status} - ${errorText}`);
                }
                
                console.log(`Utente ${id} eliminato con successo`);
            }
            
            // Ricarica la lista completa dopo l'eliminazione
            await fetchUtenti(); 
            
        } catch (err) {
            const errorMessage = err.message.includes('foreign key constraint') || err.message.includes('a foreign key constraint fails')
                ? `Impossibile eliminare l'utente: è associato a dei dati esistenti (visite, contratti, ecc.). Rimuovi prima le associazioni.`
                : `Errore durante l'eliminazione: ${err.message}`;
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. EFFETTI COLLATERALI (Fetch Iniziale) ---
    useEffect(() => {
        fetchUtenti();
    }, [fetchUtenti]);

    // --- 6. VALORI RESTITUITI ---
    return { 
        data, 
        isLoading, 
        error, 
        refetch: fetchUtenti, 
        setFilters,
        removeUtenti,
        getUtenteById,
    };
};

export default useUtenti;
