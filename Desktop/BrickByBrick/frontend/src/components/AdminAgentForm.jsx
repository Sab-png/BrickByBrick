// src/components/AgentForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8085';

// --- REGOLE DI VALIDAZIONE ---
const validationRules = {
    nome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il nome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    cognome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il cognome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' },
    telefono: { regex: /^[0-9\s\+\-\(\)]{9,20}$/, message: 'Numero telefono non valido (almeno 9 cifre)' },
    città: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città è obbligatoria e deve contenere solo lettere e spazi (2-50 caratteri)' },
    passw: { regex: /^.{6,}$/, message: 'La password deve contenere almeno 6 caratteri' }
};

// Stato iniziale del form.
const initialFormData = {
    nome: '', cognome: '', email: '', telefono: '', città: '', passw: ''
};

/**
 * Componente Form Unificato per Agenti.
 * Gestisce sia la creazione che la modifica di un agente.
 * Il mode viene rilevato automaticamente: se c'è un ID nell'URL è 'edit', altrimenti 'add'.
 */
const AgentForm = () => {
    const navigate = useNavigate();
    const { id: agentId } = useParams();
    
    // Rileva automaticamente il mode: se c'è un ID nell'URL è edit, altrimenti add
    const mode = agentId ? 'edit' : 'add';

    // Stati locali del componente (completamente separati dall'hook)
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormLoading, setIsFormLoading] = useState(false); 
    const [apiError, setApiError] = useState(null);
    
    // Debug: logga lo stato di loading
    console.log('AgentForm - mode:', mode, 'isFormLoading:', isFormLoading, 'agentId:', agentId);
    
    // Funzione per ottenere un agente per ID (chiamata diretta all'API)
    const getAgentById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/agenti/${id}`; 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Impossibile trovare l'agente ${id}. Errore: ${response.status}`);
        }
        return await response.json();
    }, []);
    
    // Funzione per salvare un agente (chiamata diretta all'API)
    const saveAgent = useCallback(async (agentId, payload, mode) => {
        let url = '';
        let method = '';
        
        if (mode === 'add') {
            url = `${API_BASE_URL}/api/agenti`;
            method = 'POST';
        } else {
            url = `${API_BASE_URL}/api/agenti/edit/${agentId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Salvataggio fallito. Risposta: ${response.status} - ${errorText}`);
        }
    }, []); 

    // --- Logica di Validazione ---
    const validateForm = useCallback(() => {
        const newErrors = {};
        
        // Esegui la validazione per ogni campo
        if (!formData.nome.trim()) { newErrors.nome = 'Il nome è obbligatorio'; } 
        else if (!validationRules.nome.regex.test(formData.nome)) { newErrors.nome = validationRules.nome.message; }

        if (!formData.cognome.trim()) { newErrors.cognome = 'Il cognome è obbligatorio'; }
        else if (!validationRules.cognome.regex.test(formData.cognome)) { newErrors.cognome = validationRules.cognome.message; }

        if (!formData.email.trim()) { newErrors.email = 'L\'email è obbligatoria'; }
        else if (!validationRules.email.regex.test(formData.email)) { newErrors.email = validationRules.email.message; }

        if (formData.telefono.trim() && !validationRules.telefono.regex.test(formData.telefono)) { newErrors.telefono = validationRules.telefono.message; }

        if (!formData.città.trim()) { newErrors.città = 'La città è obbligatoria'; }
        else if (!validationRules.città.regex.test(formData.città)) { newErrors.città = validationRules.città.message; }
        
        if (mode === 'add' && !formData.passw.trim()) { newErrors.passw = 'La password è obbligatoria'; }
        else if (formData.passw.trim() && !validationRules.passw.regex.test(formData.passw)) { newErrors.passw = validationRules.passw.message; }
        
        return newErrors;
    }, [formData, mode]);

    // Gestore generico per l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        // Rimuove l'errore non appena l'utente inizia a digitare
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null); 
    };

    // --- Caricamento Dati Esistenti (useEffect per "edit") ---
    useEffect(() => {
        const loadAgentData = async () => {
            // Logica di gestione: se siamo in 'add' o manca l'ID, usciamo
            if (mode !== 'edit' || !agentId) {
                setFormData(initialFormData);
                setIsFormLoading(false); // Assicurati che isFormLoading sia false in modalità add
                return;
            }

            setIsFormLoading(true); // Avvia il loading per bloccare il form
            setApiError(null);

            try {
                // CHIAMA L'API per ottenere i dati del singolo agente
                const agent = await getAgentById(agentId); 
                
                // Formattazione dei dati API nel formato del form
                setFormData({
                    nome: agent.nome || '',
                    cognome: agent.cognome || '',
                    email: agent.email || '',
                    telefono: agent.telefono || '',
                    città: agent.città || '',
                    passw: '' // Non carichiamo mai la password per sicurezza
                });

            } catch (error) {
                // Gestisce gli errori di caricamento API (es. agente non trovato)
                console.error(error);
                setApiError(error.message || "Errore nel caricamento dei dati dell'agente.");
                // Reindirizza l'utente dopo un errore critico di caricamento
                setTimeout(() => navigate('/admin/agenti'), 3000); 
            } finally {
                setIsFormLoading(false); // Termina il loading
            }
        };

        loadAgentData();
    // Dipendenze: mode, agentId, navigate e le funzioni sono stabili con useCallback
    }, [mode, agentId, navigate, getAgentById]); 

    // --- Gestione Invio (handleSubmit) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);

        // 1. Validazione lato client
        const clientErrors = validateForm();
        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            return;
        }

        // 2. Prepara il payload con i nomi delle chiavi attesi dal backend
        const payload = {
            nome: formData.nome,
            cognome: formData.cognome,
            email: formData.email,
            telefono: formData.telefono,
            città: formData.città,
            Id_ruolo: 2 // Ruolo agente predefinito
        };
        
        // Aggiungi password solo se compilata (obbligatoria in add, opzionale in edit)
        if (formData.passw.trim()) {
            payload.passw = formData.passw;
        }

        setIsFormLoading(true); 

        try {
            // 3. Chiama la funzione di salvataggio API (saveAgent)
            await saveAgent(agentId, payload, mode);
            
            // 4. In caso di successo, reindirizza
            alert('Agente salvato con successo!');
            navigate('/admin/agenti'); 
        } catch (error) {
            // 5. Gestisce l'errore API (l'errore viene rilanciato da useAgents)
            setApiError(error.message || `Si è verificato un errore durante l'operazione di ${mode}.`);
        } finally {
            setIsFormLoading(false); 
        }
    };
    
    // --- Rendering ---
    const pageTitle = mode === 'add' ? 'Aggiungi Nuovo Agente' : ` Modifica Agente (ID: ${agentId})`;
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
                            <input id="nome" name="nome" value={formData.nome} onChange={handleChange} disabled={isFormLoading} />
                            {errors.nome && <span className="error-message">{errors.nome}</span>}
                        </div>
                        {/* Campo Cognome */}
                        <div className="form-field">
                            <label htmlFor="cognome">Cognome *</label>
                            <input id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} disabled={isFormLoading} />
                            {errors.cognome && <span className="error-message">{errors.cognome}</span>}
                        </div>
                        {/* Campo Email */}
                        <div className="form-field">
                            <label htmlFor="email">Email *</label>
                            <input id="email" name="email" value={formData.email} onChange={handleChange} disabled={isFormLoading} type="email" />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        {/* Campo Telefono */}
                        <div className="form-field">
                            <label htmlFor="telefono">Telefono</label>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} disabled={isFormLoading} type="tel" />
                            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                        </div>
                        {/* Campo Città */}
                        <div className="form-field">
                            <label htmlFor="città">Città *</label>
                            <input id="città" name="città" value={formData.città} onChange={handleChange} disabled={isFormLoading} />
                            {errors.città && <span className="error-message">{errors.città}</span>}
                        </div>
                        {/* Campo Password */}
                        <div className="form-field">
                            <label htmlFor="passw">Password {mode === 'add' ? '*' : '(opzionale)'}</label>
                            <input id="passw" name="passw" type="password" value={formData.passw} onChange={handleChange} disabled={isFormLoading} />
                            {errors.passw && <span className="error-message">{errors.passw}</span>}
                            {mode === 'edit' && <small>Lascia vuoto per non modificare</small>}
                        </div>
                    </div>
                    
                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isFormLoading}>
                            {isFormLoading ? '⏳ Elaborando...' : submitButtonText}
                        </button>
                        <button type="button" className="back-btn" onClick={() => navigate('/admin/agenti')} disabled={isFormLoading}>
                            Indietro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentForm;