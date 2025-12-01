// src/components/AdminContrattoForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/components/_adminContrattoForm.scss';

const API_BASE_URL = 'http://localhost:8085';

// --- REGOLE DI VALIDAZIONE ---
const validationRules = {
    Id_immobile: { message: 'L\'ID immobile è obbligatorio' },
    Id_utente: { message: 'L\'ID utente è obbligatorio' },
    data_di_scadenza: { message: 'La data di scadenza è obbligatoria' },
    prezzo: { regex: /^\d+(\.\d{1,2})?$/, message: 'Il prezzo deve essere un numero valido' }
};

// Stato iniziale del form.
const initialFormData = {
    Id_immobile: '',
    Id_utente: '',
    data_di_scadenza: '',
    prezzo: ''
};

/**
 * Componente Form Unificato per Contratti.
 * Gestisce sia la creazione che la modifica di un contratto.
 * Il mode viene rilevato automaticamente: se c'è un ID nell'URL è 'edit', altrimenti 'add'.
 */
const AdminContrattoForm = () => {
    const navigate = useNavigate();
    const { id: contrattoId } = useParams();

    // Determina la modalità in base alla presenza dell'ID nell'URL
    const mode = contrattoId ? 'edit' : 'add';

    // Stati locali del componente
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [searchContrattoId, setSearchContrattoId] = useState('');

    console.log('AdminContrattoForm - mode:', mode, 'isFormLoading:', isFormLoading, 'contrattoId:', contrattoId);

    // Funzione per ottenere un contratto per ID (chiamata diretta all'API)
    const getContrattoById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/contratti/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Impossibile trovare il contratto ${id}. Errore: ${response.status}`);
        }
        return await response.json();
    }, []);

    // Funzione per salvare un contratto (chiamata diretta all'API)
    const saveContratto = useCallback(async (contrattoId, payload, mode) => {
        let url = '';
        let method = '';

        if (mode === 'add') {
            url = `${API_BASE_URL}/api/contratti`;
            method = 'POST';
        } else {
            url = `${API_BASE_URL}/api/contratti/edit/${contrattoId}`;
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

        if (!formData.Id_immobile) {
            newErrors.Id_immobile = validationRules.Id_immobile.message;
        }

        if (!formData.Id_utente) {
            newErrors.Id_utente = validationRules.Id_utente.message;
        }

        if (!formData.data_di_scadenza) {
            newErrors.data_di_scadenza = validationRules.data_di_scadenza.message;
        }

        if (!formData.prezzo) {
            newErrors.prezzo = 'Il prezzo è obbligatorio';
        } else if (!validationRules.prezzo.regex.test(formData.prezzo)) {
            newErrors.prezzo = validationRules.prezzo.message;
        }

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
        const loadContrattoData = async () => {
            // Logica di gestione: se siamo in 'add' o manca l'ID, usciamo
            if (mode !== 'edit' || !contrattoId) {
                setFormData(initialFormData);
                setIsFormLoading(false);
                return;
            }

            setIsFormLoading(true);
            setApiError(null);

            try {
                const contratto = await getContrattoById(contrattoId);

                // Formattazione della data per input type="date" (formato YYYY-MM-DD)
                let formattedDate = '';
                if (contratto.data_di_scadenza) {
                    const date = new Date(contratto.data_di_scadenza);
                    formattedDate = date.toISOString().split('T')[0];
                }

                setFormData({
                    Id_immobile: contratto.Id_immobile || '',
                    Id_utente: contratto.Id_utente || '',
                    data_di_scadenza: formattedDate,
                    prezzo: contratto.prezzo || ''
                });

            } catch (error) {
                console.error(error);
                setApiError(error.message || "Errore nel caricamento dei dati del contratto.");
                setTimeout(() => navigate('/admin/gestione-contratti'), 3000);
            } finally {
                setIsFormLoading(false);
            }
        };

        loadContrattoData();
    }, [mode, contrattoId, navigate, getContrattoById]);

    // --- Gestione Caricamento Contratto da ID ---
    const handleLoadContratto = async () => {
        if (!searchContrattoId || searchContrattoId.trim() === '') {
            setApiError('Inserisci un ID contratto valido');
            return;
        }

        setIsFormLoading(true);
        setApiError(null);

        try {
            const contratto = await getContrattoById(searchContrattoId);

            // Formattazione della data per input type="date" (formato YYYY-MM-DD)
            let formattedDate = '';
            if (contratto.data_di_scadenza) {
                const date = new Date(contratto.data_di_scadenza);
                formattedDate = date.toISOString().split('T')[0];
            }

            setFormData({
                Id_immobile: contratto.Id_immobile || '',
                Id_utente: contratto.Id_utente || '',
                data_di_scadenza: formattedDate,
                prezzo: contratto.prezzo || ''
            });

            // Naviga alla route con l'ID
            navigate(`/admin/contratti/modifica-contratto/${searchContrattoId}`);

        } catch (error) {
            console.error(error);
            setApiError(error.message || "Errore nel caricamento dei dati del contratto.");
        } finally {
            setIsFormLoading(false);
        }
    };

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

        // 2. Prepara il payload
        const payload = {
            Id_immobile: parseInt(formData.Id_immobile),
            Id_utente: parseInt(formData.Id_utente),
            data_di_scadenza: formData.data_di_scadenza,
            prezzo: formData.prezzo
        };

        setIsFormLoading(true);

        try {
            await saveContratto(contrattoId, payload, mode);

            alert('Contratto salvato con successo!');
            navigate('/admin/gestione-contratti');
        } catch (error) {
            setApiError(error.message || `Si è verificato un errore durante l'operazione di ${mode}.`);
        } finally {
            setIsFormLoading(false);
        }
    };

    // --- Rendering ---
    const pageTitle = mode === 'add' ? 'Aggiungi Nuovo Contratto' : contrattoId ? `Modifica Contratto (ID: ${contrattoId})` : 'Modifica Contratto';
    const submitButtonText = mode === 'add' ? 'Aggiungi Contratto' : 'Salva Modifiche';

    return (
        <div className="agent-form-container admin-contratto-form">
            <h1>{pageTitle}</h1>
            {apiError && <div className="api-error-alert alert-danger">**Attenzione:** {apiError}</div>}

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    {/* Campo ID Contratto (solo per ricerca quando non c'è ID nell'URL) */}
                    {!contrattoId && mode === 'edit' && (
                        <div className="form-field search-contratto-field">
                            <label htmlFor="searchContrattoId">ID Contratto da Modificare *</label>
                            <div className="search-input-group">
                                <input
                                    id="searchContrattoId"
                                    type="number"
                                    value={searchContrattoId}
                                    onChange={(e) => setSearchContrattoId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLoadContratto()}
                                    disabled={isFormLoading}
                                    placeholder="Inserisci ID contratto"
                                />
                                <button
                                    type="button"
                                    className="load-btn"
                                    onClick={handleLoadContratto}
                                    disabled={isFormLoading}
                                >
                                    {isFormLoading ? 'Caricamento...' : 'Carica'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="form-grid">
                        {/* Campo ID Immobile */}
                        <div className="form-field">
                            <label htmlFor="Id_immobile">ID Immobile *</label>
                            <input
                                id="Id_immobile"
                                name="Id_immobile"
                                type="number"
                                value={formData.Id_immobile}
                                onChange={handleChange}
                                disabled={isFormLoading}
                                placeholder="Inserisci ID immobile"
                            />
                            {errors.Id_immobile && <span className="error-message">{errors.Id_immobile}</span>}
                        </div>

                        {/* Campo ID Utente */}
                        <div className="form-field">
                            <label htmlFor="Id_utente">ID Utente *</label>
                            <input
                                id="Id_utente"
                                name="Id_utente"
                                type="number"
                                value={formData.Id_utente}
                                onChange={handleChange}
                                disabled={isFormLoading}
                                placeholder="Inserisci ID utente"
                            />
                            {errors.Id_utente && <span className="error-message">{errors.Id_utente}</span>}
                        </div>

                        {/* Campo Data di Scadenza */}
                        <div className="form-field">
                            <label htmlFor="data_di_scadenza">Data di Scadenza *</label>
                            <input
                                id="data_di_scadenza"
                                name="data_di_scadenza"
                                type="date"
                                value={formData.data_di_scadenza}
                                onChange={handleChange}
                                disabled={isFormLoading}
                            />
                            {errors.data_di_scadenza && <span className="error-message">{errors.data_di_scadenza}</span>}
                        </div>

                        {/* Campo Prezzo */}
                        <div className="form-field">
                            <label htmlFor="prezzo">Prezzo *</label>
                            <input
                                id="prezzo"
                                name="prezzo"
                                type="text"
                                value={formData.prezzo}
                                onChange={handleChange}
                                disabled={isFormLoading}
                                placeholder="Es: 1500.00"
                            />
                            {errors.prezzo && <span className="error-message">{errors.prezzo}</span>}
                        </div>
                    </div>

                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isFormLoading}>
                            {isFormLoading ? 'Elaborando...' : submitButtonText}
                        </button>
                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => navigate('/admin/gestione-contratti')}
                            disabled={isFormLoading}
                        >
                            Indietro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminContrattoForm;
