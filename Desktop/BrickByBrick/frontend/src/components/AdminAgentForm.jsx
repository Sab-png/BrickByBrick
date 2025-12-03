/**
 * @fileoverview Form unificato per la gestione degli agenti (creazione e modifica).
 * Gestisce validazione lato client, comunicazione con API REST e feedback tramite modali.
 * 
 * @module AdminAgentForm
 * @requires react
 * @requires react-router-dom
 * @requires ./ConfirmModal
 * @requires ../hooks/UseConfirmModal
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';

/** @constant {string} URL base per le chiamate API */
const API_BASE_URL = 'http://localhost:8085';

/**
 * Regole di validazione per i campi del form agente
 * @constant {Object.<string, {regex: RegExp, message: string}>}
 */
const validationRules = {
    nome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il nome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    cognome: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'Il cognome è obbligatorio e deve contenere solo lettere e spazi (2-50 caratteri)' },
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email non valida' },
    telefono: { regex: /^[0-9\s\+\-\(\)]{9,20}$/, message: 'Numero telefono non valido (almeno 9 cifre)' },
    città: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città è obbligatoria e deve contenere solo lettere e spazi (2-50 caratteri)' },
    passw: { regex: /^.{6,}$/, message: 'La password deve contenere almeno 6 caratteri' }
};

/**
 * Stato iniziale del form
 * @constant {Object}
 */
const initialFormData = {
    nome: '', cognome: '', email: '', telefono: '', città: '', passw: ''
};

/**
 * Componente Form Unificato per Agenti
 * 
 * Gestisce sia la creazione che la modifica di un agente.
 * La modalità viene rilevata automaticamente dall'URL:
 * - Se presente un ID → modalità 'edit'
 * - Se assente l'ID → modalità 'add'
 * 
 * @component
 * @returns {JSX.Element} Form per aggiunta/modifica agente
 * 
 * @example
 * // Modalità aggiunta
 * <Route path="/admin/agenti/aggiungi-agente" element={<AgentForm />} />
 * 
 * @example
 * // Modalità modifica
 * <Route path="/admin/agenti/modifica-agente/:id" element={<AgentForm />} />
 */
const AgentForm = () => {
    const navigate = useNavigate();
    const { id: agentId } = useParams();
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();
    
    /** @type {'add'|'edit'} Modalità del form rilevata automaticamente dall'URL */
    const mode = agentId ? 'edit' : 'add';

    /** @type {[Object, Function]} Dati del form */
    const [formData, setFormData] = useState(initialFormData);
    /** @type {[Object, Function]} Errori di validazione per campo */
    const [errors, setErrors] = useState({});
    /** @type {[boolean, Function]} Stato di caricamento durante operazioni async */
    const [isFormLoading, setIsFormLoading] = useState(false); 
    /** @type {[string|null, Function]} Messaggio di errore API */
    const [apiError, setApiError] = useState(null);
    
    // Debug: logga lo stato di loading
    console.log('AgentForm - mode:', mode, 'isFormLoading:', isFormLoading, 'agentId:', agentId);
    
    /**
     * Recupera un agente dal server tramite ID
     * 
     * @function
     * @async
     * @param {number|string} id - ID dell'agente da recuperare
     * @returns {Promise<Object>} Dati dell'agente
     * @throws {Error} Se l'agente non viene trovato o errore di rete
     */
    const getAgentById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/agenti/${id}`; 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Impossibile trovare l'agente ${id}. Errore: ${response.status}`);
        }
        return await response.json();
    }, []);
    
    /**
     * Salva un agente (crea nuovo o aggiorna esistente)
     * 
     * @function
     * @async
     * @param {number|string|null} agentId - ID dell'agente (null per creazione)
     * @param {Object} payload - Dati dell'agente da salvare
     * @param {string} payload.nome - Nome dell'agente
     * @param {string} payload.cognome - Cognome dell'agente
     * @param {string} payload.email - Email dell'agente
     * @param {string} payload.telefono - Telefono dell'agente
     * @param {string} payload.città - Città dell'agente
     * @param {string} [payload.passw] - Password (obbligatoria in add, opzionale in edit)
     * @param {number} payload.Id_ruolo - ID del ruolo (2 per agente)
     * @param {'add'|'edit'} mode - Modalità operazione
     * @returns {Promise<void>}
     * @throws {Error} Se il salvataggio fallisce
     */
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

    /**
     * Valida tutti i campi del form secondo le regole definite
     * 
     * @function
     * @returns {Object.<string, string>} Oggetto con errori di validazione (chiave=campo, valore=messaggio)
     * @returns {Object} Oggetto vuoto se non ci sono errori
     */
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

    /**
     * Gestisce i cambiamenti nei campi del form
     * Aggiorna lo stato e rimuove gli errori di validazione per il campo modificato
     * 
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - Evento di change dell'input
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        // Rimuove l'errore non appena l'utente inizia a digitare
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null); 
    };

    /**
     * Effect per caricare i dati dell'agente in modalità modifica
     * Si attiva al mount e quando cambiano mode, agentId o navigate
     * 
     * In modalità 'edit':
     * - Recupera i dati dell'agente dal server
     * - Popola il form con i dati recuperati
     * - Gestisce errori di caricamento con modale
     * 
     * In modalità 'add':
     * - Resetta il form allo stato iniziale
     */
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
                const errorMsg = error.message || "Errore nel caricamento dei dati dell'agente.";
                setApiError(errorMsg);
                // Mostra modale di errore
                await showConfirm({
                    title: 'Errore Caricamento',
                    message: errorMsg,
                    type: 'danger',
                    confirmText: 'OK',
                    showCancel: false
                });
                // Reindirizza l'utente dopo l'errore critico
                navigate('/admin/agenti'); 
            } finally {
                setIsFormLoading(false); // Termina il loading
            }
        };

        loadAgentData();
    // Dipendenze: mode, agentId, navigate e le funzioni sono stabili con useCallback
    }, [mode, agentId, navigate, getAgentById]); 

    /**
     * Gestisce l'invio del form
     * 
     * Processo:
     * 1. Previene submit default
     * 2. Esegue validazione lato client
     * 3. Prepara payload per API
     * 4. Invia richiesta al server
     * 5. Mostra modale di successo/errore
     * 6. Reindirizza alla lista agenti se successo
     * 
     * @function
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e - Evento di submit del form
     */
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
            
            // 4. In caso di successo, mostra modale di conferma
            await showConfirm({
                title: 'Successo',
                message: mode === 'add' ? 'Agente aggiunto con successo!' : 'Agente modificato con successo!',
                type: 'success',
                confirmText: 'OK',
                showCancel: false
            });
            navigate('/admin/agenti'); 
        } catch (error) {
            // 5. Gestisce l'errore API
            const errorMsg = error.message || `Si è verificato un errore durante l'operazione di ${mode}.`;
            setApiError(errorMsg);
            await showConfirm({
                title: 'Errore',
                message: errorMsg,
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
        } finally {
            setIsFormLoading(false); 
        }
    };
    
    // --- Rendering ---
    const pageTitle = mode === 'add' ? '+ Aggiungi Nuovo Agente' : ` Modifica Agente (ID: ${agentId})`;
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
                            {isFormLoading ? 'Elaborando...' : submitButtonText}
                        </button>
                        <button type="button" className="back-btn" onClick={() => navigate('/admin/agenti')} disabled={isFormLoading}>
                            Indietro
                        </button>
                    </div>
                </form>
            </div>
            
            <ConfirmModal
                isOpen={modalState.isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                showCancel={modalState.showCancel}
            />
        </div>
    );
};

export default AgentForm;