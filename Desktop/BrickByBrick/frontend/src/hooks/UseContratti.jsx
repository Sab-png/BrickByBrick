import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8085';

const useContratti = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    // --- 2. LOGICA DI LETTURA (GET /api/contratti) ---
    const fetchContratti = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Endpoint: GET /api/contratti
            const url = `${API_BASE_URL}/api/contratti`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
            }

            const contrattiList = await response.json();

            // Applicazione del filtro lato client (se presente)
            let filteredData = contrattiList;
            if (filters.search && filters.search.trim() !== '') {
                const searchLower = filters.search.toLowerCase().trim();
                filteredData = contrattiList.filter(contratto => {
                    return (
                        (contratto.Id_contratto && contratto.Id_contratto.toString().includes(searchLower)) ||
                        (contratto.Id_immobile && contratto.Id_immobile.toString().includes(searchLower)) ||
                        (contratto.Id_utente && contratto.Id_utente.toString().includes(searchLower)) ||
                        (contratto.prezzo && contratto.prezzo.toLowerCase().includes(searchLower)) ||
                        (contratto.data_di_scadenza && contratto.data_di_scadenza.toString().includes(searchLower))
                    );
                });
            }

            setData(filteredData);

        } catch (err) {
            setError(new Error(`Errore nel caricamento dei dati: ${err.message}`));
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

    // --- 4. LOGICA DI ELIMINAZIONE (DELETE /api/contratti/{id}) ---
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
            const errorMessage = err.message.includes('foreign key constraint') || err.message.includes('a foreign key constraint fails')
                ? `Impossibile eliminare il contratto: è associato a dei dati esistenti. Rimuovi prima le associazioni.`
                : `Errore durante l'eliminazione: ${err.message}`;
            setError(new Error(errorMessage));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // --- 5. LOGICA DI CREAZIONE/AGGIORNAMENTO (POST /api/contratti | PUT /api/contratti/{id}) ---
    const saveContratto = async (contrattoId, payload, mode) => {
        setIsLoading(true);
        setError(null);

        const apiPayload = {
            ...payload
        };

        let url = '';
        let method = '';

        if (mode === 'add') {
            url = `${API_BASE_URL}/api/contratti`;
            method = 'POST';
        } else {
            url = `${API_BASE_URL}/api/contratti/edit/${contrattoId}`;
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

            await fetchContratti();

        } catch (err) {
            setError(new Error(`Errore durante il salvataggio: ${err.message}`));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // --- 6. EFFETTI COLLATERALI (Fetch Iniziale) ---
    useEffect(() => {
        fetchContratti();
    }, [fetchContratti]);

    // --- 7. VALORI RESTITUITI ---
    return {
        data,
        isLoading,
        error,
        refetch: fetchContratti,
        setFilters,
        removeContratti,
        saveContratto,
        getContrattoById,
    };
};

export default useContratti;
