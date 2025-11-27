// src/components/ImmobileForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useImmobiliManager from '../hooks/UseImmobili';// Importa il hook per gli Immobili

// --- REGOLE DI VALIDAZIONE ---
const validationRules = {
    indirizzo: { regex: /^[a-zA-Z0-9\s,.'-]{5,100}$/, message: 'L\'indirizzo è obbligatorio (5-100 caratteri)' },
    citta: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città è obbligatoria e deve contenere solo lettere e spazi (2-50 caratteri)' },
    prezzo: { regex: /^[1-9][0-9]{3,}$/, message: 'Il prezzo è obbligatorio e deve essere un numero positivo (minimo 1000)' },
};

// Stato iniziale del form.
const initialFormData = {
    indirizzo: '',
    citta: '',
    prezzo: '',
    classeEnergetica: '', // A, B, C, D, E, F, G
    tipologia: '', // Esempio: "Appartamento", "Villa", "Ufficio"
};

/**
 * Componente Form Unificato per Immobili.
 * Gestisce sia la creazione (mode='add') che la modifica (mode='edit') di un immobile.
 * @param {string} mode - Determina la modalità operativa: 'add' (default) o 'edit'.
 */
const ImmobileForm = ({ mode = 'add' }) => {
    const navigate = useNavigate();
    // Prende l'ID dall'URL se in modalità 'edit'
    const { id: immobileId } = useParams();

    // Importiamo le funzioni API specifiche per gli immobili
    const { saveImmobile, getImmobileById } = useImmobiliManager();

    // Stati locali del componente
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // --- Logica di Validazione ---
    const validateForm = useCallback(() => {
        const newErrors = {};

        // Validazione Indirizzo
        if (!formData.indirizzo.trim()) { newErrors.indirizzo = 'L\'indirizzo è obbligatorio'; }
        else if (!validationRules.indirizzo.regex.test(formData.indirizzo)) { newErrors.indirizzo = validationRules.indirizzo.message; }

        // Validazione Città
        if (!formData.citta.trim()) { newErrors.citta = 'La città è obbligatoria'; }
        else if (!validationRules.citta.regex.test(formData.citta)) { newErrors.citta = validationRules.citta.message; }

        // Validazione Prezzo
        if (!formData.prezzo || isNaN(formData.prezzo) || formData.prezzo <= 0) {
            newErrors.prezzo = 'Il prezzo è obbligatorio e deve essere un numero positivo.';
        } else if (!validationRules.prezzo.regex.test(formData.prezzo)) {
            newErrors.prezzo = validationRules.prezzo.message;
        }

        // Validazione Classe Energetica (obbligatoria)
        if (!formData.classeEnergetica) { newErrors.classeEnergetica = 'Seleziona la classe energetica'; }

        // Validazione Tipologia (obbligatoria)
        if (!formData.tipologia) { newErrors.tipologia = 'Seleziona la tipologia di immobile'; }

        return newErrors;
    }, [formData]);

    // Gestore generico per l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        // Rimuove l'errore non appena l'utente interagisce
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null);
    };

    // --- Caricamento Dati Esistenti (useEffect per "edit") ---
    useEffect(() => {
        const loadImmobileData = async () => {
            if (mode !== 'edit' || !immobileId) {
                setFormData(initialFormData);
                return;
            }

            setIsLoading(true);
            setApiError(null);

            try {
                // CHIAMA L'API per ottenere i dati del singolo immobile
                const immobile = await getImmobileById(immobileId);

                // Formattazione dei dati API nel formato del form (ADATTA LE CHIAVI API)
                setFormData({
                    indirizzo: immobile.address || '',
                    citta: immobile.city || '',
                    prezzo: immobile.price ? String(immobile.price) : '', // Converti in stringa per l'input
                    classeEnergetica: immobile.energyClass || '',
                    tipologia: immobile.type || '',
                });

            } catch (error) {
                console.error(error);
                setApiError(error.message || "Errore nel caricamento dei dati dell'immobile.");
                // Reindirizza l'utente dopo un errore critico di caricamento
                setTimeout(() => navigate('/admin/gestione-immobili'), 3000);
            } finally {
                setIsLoading(false);
            }
        };

        loadImmobileData();
    }, [mode, immobileId, navigate, getImmobileById]);

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

        // 2. Prepara il payload con i nomi delle chiavi attesi dal backend (ADATTA QUESTI NOMI)
        const payload = {
            // Esempio: keys API (CamelCase) vs keys Form (Italiano)
            address: formData.indirizzo,
            city: formData.citta,
            // Assicurati che il prezzo sia un numero, se richiesto dal backend
            price: parseFloat(formData.prezzo),
            energyClass: formData.classeEnergetica,
            type: formData.tipologia,
        };

        setIsLoading(true);

        try {
            // 3. Chiama la funzione di salvataggio API (saveImmobile)
            await saveImmobile(immobileId, payload, mode);

            // 4. In caso di successo, reindirizza
            navigate('/admin/gestione-immobili');
        } catch (error) {
            // 5. Gestisce l'errore API
            setApiError(error.message || `Si è verificato un errore durante l'operazione di ${mode}.`);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Rendering ---
    const pageTitle = mode === 'add' ? '➕ Aggiungi Nuovo Immobile' : `✍️ Modifica Immobile (ID: ${immobileId})`;
    const submitButtonText = mode === 'add' ? 'Aggiungi Immobile' : 'Salva Modifiche';

    // Opzioni statiche per i campi Select
    const classiEnergetiche = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const tipologieImmobili = ['Appartamento', 'Villa', 'Casa Indipendente', 'Ufficio', 'Negozio', 'Garage'];

    return (
        <div className="immobile-form-container">
            <h1>{pageTitle}</h1>
            {/* Visualizzazione degli errori API/di sistema */}
            {apiError && <div className="api-error-alert alert-danger">**Attenzione:** {apiError}</div>}
            {/* Visualizzazione del loading durante il caricamento dei dati in 'edit' */}
            {isLoading && mode === 'edit' && !apiError && <div>Caricamento dati immobile...</div>}

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Campo Indirizzo */}
                        <div className="form-field">
                            <label htmlFor="indirizzo">Indirizzo *</label>
                            <input id="indirizzo" name="indirizzo" value={formData.indirizzo} onChange={handleChange} disabled={isLoading} />
                            {errors.indirizzo && <span className="error-message">{errors.indirizzo}</span>}
                        </div>
                        {/* Campo Città */}
                        <div className="form-field">
                            <label htmlFor="citta">Città *</label>
                            <input id="citta" name="citta" value={formData.citta} onChange={handleChange} disabled={isLoading} />
                            {errors.citta && <span className="error-message">{errors.citta}</span>}
                        </div>
                        {/* Campo Prezzo */}
                        <div className="form-field">
                            <label htmlFor="prezzo">Prezzo (€) *</label>
                            <input id="prezzo" name="prezzo" value={formData.prezzo} onChange={handleChange} disabled={isLoading} type="number" min="1000" />
                            {errors.prezzo && <span className="error-message">{errors.prezzo}</span>}
                        </div>
                        {/* Campo Tipologia (Select) */}
                        <div className="form-field">
                            <label htmlFor="tipologia">Tipologia *</label>
                            <select id="tipologia" name="tipologia" value={formData.tipologia} onChange={handleChange} disabled={isLoading}>
                                <option value="">Seleziona tipologia</option>
                                {tipologieImmobili.map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                            {errors.tipologia && <span className="error-message">{errors.tipologia}</span>}
                        </div>
                        {/* Campo Classe Energetica (Select) */}
                        <div className="form-field">
                            <label htmlFor="classeEnergetica">Classe Energetica *</label>
                            <select id="classeEnergetica" name="classeEnergetica" value={formData.classeEnergetica} onChange={handleChange} disabled={isLoading}>
                                <option value="">Seleziona classe</option>
                                {classiEnergetiche.map(classe => (
                                    <option key={classe} value={classe}>{classe}</option>
                                ))}
                            </select>
                            {errors.classeEnergetica && <span className="error-message">{errors.classeEnergetica}</span>}
                        </div>
                        {/* Campo Placeholder (per mantenere la griglia) */}
                        <div className="form-field">
                             <label>&nbsp;</label>
                             <div style={{height: '38px'}}></div>
                        </div>

                    </div>

                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? '⏳ Elaborando...' : submitButtonText}
                        </button>
                        <button type="button" className="back-btn" onClick={() => navigate('/admin/gestione-immobili')} disabled={isLoading}>
                            Indietro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImmobileForm;