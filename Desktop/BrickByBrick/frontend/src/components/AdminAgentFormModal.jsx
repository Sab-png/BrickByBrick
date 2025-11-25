// src/back-office/components/modals/AgentFormModal.jsx

import React, { useState, useEffect } from 'react';

/**
 * Componente Modale per Aggiungere o Modificare i dati di un Agente.
 * * Questo componente è un "form controllato" (gestisce il proprio stato del form)
 * e determina la sua modalità ('add' o 'edit') in base alla presenza dell'agentId.
 * * @param {boolean} isOpen - Determina se il Modal è visibile.
 * @param {string | null} agentId - ID dell'agente da modificare. Null se si sta aggiungendo.
 * @param {function} onClose - Funzione per chiudere il Modal, passata dal componente genitore (Agenti.jsx).
 * @param {function} onSave - Funzione per salvare i dati, passata dal componente genitore.
 * @param {object | null} initialAgentData - Dati preesistenti dell'agente (solo in modalità 'edit').
 */
const AgentFormModal = ({ isOpen, agentId, onClose, onSave, initialAgentData }) => {
    
    // --- 1. DETERMINAZIONE MODALITÀ E TITOLO ---
    // Se agentId è presente (non null), siamo in modalità 'edit'. Altrimenti, 'add'.
    const mode = agentId ? 'edit' : 'add';
    const title = agentId ? `Modifica Agente #${agentId}` : 'Aggiungi Nuovo Agente';
    
    // Oggetto base per resettare o inizializzare un nuovo agente.
    const emptyForm = { fullName: '', email: '', cittaOperativa: '' };

    // --- 2. STATO DEL FORM ---
    // 'formData' contiene i valori attuali dei campi di input.
    // Viene inizializzato con i dati preesistenti (initialAgentData) o con il form vuoto.
    const [formData, setFormData] = useState(initialAgentData || emptyForm);

    // --- 3. EFFETTO PER IL RESET/POPOLAMENTO DEI DATI ---
    // Questo hook assicura che se l'ID dell'agente da editare cambia (ad esempio, se apriamo il Modal 
    // per un agente diverso), lo stato 'formData' venga aggiornato con i nuovi 'initialAgentData'.
    useEffect(() => {
        setFormData(initialAgentData || emptyForm);
    }, [initialAgentData]);

    // --- 4. GESTIONE INPUT (onChange) ---
    // Funzione standard per aggiornare lo stato 'formData' ad ogni battitura.
    // Usa l'attributo 'name' dell'input per aggiornare la chiave corrispondente nell'oggetto 'formData'.
    const handleChange = (e) => setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
    });

    // --- 5. GESTIONE SUBMIT DEL FORM ---
    const handleSubmit = (e) => {
        e.preventDefault(); // Impedisce il ricaricamento della pagina (comportamento nativo dei form HTML).
        
        // Validazione di base
        if (!formData.fullName || !formData.email) {
            window.alert("Nome ed Email sono obbligatori!");
            return; // Blocca l'invio
        }
        
        // Chiama la funzione 'onSave' passata dal genitore, inviando i dati e la modalità.
        // Il componente genitore (Agenti.jsx) gestirà la chiusura e il feedback di successo.
        onSave(formData, mode); 
    };

    // --- 6. GESTIONE VISIBILITÀ ---
    // Se il Modal non deve essere aperto, non viene renderizzato nulla.
    if (!isOpen) return null; 

    // --- 7. STRUTTURA JSX DEL MODAL ---
    return (
        // Modal Backdrop: l'area scura che copre il resto della pagina.
        // Cliccando sul backdrop (il Modal, ma non il contenuto), il Modal si chiude (chiamando onClose).
        <div className="modal-backdrop" onClick={onClose}>
            
            {/* Modal Content: il box centrale con il form. */}
            {/* e.stopPropagation() impedisce che il click sul contenuto si propaghi al backdrop,
                evitando che il Modal si chiuda quando l'utente clicca all'interno del form. */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <h3>{title}</h3>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Campi Form Agente (controllati dallo stato 'formData') */}
                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nome Completo" required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input name="cittaOperativa" value={formData.cittaOperativa} onChange={handleChange} placeholder="Città operativa" required />

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {/* Testo del bottone dinamico a seconda della modalità */}
                            {mode === 'edit' ? 'Salva Modifiche' : 'Crea Agente'}
                        </button>
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentFormModal;