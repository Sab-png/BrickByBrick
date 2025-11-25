// src/components/AgentForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAgents from '../hooks/UseAgents'; // Importiamo l'hook per le operazioni sui dati (POST/PUT)

// --- REGOLE DI VALIDAZIONE ---
// Oggetto contenente le regole di validazione regex e i messaggi di errore associati.
const validationRules = {
    nome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il nome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    cognome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il cognome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' },
    telefono: { regex: /^[0-9\s\+\-\(\)]{9,20}$/, message: 'Numero telefono non valido (almeno 9 cifre)' },
    cittaOperativa: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città deve contenere solo lettere e spazi (2-50 caratteri)' }
};

// Stato iniziale del form. Utilizzato per l'inizializzazione e il reset.
const initialFormData = {
    nome: '', cognome: '', email: '', telefono: '', cittaOperativa: '', sesso: ''
};

/**
 * Componente Form Unificato per Agenti.
 * Gestisce sia la creazione (mode='add') che la modifica (mode='edit') di un agente.
 * @param {string} mode - Determina la modalità operativa: 'add' (default) o 'edit'.
 */
const AgentForm = ({ mode = 'add' }) => {
    const navigate = useNavigate();
    // Recupera l'ID dall'URL. Sarà definito solo in modalità 'edit'.
    const { id: agentId } = useParams(); 
    
    // Estrae i dati degli agenti (necessari per pre-popolare il form in 'edit') 
    // e la funzione di salvataggio (saveAgent) dal Custom Hook.
    const { data: allAgents, saveAgent } = useAgents(); 

    // Stati locali del componente
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Stato per disabilitare il form durante l'invio
    const [apiError, setApiError] = useState(null); // Messaggi di errore API/Sistema

    // --- Logica di Validazione ---
    // Funzione memorizzata per la validazione completa del form.
    const validateForm = useCallback(() => {
        const newErrors = {};
        
        // Esegui la validazione per ogni campo...
        if (!formData.nome.trim()) { newErrors.nome = 'Il nome è obbligatorio'; } 
        else if (!validationRules.nome.regex.test(formData.nome)) { newErrors.nome = validationRules.nome.message; }
        // Nota: Aggiungi qui la logica di validazione per tutti gli altri campi (cognome, email, telefono, etc.).

        if (!formData.sesso) { newErrors.sesso = 'Seleziona il sesso'; }
        return newErrors;
    }, [formData]);

    // Gestore generico per l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        // Rimuove l'errore non appena l'utente inizia a digitare nel campo
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null); // Cancella l'errore API al cambiamento
    };

    // --- Caricamento Dati Esistenti (useEffect per "edit") ---
    // Questo hook gestisce il pre-popolamento del form quando è in modalità 'edit'.
    useEffect(() => {
        if (mode === 'edit' && agentId) {
            // Cerca l'agente specifico nell'array di dati (allAgents) fornito dall'hook
            const agent = allAgents.find(a => a.id === agentId);

            if (!agent) {
                setApiError("Agente non trovato. Verrai reindirizzato.");
                setTimeout(() => navigate('/admin/gestione-utenti'), 2000);
                return;
            }
            
            // Logica per separare fullName in nome e cognome per pre-popolare il form
            const names = (agent.fullName || '').split(' ');
            const nome = names.shift() || '';
            const cognome = names.join(' ') || '';

            // Imposta lo stato del form con i dati dell'agente trovato
            setFormData({
                nome, cognome, 
                email: agent.email || '',
                telefono: agent.phone || '',
                cittaOperativa: agent.cittaOperativa || '', 
                sesso: agent.sesso || ''
            });
        } else if (mode === 'add') {
            // In modalità 'add', resetta il form ai valori iniziali
            setFormData(initialFormData);
        }
    }, [mode, agentId, allAgents, navigate]); 
    // Dipendenze: allAgents è importante; quando l'hook ricarica i dati, questo effect si riesegue.

    // --- Gestione Invio (handleSubmit) ---
    // Gestisce sia l'operazione POST (aggiungi) che PUT (modifica)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);

        // 1. Esegue la validazione lato client
        const clientErrors = validateForm();
        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            return;
        }

        // 2. Prepara il payload con i nomi delle chiavi attesi dal backend (simulato)
        const payload = {
            firstName: formData.nome,
            lastName: formData.cognome,
            email: formData.email,
            phone: formData.telefono,
            operativeCity: formData.cittaOperativa,
            gender: formData.sesso,
        };

        setIsLoading(true); // Avvia lo stato di caricamento/blocco form

        try {
            // 3. Chiama la funzione di salvataggio dall'hook, passando l'ID (solo per edit) e la modalità
            await saveAgent(agentId, payload, mode);
            
            // 4. In caso di successo, reindirizza alla pagina di gestione
            navigate('/admin/gestione-utenti'); 
        } catch (error) {
            // 5. Gestisce l'errore API/simulato
            setApiError(error.message || `Si è verificato un errore durante l'operazione di ${mode}.`);
        } finally {
            setIsLoading(false); // Termina lo stato di caricamento
        }
    };
    
    // --- Rendering ---
    const pageTitle = mode === 'add' ? 'Aggiungi nuovo agente' : `Modifica agente (ID: ${agentId})`;
    const submitButtonText = mode === 'add' ? 'Aggiungi Agente' : 'Salva Modifiche';

    return (
        <div className="agent-form-container">
            <h1>{pageTitle}</h1>
            {/* Visualizzazione degli errori API/di sistema */}
            {apiError && <div className="api-error-alert alert-danger">**Attenzione:** {apiError}</div>}
            
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Campo Nome */}
                        <div className="form-field">
                            <label htmlFor="nome">Nome *</label>
                            <input id="nome" name="nome" value={formData.nome} onChange={handleChange} disabled={isLoading} />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
                        {/* Campo Cognome */}
                        <div className="form-field">
                            <label htmlFor="cognome">Cognome *</label>
                            <input id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} disabled={isLoading} />
                            {errors.cognome && <span className="error-message">{errors.cognome}</span>}
                        </div>
                        {/* Campo Email */}
                        <div className="form-field">
                            <label htmlFor="email">Email *</label>
                            <input id="email" name="email" value={formData.email} onChange={handleChange} disabled={isLoading} />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        {/* Campo Telefono */}
                        <div className="form-field">
                            <label htmlFor="telefono">Telefono</label>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} disabled={isLoading} />
                            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                        </div>
                        {/* Campo Città Operativa */}
                        <div className="form-field">
                            <label htmlFor="cittaOperativa">Città operativa</label>
                            <input id="cittaOperativa" name="cittaOperativa" value={formData.cittaOperativa} onChange={handleChange} disabled={isLoading} />
                            {errors.cittaOperativa && <span className="error-message">{errors.cittaOperativa}</span>}
                        </div>
                        {/* Campo Sesso (Select) */}
                        <div className="form-field">
                            <label htmlFor="sesso">Sesso *</label>
                            <select id="sesso" name="sesso" value={formData.sesso} onChange={handleChange} disabled={isLoading}>
                                <option value="">Seleziona sesso</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                            {errors.sesso && <span className="error-message">{errors.sesso}</span>}
                        </div>
                    </div>
                    
                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'In elaborazione...' : submitButtonText} {/* Testo dinamico basato sul mode */}
                        </button>
                        <button type="button" className="back-btn" onClick={() => navigate('/admin/gestione-utenti')} disabled={isLoading}>
                            Indietro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentForm;