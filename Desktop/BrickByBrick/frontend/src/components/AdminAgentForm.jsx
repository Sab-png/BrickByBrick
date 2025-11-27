// src/components/AgentForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAgents from '../hooks/UseAgents';

// --- REGOLE DI VALIDAZIONE ---
const validationRules = {
    nome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il nome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    cognome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il cognome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' },
    telefono: { regex: /^[0-9\s\+\-\(\)]{9,20}$/, message: 'Numero telefono non valido (almeno 9 cifre)' },
    cittaOperativa: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città è obbligatoria e deve contenere solo lettere e spazi (2-50 caratteri)' }
};

// Stato iniziale del form.
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
    const { id: agentId } = useParams(); 
    
    // Importiamo le funzioni API: saveAgent (POST/UPDATE) e getAgentById (GET per pre-popolamento)
    const { saveAgent, getAgentById } = useAgents(); 

    // Stati locali del componente
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); 
    const [apiError, setApiError] = useState(null); 

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

        if (!formData.cittaOperativa.trim()) { newErrors.cittaOperativa = 'La città operativa è obbligatoria'; }
        else if (!validationRules.cittaOperativa.regex.test(formData.cittaOperativa)) { newErrors.cittaOperativa = validationRules.cittaOperativa.message; }
        
        if (!formData.sesso) { newErrors.sesso = 'Seleziona il sesso'; }
        
        return newErrors;
    }, [formData]);

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
                return;
            }

            setIsLoading(true); // Avvia il loading per bloccare il form
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
                    cittaOperativa: agent.città || '',
                    sesso: agent.sesso || ''
                });

            } catch (error) {
                // Gestisce gli errori di caricamento API (es. agente non trovato)
                console.error(error);
                setApiError(error.message || "Errore nel caricamento dei dati dell'agente.");
                // Reindirizza l'utente dopo un errore critico di caricamento
                setTimeout(() => navigate('/admin/gestione-utenti'), 3000); 
            } finally {
                setIsLoading(false); // Termina il loading
            }
        };

        loadAgentData();
    // getAgentById è una funzione stabile dall'hook, è sicuro includerla qui.
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
            città: formData.cittaOperativa,
            // Il campo sesso non esiste nel modello backend quindi lo omettiamo
        };

        setIsLoading(true); 

        try {
            // 3. Chiama la funzione di salvataggio API (saveAgent)
            await saveAgent(agentId, payload, mode);
            
            // 4. In caso di successo, reindirizza
            navigate('/admin/gestione-utenti'); 
        } catch (error) {
            // 5. Gestisce l'errore API (l'errore viene rilanciato da useAgents)
            setApiError(error.message || `Si è verificato un errore durante l'operazione di ${mode}.`);
        } finally {
            setIsLoading(false); 
        }
    };
    
    // --- Rendering ---
    const pageTitle = mode === 'add' ? '➕ Aggiungi Nuovo Agente' : `✍️ Modifica Agente (ID: ${agentId})`;
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
                            <input id="email" name="email" value={formData.email} onChange={handleChange} disabled={isLoading} type="email" />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        {/* Campo Telefono */}
                        <div className="form-field">
                            <label htmlFor="telefono">Telefono</label>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} disabled={isLoading} type="tel" />
                            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                        </div>
                        {/* Campo Città Operativa */}
                        <div className="form-field">
                            <label htmlFor="cittaOperativa">Città operativa *</label>
                            <input id="cittaOperativa" name="cittaOperativa" value={formData.cittaOperativa} onChange={handleChange} disabled={isLoading} />
                            {errors.cittaOperativa && <span className="error-message">{errors.cittaOperativa}</span>}
                        </div>
                        {/* Campo Sesso (Select) */}
                        <div className="form-field">
                            <label htmlFor="sesso">Sesso *</label>
                            <select id="sesso" name="sesso" value={formData.sesso} onChange={handleChange} disabled={isLoading}>
                                <option value="">Seleziona sesso</option>
                                <option value="M">Maschio</option>
                                <option value="F">Femmina</option>
                                <option value="A">Altro</option>
                            </select>
                            {errors.sesso && <span className="error-message">{errors.sesso}</span>}
                        </div>
                    </div>
                    
                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? '⏳ Elaborando...' : submitButtonText}
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