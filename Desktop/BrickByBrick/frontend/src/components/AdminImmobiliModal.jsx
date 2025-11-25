// src/back-office/components/modals/AdminImmobiliModal.jsx

import React, { useState, useEffect } from 'react';

/**
 * Componente Modale per Aggiungere o Modificare i dati di un Immobile.
 * * RUOLO: Contiene l'interfaccia utente (UI) e la logica di input per il Form.
 * Implementa un form controllato, gestendo internamente lo stato dei campi.
 * Determina la modalità ('add'/'edit') in base alla prop 'immobileId'.
 * * @param {boolean} isOpen - Controlla la visibilità del Modal.
 * @param {string | null} immobileId - ID dell'immobile da modificare (null in modalità Aggiungi).
 * @param {function} onClose - Funzione per chiudere il Modal, passata dal Manager.
 * @param {function} onSave - Funzione per salvare i dati e chiamare l'API (gestita dal genitore).
 * @param {object | null} initialImmobileData - Dati dell'immobile preesistenti (se in modalità 'edit').
 */
const AdminImmobiliModal = ({ isOpen, immobileId, onClose, onSave, initialImmobileData }) => {
    
    // --- 1. DETERMINAZIONE MODALITÀ E TITOLO ---
    const mode = immobileId ? 'edit' : 'add';
    const title = immobileId ? `Modifica Immobile #${immobileId}` : 'Aggiungi Nuovo Immobile';

    // Oggetto base per inizializzare il form vuoto.
    const emptyForm = { address: '', city: '', price: '', status: 'Vendita', agent: '' };
    
    // --- 2. STATO DEL FORM ---
    // Inizializza 'formData' con i dati esistenti o con il form vuoto.
    const [formData, setFormData] = useState(initialImmobileData || emptyForm);

    // --- 3. EFFETTO PER IL RESET/POPOLAMENTO DEI DATI ---
    // Assicura che, se initialImmobileData cambia (ad esempio, l'utente clicca su un altro immobile 
    // da editare), il form venga resettato e ripopolato con i nuovi dati.
    useEffect(() => {
        setFormData(initialImmobileData || emptyForm);
    }, [initialImmobileData]);

    // --- 4. GESTIONE INPUT (onChange) ---
    const handleChange = (e) => {
        // Logica specifica per il campo 'price':
        // I campi input di tipo 'number' in HTML ritornano sempre stringhe.
        // Qui, se il campo è 'price', convertiamo il valore in un float (numero) per
        // mantenerlo come tipo numerico nello stato di React (utile per i calcoli).
        const value = e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
        
        // Aggiorna lo stato, mantenendo gli altri campi inalterati.
        setFormData({ 
            ...formData, 
            [e.target.name]: value // Usa l'attributo 'name' come chiave dinamica
        });
    };

    // --- 5. GESTIONE SUBMIT DEL FORM ---
    const handleSubmit = (e) => {
        e.preventDefault(); // Blocca l'invio HTTP standard del form.
        
        // Validazione: controlla se i campi obbligatori sono stati compilati.
        if (!formData.address || !formData.city || !formData.price || !formData.agent) {
            window.alert("Indirizzo, Città, Prezzo e Agente sono obbligatori!");
            return; // Interrompe il processo di salvataggio
        }
        
        // Chiama la funzione 'onSave' passata dal genitore (ImmobiliAdmin.jsx), 
        // delegando a essa la chiamata API e la gestione del feedback.
        onSave(formData, mode); 
    };

    // --- 6. GESTIONE VISIBILITÀ ---
    // Non renderizza nulla se il Modal deve essere chiuso, risparmiando risorse.
    if (!isOpen) return null; 

    // --- 7. STRUTTURA JSX DEL MODAL ---
    return (
        // Modal Backdrop: Chiude il Modal se si clicca sullo sfondo scuro.
        <div className="modal-backdrop" onClick={onClose}>
            
            {/* Modal Content: Il box del form. */}
            {/* e.stopPropagation() impedisce la chiusura quando si clicca DENTRO il form. */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <h3>{title}</h3>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* Campi Form Immobile */}
                    <input name="address" value={formData.address} onChange={handleChange} placeholder="Indirizzo" required />
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="Città" required />
                    <input 
                        name="price" 
                        type="number" // Usa l'input numerico per la UI
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="Prezzo (€)" 
                        required 
                    />
                    {/* Select per lo stato dell'immobile */}
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Vendita">Vendita</option>
                        <option value="Affitto">Affitto</option>
                    </select>
                    <input name="agent" value={formData.agent} onChange={handleChange} placeholder="ID Agente" required />

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {/* Testo dinamico del bottone */}
                            {mode === 'edit' ? 'Salva Modifiche' : 'Crea Immobile'}
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

export default AdminImmobiliModal;