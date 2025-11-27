import { useState, useEffect, useCallback } from 'react';


const API_BASE_URL = 'http://localhost:8085'; // Sostituisci con l'URL reale del tuo backend


const useAgents = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [filters, setFilters] = useState({});

    // --- 2. LOGICA DI LETTURA E FILTRAGGIO (GET /agenti) ---
    const fetchAgents = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Endpoint: /api/agenti?search=term
            const searchParam = filters.search ? `?search=${filters.search}` : '';
            const url = `${API_BASE_URL}/api/agenti${searchParam}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const agentList = await response.json();
            
            setData(agentList);
            
        } catch (err) {
            setError(new Error(`Errore nel caricamento dei dati: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // --- 3. LOGICA DI LETTURA SINGOLA (GET /api/agenti/{id}) ---
    // Usata da AgentForm per pre-popolare i campi di modifica
    const getAgentById = async (id) => {
        try {
            // Endpoint: /api/agenti/{id}
            const url = `${API_BASE_URL}/api/agenti/${id}`; 
            const response = await fetch(url);

            if (!response.ok) {
                 // Lancia un errore se l'agente non esiste o il server risponde male
                throw new Error(`Impossibile trovare l'agente ${id}. Errore: ${response.status}`);
            }

            const agentData = await response.json();
            return agentData;
        } catch (err) {
            console.error("Errore nel recupero agente:", err);
            // Rilancia l'errore con un messaggio più amichevole
            throw new Error(err.message || "Impossibile caricare i dati dell'agente selezionato.");
        }
    };

    // --- 4. LOGICA DI ELIMINAZIONE (DELETE /api/agenti/{id}) ---
    const removeAgents = async (ids) => {
        if (ids.length === 0) return;
        
        setIsLoading(true);
        setError(null);

        try {
            // Eseguiamo una chiamata DELETE per ogni ID
            for (const id of ids) {
                // Endpoint: /api/agenti/{id}
                const url = `${API_BASE_URL}/api/agenti/${id}`;
                
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Impossibile eliminare l'agente ${id}: ${response.status}`);
                }
            }
            
            // Ricarica la lista completa dopo l'eliminazione
            await fetchAgents(); 
            
        } catch (err) {
            setError(new Error(`Errore durante l'eliminazione: ${err.message}`));
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. LOGICA DI CREAZIONE/AGGIORNAMENTO (POST /api/agenti | PUT /api/agenti/{id}) ---
    const saveAgent = async (agentId, payload, mode) => {
        setIsLoading(true);
        setError(null);
        
        // Il payload arriva già con i nomi corretti dal form
        const apiPayload = {
            ...payload
        };

        let url = '';
        let method = '';
        
        if (mode === 'add') {
            // Endpoint Aggiunta: POST /api/agenti
            url = `${API_BASE_URL}/api/agenti`;
            method = 'POST';
        } else {
            // Endpoint Modifica: PUT /api/agenti/{id}
            url = `${API_BASE_URL}/api/agenti/${agentId}`;
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
                throw new Error(`Salvataggio fallito. Risposta: ${response.status} - ${errorText}`);
            }
            
            // Ricarica la lista per aggiornare l'UI
            await fetchAgents(); 

        } catch (err) {
            setError(new Error(`Errore durante il salvataggio: ${err.message}`));
            throw err; 
        } finally {
            setIsLoading(false);
        }
    };

    // --- 6. EFFETTI COLLATERALI (Fetch Iniziale) ---
    useEffect(() => {
        // Esegue il fetch iniziale dei dati al montaggio del componente.
        fetchAgents();
    }, [fetchAgents]);

    // --- 7. VALORI RESTITUITI ---
    return { 
        data, 
        isLoading, 
        error, 
        refetch: fetchAgents, 
        setFilters,
        removeAgents,
        saveAgent,
        getAgentById, // ESPORTATO per essere usato nel Form di modifica
    };
};

export default useAgents;