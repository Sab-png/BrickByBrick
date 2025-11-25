import React, { useState, useCallback } from 'react';
// Componenti importati
import TableManager from '../components/AdminTableManager';  // Gestisce la tabella, la ricerca e la selezione (usa useTableData)
import TableActions from './AdminTableActions';             // Componente per i bottoni Aggiungi/Modifica/Rimuovi
import AgentModalManager from './AdminAgentModalManager';   // Gestisce il rendering condizionale del Modal del form
import { users as agenti } from '../data/users';            // Dati fittizi iniziali (mock data)

/**
 * Pagina di Gestione Amministrativa degli Agenti.
 * Questo componente funge da 'Contenitore' o 'Coordinatore':
 * 1. Mantiene lo stato dell'interfaccia (quale agente modificare, se il modal è aperto).
 * 2. Definisce le azioni di business (aggiungi, modifica, salva, rimuovi).
 * 3. Delega il rendering e la logica complessa ai componenti figli (TableManager, ModalManager).
 */
const Agenti = () => {
    
    // --- 1. STATO DELL'INTERFACCIA (Modal/Selezione) ---
    // Stato booleano per controllare la visibilità del form modale.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Stato per memorizzare l'ID dell'agente da modificare. Null indica modalità "Aggiungi".
    const [agentIdToEdit, setAgentIdToEdit] = useState(null); 
    
    // --- 2. CONFIGURAZIONE TABELLA ---
    // Definizione delle colonne da visualizzare.
    const userColumns = [
        { key: 'fullName', header: 'Nome e cognome' },
        { key: 'id', header: 'ID Agente' },
        { key: 'email', header: 'Email' },
        { key: 'cittaOperativa', header: 'Città operativa' },
    ];
    // Chiavi su cui il TableManager (tramite useTableData) deve eseguire la ricerca.
    const searchKeys = ['fullName', 'email', 'id', 'cittaOperativa'];

    // --- 3. FUNZIONI DI CONTROLLO E AZIONE (Logica di Business) ---

    // Funzione per chiudere il Modale e resettare l'ID da modificare.
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setAgentIdToEdit(null);
    }, []); // Non ha dipendenze esterne, quindi array vuoto.

    // Funzione per aprire il Modale in modalità 'Aggiungi'.
    const handleAdd = useCallback(() => {
        setAgentIdToEdit(null); // Assicura che l'ID sia null (Aggiungi)
        setIsModalOpen(true);
    }, []);

    // Funzione per aprire il Modale in modalità 'Modifica'.
    const handleEdit = useCallback((selectedIds) => {
        if (selectedIds.length !== 1) {
            window.alert('Seleziona ESATTAMENTE un agente per modificarlo.');
            return;
        }
        // Imposta l'ID e apre il Modal.
        setAgentIdToEdit(selectedIds[0]);
        setIsModalOpen(true);
    }, []);

    // Funzione chiamata dal Modal dopo l'invio del form. Gestisce l'API (simulata).
    const handleSave = useCallback((formData, mode) => {
        // QUI ANDREBBE LA CHIAMATA API (POST/PUT/PATCH)
        console.log(`Salvataggio dati Agente per la modalità: ${mode}`, formData);
        
        // Chiude il Modal e mostra il feedback all'utente.
        handleCloseModal();
        window.alert(`Agente ${mode === 'edit' ? 'aggiornato' : 'aggiunto'} con successo!`);
    }, [handleCloseModal]); // Dipende da handleCloseModal.
    
    // Funzione wrapper per la rimozione, gestisce il feedback (alert) dopo la chiamata al hook.
    const handleRemoveClick = useCallback((selectedIds, handleRemoveFn) => {
        // Chiama handleRemove del hook (che gestisce window.confirm e lo stato)
        const success = handleRemoveFn(`Sei sicuro di voler rimuovere ${selectedIds.length} agente/i?`);
        
        if (success) {
            window.alert(`${selectedIds.length} agente/i rimosso/i con successo!`);
        }
    }, []); // Non ha dipendenze esterne.

    // --- 4. DELEGA DEL RENDERING (Bottoni) ---
    // Funzione passata al TableManager per renderizzare i bottoni.
    // Riceve selectedIds e la funzione handleRemove dal hook (tramite TableManager).
    const renderAgentActions = useCallback(({ selectedIds, handleRemove: handleRemoveFn }) => (
        // Delega la visualizzazione dei bottoni al componente TableActions.
        <TableActions
            selectedIds={selectedIds}
            onAdd={handleAdd}
            onEdit={handleEdit}
            // Mappa l'azione generica onRemove alla nostra logica di feedback specifica.
            onRemove={(ids) => handleRemoveClick(ids, handleRemoveFn)}
        />
    ), [handleAdd, handleEdit, handleRemoveClick]); // Dipende dalle funzioni di azione.

    // --- 5. RENDER PRINCIPALE ---
    return (
        <>
            {/* TableManager: Gestisce la visualizzazione della tabella e passa le funzioni di stato/hook */}
            <TableManager 
                title="Gestione Agenti"
                initialData={agenti} 
                columns={userColumns}
                searchKeys={searchKeys}
                renderActions={renderAgentActions} // Passa la funzione che renderizza i bottoni
            />
            
            {/* AgentModalManager: Componente che renderizza il form modale se isModalOpen è true */}
            <AgentModalManager
                isOpen={isModalOpen} // Controlla la visibilità
                agentId={agentIdToEdit} // Passa l'ID per modalità Edit
                onClose={handleCloseModal}
                onSave={handleSave}
                // Trova e passa i dati iniziali se è in modalità Edit
                initialData={agenti.find(a => a.id === agentIdToEdit)}
            />
        </>
    );
};

export default Agenti;