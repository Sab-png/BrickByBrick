

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = '/api/agents'; // Endpoint simulato (non usato, serve solo come riferimento)

/**
 * Custom hook per gestire il fetching, il filtraggio e la manipolazione dei dati degli agenti.
 * Simula le operazioni CRUD (Create, Read, Update, Delete) utilizzando localStorage 
 * per memorizzare i dati (database fittizio).
 */
const useAgents = () => {
    // 1. STATI PRINCIPALI
    const [data, setData] = useState([]);       // Contiene la lista degli agenti (filtrata)
    const [isLoading, setIsLoading] = useState(false); // Stato per feedback di caricamento UI
    const [error, setError] = useState(null);   // Stato per messaggi di errore
    const [filters, setFilters] = useState({}); // Stato per i filtri di ricerca

    // Dati fittizi iniziali (usati solo per popolare il localStorage la prima volta)
    const initialAgents = [
        { 
            id: 'A001', fullName: 'Marco Rossi', email: 'marco.rossi@agenzia.com', 
            phone: '3331112233', cittaOperativa: 'Milano', sesso: 'M', status: 'Attivo' 
        },
        { 
            id: 'A002', fullName: 'Laura Bianchi', email: 'laura.bianchi@agenzia.com', 
            phone: '3334445566', cittaOperativa: 'Roma', sesso: 'F', status: 'Offline' 
        },
    ]; 

    // --- LOGICA DI LETTURA E FILTRAGGIO (Simulazione API GET) ---

    // Funzione memorizzata (useCallback) per eseguire il "fetch" dei dati.
    // Viene rieseguita solo se i filtri cambiano.
    const fetchAgents = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Legge i dati dal database fittizio (localStorage)
            const dummyAgentList = JSON.parse(localStorage.getItem('agenti_data') || '[]');
            
            // 2. Applica la simulazione del filtro (ricerca per nome o email)
            const filteredData = dummyAgentList.filter(agent => {
                // Se non c'è un filtro di ricerca, includi l'agente
                if (!filters.search) return true;
                
                const searchLower = filters.search.toLowerCase();
                // Controlla se il termine di ricerca è incluso in fullName o email
                return (
                    agent.fullName.toLowerCase().includes(searchLower) ||
                    agent.email.toLowerCase().includes(searchLower)
                );
            });

            // 3. Simula la latenza di rete per una migliore esperienza utente
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            // 4. Aggiorna lo stato dei dati
            setData(filteredData);
            
        } catch (err) {
            // Gestione dell'errore (in questo caso, un errore di parsing o logica interna)
            setError(new Error("Errore nel caricamento dei dati."));
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // --- LOGICA DI ELIMINAZIONE (Simulazione API DELETE) ---

    // Funzione per eliminare agenti basandosi sugli ID forniti.
    const removeAgents = async (ids) => {
        // 1. Recupera la lista corrente
        let currentList = JSON.parse(localStorage.getItem('agenti_data') || '[]');
        
        // 2. Filtra la lista per mantenere solo gli utenti il cui ID NON è nell'array 'ids' da eliminare
        const remainingUsers = currentList.filter(user => !ids.includes(user.id));
        
        // 3. Salva la nuova lista su localStorage
        localStorage.setItem('agenti_data', JSON.stringify(remainingUsers));
        
        // 4. Ricarica i dati per aggiornare l'interfaccia utente
        await fetchAgents(); 
    };
    
    // --- LOGICA DI CREAZIONE/AGGIORNAMENTO (Simulazione API POST/PUT) ---
    
    // Funzione usata dal form per salvare (aggiungere o modificare) un agente.
    const saveAgent = async (agentId, payload, mode) => {
        let currentList = JSON.parse(localStorage.getItem('agenti_data') || '[]');
        
        if (mode === 'add') {
            // Modalità Aggiunta (POST):
            const newAgent = { 
                ...payload, 
                // Genera un ID fittizio per il nuovo agente
                id: 'A' + Math.random().toString(36).substr(2, 4).toUpperCase(), 
                // Ricrea il campo fullName richiesto dalla tabella
                fullName: `${payload.firstName} ${payload.lastName}`, 
                status: 'Attivo',
                sesso: payload.gender,
                cittaOperativa: payload.operativeCity,
                email: payload.email,
                phone: payload.phone
            };
            currentList.push(newAgent);
        } else {
            // Modalità Modifica (PUT):
            const index = currentList.findIndex(a => a.id === agentId);
            if (index > -1) {
                // Aggiorna l'oggetto esistente, mantenendo l'ID e lo status originale
                currentList[index] = { 
                    ...currentList[index], 
                    ...payload, // Sovrascrive i campi con i nuovi dati
                    fullName: `${payload.firstName} ${payload.lastName}`,
                    sesso: payload.gender,
                    cittaOperativa: payload.operativeCity,
                    email: payload.email,
                    phone: payload.phone 
                };
            } else {
                throw new Error("Agente non trovato per la modifica.");
            }
        }
        
        // Salva la lista aggiornata
        localStorage.setItem('agenti_data', JSON.stringify(currentList));
        
        // Simula la latenza di salvataggio
        await new Promise(resolve => setTimeout(resolve, 500)); 
    };

    // --- EFFETTI COLLATERALI (Initializzazione e Fetch Iniziale) ---

    useEffect(() => {
        // Al montaggio: Se il localStorage è vuoto, popola con i dati fittizi iniziali.
        if (!localStorage.getItem('agenti_data')) {
            localStorage.setItem('agenti_data', JSON.stringify(initialAgents));
        }

        // Esegui il fetch iniziale dei dati.
        fetchAgents();
    }, [fetchAgents]);

    // --- VALORI RESTITUITI ---
    
    // L'hook ritorna gli stati e le funzioni necessarie ai componenti esterni.
    return { 
        data, 
        isLoading, 
        error, 
        refetch: fetchAgents, // Esporta fetchAgents come 'refetch' per ricaricare la lista manualmente
        setFilters,
        removeAgents,
        saveAgent,
        initialAgents 
    };
};

export default useAgents;