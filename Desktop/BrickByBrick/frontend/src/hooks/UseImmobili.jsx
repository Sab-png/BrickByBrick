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
            const searchParam = filters.search ? `?search=${filters.search}` : '';
            // Ho modificato l'endpoint base da '/api/agenti' a '/api/immobili'
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

    // --- 3. LOGICA DI LETTURA SINGOLA (GET /immobili/edit/{id}) ---
    /**
     * @function getImmobileById
     * Recupera i dati di un singolo immobile per la modifica.
     */
    const getImmobileById = async (id) => {
        try {
            // Endpoint: /immobili/edit/{id}
            const url = `${API_BASE_URL}/immobili/edit/${id}`;
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

    // --- 4. LOGICA DI ELIMINAZIONE (GET /immobili/delete/{id}) ---
    /**
     * @function removeImmobili
     * Elimina uno o più immobili specificati dagli ID.
     */
    const removeImmobili = async (ids) => {
        if (ids.length === 0) return;

        setIsLoading(true);
        setError(null);

        try {
            // Eseguiamo una chiamata GET per ogni ID (come nel tuo backend per gli agenti)
            for (const id of ids) {
                // Endpoint: /immobili/delete/{id}
                const url = `${API_BASE_URL}/immobili/delete/${id}`;

                const response = await fetch(url, {
                    method: 'GET', // Metodo specifico del tuo backend
                });

                if (!response.ok) {
                    throw new Error(`Impossibile eliminare l'immobile ${id}: ${response.status}`);
                }
            }

            // Ricarica la lista completa dopo l'eliminazione
            await fetchImmobili();

        } catch (err) {
            setError(new Error(`Errore durante l'eliminazione: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. LOGICA DI CREAZIONE/AGGIORNAMENTO (POST /immobili/add | POST /immobili/update/{id}) ---
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

        // Mappatura dei dati dal form (le chiavi del payload sono già corrette dal form)
        // Adatta questi campi ai nomi effettivi del tuo modello Immobile
        const apiPayload = {
            title: payload.title, // Esempio
            address: payload.address, // Esempio
            price: payload.price, // Esempio
            // ... altri campi come description, type, city, etc.
            ...payload // Se il payload del form corrisponde già al modello API
        };

        let url = '';

        if (mode === 'add') {
            // Endpoint Aggiunta: /immobili/add
            url = `${API_BASE_URL}/immobili/add`;
        } else {
            // Endpoint Modifica: /immobili/update/{id}
            url = `${API_BASE_URL}/immobili/update/${immobileId}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST', // Usato per entrambe le operazioni
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