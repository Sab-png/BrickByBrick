// src/back-office/hooks/useTableData.js

import { useState, useCallback } from 'react';

/**
 * Custom Hook per gestire lo stato e la logica di manipolazione dei dati di una tabella amministrativa.
 * * RUOLO: Centralizzare la logica di Ricerca, Selezione e Rimozione dei dati.
 * Sostituisce la necessità di scrivere useState e tutte queste funzioni in ogni componente di pagina.
 * @param {Array<Object>} [initialData=[]] - Dati iniziali della tabella.
 * @returns {Object} Oggetto contenente lo stato e le funzioni da usare nel componente.
 */
const useTableData = (initialData = []) => {
    
    // --- 1. STATI CENTRALI ---
    const [originalData, setOriginalData] = useState(initialData);
    const [displayedData, setDisplayedData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    // --- 2. FUNZIONE DI RICERCA (STABILIZZATA) ---
    // Usiamo useCallback per garantire che questa funzione cambi solo se le sue dipendenze cambiano,
    // prevenendo i loop nell'useEffect del componente AdminTableManager.
    const handleSearch = useCallback((searchKeys = ['fullName', 'email', 'id']) => {
        
        // Se il campo di ricerca è vuoto, mostra tutti i dati originali.
        if (searchTerm.trim() === '') {
            setDisplayedData(originalData);
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            
            // Filtra l'array originale
            const filtered = originalData.filter(item => {
                return searchKeys.some(key => 
                    item[key] && String(item[key]).toLowerCase().includes(lowerSearchTerm)
                );
            });
            
            setDisplayedData(filtered);
        }
        
        // Resetta la selezione dopo una ricerca.
        setSelectedIds([]);
        
    }, [searchTerm, originalData, setDisplayedData, setSelectedIds]); 
    // Dipendenze: searchTerm e originalData cambiano i risultati. 
    // setDisplayedData/setSelectedIds sono setter di stato React.

    // --- 3. FUNZIONE DI SELEZIONE (STABILIZZATA) ---
    // Non ha dipendenze esterne allo stato, quindi prevIds è gestito internamente da React.
    const toggleSelection = useCallback((id) => {
        
        setSelectedIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(itemId => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    }, [setSelectedIds]);

    // --- 4. FUNZIONE DI RIMOZIONE (STABILIZZATA) ---
    const handleRemove = useCallback((confirmMessage = 'Sei sicuro di voler eliminare gli elementi selezionati?') => {
        
        if (selectedIds.length === 0) return false; 
        
        if (window.confirm(confirmMessage)) {
            try {
                // 1. Rimuove dagli elementi visualizzati
                const remainingDisplayed = displayedData.filter(item => !selectedIds.includes(item.id));
                setDisplayedData(remainingDisplayed);
                
                // 2. Rimuove dai dati originali
                const remainingOriginal = originalData.filter(item => !selectedIds.includes(item.id));
                setOriginalData(remainingOriginal);
                
                // 3. Resetta la selezione
                setSelectedIds([]);
                return true; 
            } catch (error) {
                console.error("Errore logico durante la rimozione:", error);
                return false; 
            }
        }
        return false; 
        
    }, [selectedIds, displayedData, originalData, setDisplayedData, setOriginalData, setSelectedIds]);
    // Dipendenze: ha bisogno di tutti gli stati che legge/scrive al momento della sua esecuzione.
    
    // --- 5. RITORNO DELLE FUNZIONALITÀ ---
    return {
        displayedData,
        searchTerm,
        setSearchTerm,
        selectedIds,
        handleSearch,
        toggleSelection,
        handleRemove, 
        setDisplayedData, 
        setOriginalData,
    };
};

export default useTableData;