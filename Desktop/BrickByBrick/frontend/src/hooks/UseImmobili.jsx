import { useState, useEffect, useCallback } from 'react';

// Sostituisci con l'URL reale del tuo backend
const API_BASE_URL = 'http://localhost:8085';


const useImmobiliManager = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]); // Lista degli immobili
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({}); // Filtri per la ricerca

    // --- 2. LOGICA DI LETTURA E FILTRAGGIO (GET /immobili) ---
    /**
     * @function fetchImmobili
     * Carica la lista degli immobili, applicando i filtri di ricerca.
     */
    const fetchImmobili = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Endpoint: /api/immobili?search=term
            // Si presume che il backend usi un parametro 'search'
            const searchParam = filters.search ? `?search=${encodeURIComponent(filters.search)}` : '';
            const url = `${API_BASE_URL}/api/immobili${searchParam}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
            }

            const immobileList = await response.json();

            setData(immobileList);

        } catch (err) {
            setError(new Error(`Errore nel caricamento dei dati: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // --- 3. LOGICA DI LETTURA SINGOLA (GET /api/immobili/{id}) ---
    /**
     * @function getImmobileById
     * Recupera i dati di un singolo immobile per la modifica.
     */
    const getImmobileById = async (id) => {
        try {
            // Endpoint: /api/immobili/{id}
            const url = `${API_BASE_URL}/api/immobili/${id}`;
            const response = await fetch(url);

            if (!response.ok) {
                // Lancia un errore se l'immobile non esiste o il server risponde male
                throw new Error(`Impossibile trovare l'immobile ${id}. Errore: ${response.status}`);
            }

            const immobileData = await response.json();
            return immobileData;

        } catch (err) {
            console.error("Errore nel recupero immobile:", err);
            // Rilancia l'errore con un messaggio più amichevole
            throw new Error(err.message || "Impossibile caricare i dati dell'immobile selezionato.");
        }
    };

    // --- 4. LOGICA DI ELIMINAZIONE (DELETE /api/immobili/{id}) ---
    /**
     * @function removeImmobili
     * Elimina uno o più immobili specificati dagli ID.
     */
    const removeImmobili = async (ids) => {
        if (ids.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            // Eseguiamo una chiamata DELETE per ogni ID
            for (const id of ids) {
                // Endpoint: /api/immobili/delete/{id}
                const url = `${API_BASE_URL}/api/immobili/delete/${id}`;

                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Errore sconosciuto');
                    throw new Error(`Impossibile eliminare l'immobile ${id}: ${response.status} - ${errorText}`);
                }
                
                console.log(`Immobile ${id} eliminato con successo`);
            }

            // Ricarica la lista completa dopo l'eliminazione
            await fetchImmobili();

        } catch (err) {
            const errorMessage = err.message.includes('foreign key constraint') || err.message.includes('a foreign key constraint fails')
                ? `Impossibile eliminare l'immobile: è associato a delle visite. Elimina prima le visite collegate.`
                : `Errore durante l'eliminazione: ${err.message}`;
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. LOGICA DI CREAZIONE/AGGIORNAMENTO (POST /api/immobili | PUT /api/immobili/{id}) ---
    /**
     * @function saveImmobile
     * Salva (crea o modifica) un immobile.
     * @param {string | null} immobileId - ID dell'immobile (null per l'aggiunta)
     * @param {object} payload - Dati del form
     * @param {'add' | 'edit'} mode - Modalità operazione
     */
    const saveImmobile = async (immobileId, payload, mode) => {
        setIsLoading(true);
        setError(null);

        // Mappatura dei dati dal form
        const apiPayload = {
            ...payload
        };

        let url = '';
        let method = '';

        if (mode === 'add') {
            // Endpoint Aggiunta: POST /api/immobili
            url = `${API_BASE_URL}/api/immobili`;
            method = 'POST';
        } else {
            // Endpoint Modifica: PUT /api/immobili/edit/{id}
            url = `${API_BASE_URL}/api/immobili/edit/${immobileId}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Salvataggio immobile fallito. Risposta: ${response.status} - ${errorText}`);
            }

            // Ricarica la lista per aggiornare l'UI
            await fetchImmobili();

        } catch (err) {
            setError(new Error(`Errore durante il salvataggio dell'immobile: ${err.message}`));
            throw err; // Rilancia per gestire l'errore nel componente Form
        } finally {
            setIsLoading(false);
        }
    };

    // --- 6. EFFETTI COLLATERALI (Fetch Iniziale) ---
    useEffect(() => {
        // Esegue il fetch iniziale dei dati al montaggio del componente
        fetchImmobili();
    }, [fetchImmobili]); // Dipendenza da fetchImmobili (stabile grazie a useCallback)

    // --- 7. VALORI RESTITUITI ---
    return {
        data, // Lista degli immobili
        isLoading,
        error,
        refetch: fetchImmobili, // Funzione per ricaricare esplicitamente
        setFilters, // Per aggiornare i filtri e far scattare un nuovo fetch
        removeImmobili,
        saveImmobile,
        getImmobileById, // Per il Form di modifica
    };
};

export default useImmobiliManager;