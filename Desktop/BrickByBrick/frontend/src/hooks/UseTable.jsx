// src/back-office/hooks/useTableData.js

import { useState } from 'react';

/**
 * Custom Hook per gestire lo stato e la logica di manipolazione dei dati di una tabella amministrativa.
 * * RUOLO: Centralizzare la logica di Ricerca, Selezione e Rimozione dei dati.
 * Sostituisce la necessità di scrivere useState e tutte queste funzioni in ogni componente di pagina (Agenti.jsx, ImmobiliAdmin.jsx).
 * @param {Array<Object>} [initialData=[]] - Dati iniziali della tabella.
 * @returns {Object} Oggetto contenente lo stato e le funzioni da usare nel componente.
 */
const useTableData = (initialData = []) => {
    
    // --- 1. STATI CENTRALI ---
    
    // Stato contenente tutti i dati iniziali non filtrati. Serve per resettare la ricerca.
    const [originalData, setOriginalData] = useState(initialData);
    
    // Stato contenente i dati attualmente visualizzati (potrebbe essere filtrato dalla ricerca).
    const [displayedData, setDisplayedData] = useState(initialData);
    
    // Stato per l'input di ricerca.
    const [searchTerm, setSearchTerm] = useState('');
    
    // Stato contenente gli ID degli elementi selezionati tramite checkbox.
    const [selectedIds, setSelectedIds] = useState([]);

    // --- 2. FUNZIONE DI RICERCA ---
    /**
     * Filtra i dati in base al termine di ricerca su un set specifico di chiavi.
     * Questa funzione viene chiamata da useEffect in AdminTableManager ogni volta che searchTerm cambia.
     * @param {string[]} searchKeys - Le chiavi degli oggetti su cui eseguire il match.
     */
    const handleSearch = (searchKeys = ['fullName', 'email', 'id']) => {
        
        // Se il campo di ricerca è vuoto, mostra tutti i dati originali.
        if (searchTerm.trim() === '') {
            setDisplayedData(originalData);
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            
            // Filtra l'array originale (perché la ricerca deve sempre partire dai dati non filtrati)
            const filtered = originalData.filter(item => {
                // Controlla se almeno una delle 'searchKeys' corrisponde al termine di ricerca.
                return searchKeys.some(key => 
                    // Controlla che la chiave esista e che il valore convertito in stringa/minuscolo includa il termine.
                    item[key] && String(item[key]).toLowerCase().includes(lowerSearchTerm)
                );
            });
            
            setDisplayedData(filtered);
        }
        
        // Resetta la selezione dopo una ricerca per evitare selezioni incoerenti.
        setSelectedIds([]);
    };

    // --- 3. FUNZIONE DI SELEZIONE ---
    /**
     * Aggiunge o rimuove un ID dall'array 'selectedIds' al click del checkbox.
     * @param {string} id - L'ID dell'elemento cliccato.
     */
    const toggleSelection = (id) => {
        
        setSelectedIds(prevIds => {
            if (prevIds.includes(id)) {
                // Rimuovi l'ID se è già presente (deseleziona)
                return prevIds.filter(itemId => itemId !== id);
            } else {
                // Aggiungi l'ID se non è presente (seleziona)
                return [...prevIds, id];
            }
        });
    };

    // --- 4. FUNZIONE DI RIMOZIONE ---
    /**
     * Rimuove gli elementi selezionati da entrambi gli array di stato (originali e visualizzati).
     * @param {string} confirmMessage - Messaggio da mostrare nel prompt di conferma.
     * @returns {boolean} True se l'eliminazione è avvenuta, False altrimenti.
     */
    const handleRemove = (confirmMessage = 'Sei sicuro di voler eliminare gli elementi selezionati?') => {
        
        if (selectedIds.length === 0) return false; // Nessun elemento selezionato
        
        // Utilizza il prompt nativo del browser per la conferma.
        if (window.confirm(confirmMessage)) {
            try {
                // 1. Rimuove dagli elementi visualizzati
                const remainingDisplayed = displayedData.filter(item => !selectedIds.includes(item.id));
                setDisplayedData(remainingDisplayed);
                
                // 2. Rimuove dai dati originali (cruciale per mantenere la coerenza post-ricerca)
                const remainingOriginal = originalData.filter(item => !selectedIds.includes(item.id));
                setOriginalData(remainingOriginal);
                
                // 3. Resetta la selezione
                setSelectedIds([]);
                return true; // Successo
            } catch (error) {
                console.error("Errore logico durante la rimozione:", error);
                return false; // Fallimento
            }
        }
        return false; // Utente ha cliccato 'Annulla'
    };
    
    // --- 5. RITORNO DELLE FUNZIONALITÀ ---
    return {
        // Dati e stato da esporre al componente (AdminTableManager)
        displayedData,
        searchTerm,
        setSearchTerm,
        selectedIds,
        handleSearch,
        toggleSelection,
        handleRemove, 
        // Funzioni esposte per casi d'uso avanzati (p. es., aggiornare i dati dopo un'API)
        setDisplayedData, 
        setOriginalData,
    };
};

export default useTableData;