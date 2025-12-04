/**
 * @fileoverview Form unificato per la gestione degli immobili (creazione e modifica).
 * Gestisce validazione, caratteristiche immobile e comunicazione con API.
 * 
 * @module AdminImmobileForm
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
 * Regole di validazione per i campi principali dell'immobile
 * @constant {Object.<string, {regex: RegExp, message: string}>}
 */
const validationRules = {
    indirizzo: { regex: /^[a-zA-Z0-9\s,.'-]{5,100}$/, message: 'L\'indirizzo è obbligatorio (5-100 caratteri)' },
    citta: { regex: /^[a-zA-Z\s']{2,50}$/, message: 'La città è obbligatoria (2-50 caratteri)' },
    cap: { regex: /^[0-9]{5}$/, message: 'Il CAP deve essere di 5 cifre' },
    prezzo: { regex: /^[1-9][0-9]{3,}$/, message: 'Il prezzo deve essere un numero positivo (minimo 1000)' },
    superficie: { regex: /^[1-9][0-9]*$/, message: 'La superficie deve essere un numero positivo' },
    locali: { regex: /^[1-9][0-9]*$/, message: 'Il numero di locali deve essere positivo' }
};

// Stato iniziale del form.
const initialFormData = {
    foto: '',
    cap: '',
    citta: '',
    regione: '',
    indirizzo: '',
    prezzo: '',
    locali: '',
    superficie: '',
    descrizione: '',
    planimetria: '',
    mappa: '',
    // Caratteristiche
    tipologia: '',
    piano: '',
    ascensore: false,
    arredato: false,
    disponibilita: '',
    contratto: '',
    piani_edificio: '',
    anno_costruzione: '',
    classe_energetica: '',
    accesso_disabili: false,
    camere: '',
    bagni: '',
    balcone: '',
    riscaldamento: '',
    terrazzo: false,
    giardino: false,
    box_auto: '',
    cantina: false,
    altre_caratteristiche: ''
};

/**
 * Componente Form Unificato per Immobili.
 * Gestisce sia la creazione che la modifica di un immobile.
 * Il mode viene rilevato automaticamente: se c'è un ID nell'URL è 'edit', altrimenti 'add'.
 */
const ImmobileForm = () => {
    const navigate = useNavigate();
    // Prende l'ID dall'URL se in modalità 'edit'
    const { id: immobileId } = useParams();
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();
    
    // Rileva automaticamente il mode: se c'è un ID nell'URL è edit, altrimenti add
    const mode = immobileId ? 'edit' : 'add';

    // Stati locali del componente (completamente separati dall'hook)
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormLoading, setIsFormLoading] = useState(false); 
    const [apiError, setApiError] = useState(null);
    
    // Debug: logga lo stato di loading
    console.log('ImmobileForm - mode:', mode, 'isFormLoading:', isFormLoading, 'immobileId:', immobileId);
    
    // Funzione per ottenere un immobile per ID (chiamata diretta all'API)
    const getImmobileById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/immobili/${id}`; 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Impossibile trovare l'immobile ${id}. Errore: ${response.status}`);
        }
        return await response.json();
    }, []);
    
    // Funzione per salvare un immobile (chiamata diretta all'API)
    const saveImmobile = useCallback(async (immobileId, payload, mode) => {
        let url = '';
        let method = '';
        
        if (mode === 'add') {
            url = `${API_BASE_URL}/api/immobili`;
            method = 'POST';
        } else {
            url = `${API_BASE_URL}/api/immobili/edit/${immobileId}`;
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

        // Validazione campi obbligatori Immobile
        if (!formData.indirizzo.trim()) { newErrors.indirizzo = 'L\'indirizzo è obbligatorio'; }
        else if (!validationRules.indirizzo.regex.test(formData.indirizzo)) { newErrors.indirizzo = validationRules.indirizzo.message; }

        if (!formData.citta.trim()) { newErrors.citta = 'La città è obbligatoria'; }
        else if (!validationRules.citta.regex.test(formData.citta)) { newErrors.citta = validationRules.citta.message; }

        if (!formData.regione || !formData.regione.trim()) { newErrors.regione = 'La regione è obbligatoria'; }

        if (!formData.cap.trim()) { newErrors.cap = 'Il CAP è obbligatorio'; }
        else if (!validationRules.cap.regex.test(formData.cap)) { newErrors.cap = validationRules.cap.message; }

        if (!formData.prezzo || isNaN(formData.prezzo) || formData.prezzo <= 0) {
            newErrors.prezzo = 'Il prezzo è obbligatorio e deve essere un numero positivo.';
        } else if (!validationRules.prezzo.regex.test(formData.prezzo)) {
            newErrors.prezzo = validationRules.prezzo.message;
        }

        if (!formData.locali || formData.locali <= 0) { newErrors.locali = 'Il numero di locali è obbligatorio'; }
        if (!formData.superficie || formData.superficie <= 0) { newErrors.superficie = 'La superficie è obbligatoria'; }
        if (!formData.descrizione.trim()) { newErrors.descrizione = 'La descrizione è obbligatoria'; }
        if (!formData.foto.trim()) { newErrors.foto = 'L\'URL della foto è obbligatorio'; }

        // Validazione campi obbligatori CaratteristicheImmobile
        if (!formData.tipologia) { newErrors.tipologia = 'Seleziona la tipologia di immobile'; }
        if (!formData.piano) { newErrors.piano = 'Indica il piano'; }
        if (!formData.disponibilita) { newErrors.disponibilita = 'Indica la disponibilità'; }
        if (!formData.contratto) { newErrors.contratto = 'Seleziona il tipo di contratto'; }
        if (!formData.classe_energetica) { newErrors.classe_energetica = 'Seleziona la classe energetica'; }
        if (!formData.riscaldamento) { newErrors.riscaldamento = 'Indica il tipo di riscaldamento'; }

        return newErrors;
    }, [formData]);

    // Gestore generico per l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({ ...prevState, [name]: fieldValue }));

        // Rimuove l'errore non appena l'utente interagisce
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null);
    };

    // --- Caricamento Dati Esistenti (useEffect per "edit") ---
    useEffect(() => {
        const loadImmobileData = async () => {
            if (mode !== 'edit' || !immobileId) {
                setFormData(initialFormData);
                setIsFormLoading(false); // Assicurati che isFormLoading sia false in modalità add
                return;
            }

            setIsFormLoading(true); // Avvia il loading per bloccare il form
            setApiError(null);

            try {
                // CHIAMA L'API per ottenere i dati del singolo immobile
                const immobile = await getImmobileById(immobileId);

                // Formattazione dei dati API nel formato del form
                setFormData({
                    // Campi Immobile
                    foto: immobile.foto || '',
                    cap: immobile.cap || '',
                    citta: immobile.citta || '',
                    regione: immobile.regione || '',
                    indirizzo: immobile.indirizzo || '',
                    prezzo: immobile.prezzo ? String(immobile.prezzo) : '',
                    locali: immobile.locali ? String(immobile.locali) : '',
                    superficie: immobile.superficie ? String(immobile.superficie) : '',
                    descrizione: immobile.descrizione || '',
                    planimetria: immobile.planimetria || '',
                    mappa: immobile.mappa || '',
                    // Campi CaratteristicheImmobile (nested)
                    tipologia: immobile.caratteristiche?.tipologia || '',
                    piano: immobile.caratteristiche?.piano || '',
                    ascensore: immobile.caratteristiche?.ascensore || false,
                    arredato: immobile.caratteristiche?.arredato || false,
                    disponibilita: immobile.caratteristiche?.disponibilita || '',
                    contratto: immobile.caratteristiche?.contratto || '',
                    piani_edificio: immobile.caratteristiche?.piani_edificio ? String(immobile.caratteristiche.piani_edificio) : '',
                    anno_costruzione: immobile.caratteristiche?.anno_costruzione ? String(immobile.caratteristiche.anno_costruzione) : '',
                    classe_energetica: immobile.caratteristiche?.classe_energetica || '',
                    accesso_disabili: immobile.caratteristiche?.accesso_disabili || false,
                    camere: immobile.caratteristiche?.camere ? String(immobile.caratteristiche.camere) : '',
                    bagni: immobile.caratteristiche?.bagni ? String(immobile.caratteristiche.bagni) : '',
                    balcone: immobile.caratteristiche?.balcone ? String(immobile.caratteristiche.balcone) : '',
                    riscaldamento: immobile.caratteristiche?.riscaldamento || '',
                    terrazzo: immobile.caratteristiche?.terrazzo || false,
                    giardino: immobile.caratteristiche?.giardino || false,
                    box_auto: immobile.caratteristiche?.box_auto ? String(immobile.caratteristiche.box_auto) : '',
                    cantina: immobile.caratteristiche?.cantina || false,
                    altre_caratteristiche: immobile.caratteristiche?.altre_caratteristiche || ''
                });

            } catch (error) {
                console.error(error);
                const errorMsg = error.message || "Errore nel caricamento dei dati dell'immobile.";
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
                navigate('/admin/immobili');
            } finally {
                setIsFormLoading(false); // Termina il loading
            }
        };

        loadImmobileData();
    // Dipendenze: mode, immobileId, navigate e le funzioni sono stabili con useCallback
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

        // 2. Prepara il payload con tutti i campi del database
        const payload = {
            // Campi Immobile
            foto: formData.foto,
            cap: formData.cap,
            citta: formData.citta,
            regione: formData.regione,
            indirizzo: formData.indirizzo,
            prezzo: parseFloat(formData.prezzo),
            locali: parseInt(formData.locali),
            superficie: parseInt(formData.superficie),
            descrizione: formData.descrizione,
            planimetria: formData.planimetria,
            mappa: formData.mappa,
            // Oggetto nested CaratteristicheImmobile
            caratteristiche: {
                tipologia: formData.tipologia,
                piano: formData.piano,
                ascensore: formData.ascensore,
                arredato: formData.arredato,
                disponibilita: formData.disponibilita,
                contratto: formData.contratto,
                piani_edificio: parseInt(formData.piani_edificio) || 0,
                anno_costruzione: parseInt(formData.anno_costruzione) || new Date().getFullYear(),
                classe_energetica: formData.classe_energetica,
                accesso_disabili: formData.accesso_disabili,
                camere: parseInt(formData.camere) || 0,
                bagni: parseInt(formData.bagni) || 0,
                balcone: parseInt(formData.balcone) || 0,
                riscaldamento: formData.riscaldamento,
                terrazzo: formData.terrazzo,
                giardino: formData.giardino,
                box_auto: parseInt(formData.box_auto) || 0,
                cantina: formData.cantina,
                altre_caratteristiche: formData.altre_caratteristiche
            }
        };

        setIsFormLoading(true);

        try {
            // 3. Chiama la funzione di salvataggio API (saveImmobile)
            await saveImmobile(immobileId, payload, mode);

            // 4. In caso di successo, mostra modale di conferma
            await showConfirm({
                title: 'Successo',
                message: mode === 'add' ? 'Immobile aggiunto con successo!' : 'Immobile modificato con successo!',
                type: 'success',
                confirmText: 'OK',
                showCancel: false
            });
            navigate('/admin/immobili');
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
    const pageTitle = mode === 'add' ? '+ Aggiungi Nuovo Immobile' : `Modifica Immobile ${immobileId}`;
    const submitButtonText = mode === 'add' ? 'Aggiungi Immobile' : 'Salva Modifiche';

    // Opzioni per i select
    const classiEnergetiche = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const tipologieImmobili = ['Appartamento', 'Villa', 'Casa Indipendente', 'Attico', 'Loft', 'Ufficio', 'Negozio', 'Garage', 'Terreno'];
    const tipiContratto = ['Vendita', 'Affitto', 'Affitto breve'];
    const disponibilitaOptions = ['Libero subito', 'Da concordare', 'Occupato'];
    const tipiRiscaldamento = ['Autonomo', 'Centralizzato', 'Condominiale', 'Assente'];
    const pianiOptions = ['Piano terra', 'Piano rialzato', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+', 'Attico'];

    return (
        <div className="immobile-form-container">
            <h1>{pageTitle}</h1>
            {apiError && <div className="api-error-alert alert-danger">**Attenzione:** {apiError}</div>}
            {isFormLoading && mode === 'edit' && !apiError && <div>Caricamento dati immobile...</div>}

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    {/* SEZIONE 1: DATI PRINCIPALI */}
                    <h3>Dati Principali</h3>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="indirizzo">Indirizzo *</label>
                            <input id="indirizzo" name="indirizzo" value={formData.indirizzo} onChange={handleChange} disabled={isFormLoading} placeholder="Via Roma, 123" />
                            {errors.indirizzo && <span className="error-message">{errors.indirizzo}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="citta">Città *</label>
                            <input id="citta" name="citta" value={formData.citta} onChange={handleChange} disabled={isFormLoading} placeholder="Milano" />
                            {errors.citta && <span className="error-message">{errors.citta}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="regione">Regione *</label>
                            <input id="regione" name="regione" value={formData.regione} onChange={handleChange} disabled={isFormLoading} placeholder="Lombardia" />
                            {errors.regione && <span className="error-message">{errors.regione}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="cap">CAP *</label>
                            <input id="cap" name="cap" value={formData.cap} onChange={handleChange} disabled={isFormLoading} placeholder="20100" maxLength="5" />
                            {errors.cap && <span className="error-message">{errors.cap}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="prezzo">Prezzo (€) *</label>
                            <input id="prezzo" name="prezzo" type="number" value={formData.prezzo} onChange={handleChange} disabled={isFormLoading} min="1000" placeholder="250000" />
                            {errors.prezzo && <span className="error-message">{errors.prezzo}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="locali">Locali *</label>
                            <input id="locali" name="locali" type="number" value={formData.locali} onChange={handleChange} disabled={isFormLoading} min="1" placeholder="3" />
                            {errors.locali && <span className="error-message">{errors.locali}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="superficie">Superficie (m²) *</label>
                            <input id="superficie" name="superficie" type="number" value={formData.superficie} onChange={handleChange} disabled={isFormLoading} min="1" placeholder="85" />
                            {errors.superficie && <span className="error-message">{errors.superficie}</span>}
                        </div>
                        <div className="form-field full-width">
                            <label htmlFor="foto">URL Foto *</label>
                            <input id="foto" name="foto" value={formData.foto} onChange={handleChange} disabled={isFormLoading} placeholder="https://esempio.com/foto.jpg" />
                            {errors.foto && <span className="error-message">{errors.foto}</span>}
                        </div>
                        <div className="form-field full-width">
                            <label htmlFor="descrizione">Descrizione *</label>
                            <textarea id="descrizione" name="descrizione" value={formData.descrizione} onChange={handleChange} disabled={isFormLoading} rows="4" placeholder="Descrivi l'immobile..." />
                            {errors.descrizione && <span className="error-message">{errors.descrizione}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="planimetria">URL Planimetria</label>
                            <input id="planimetria" name="planimetria" value={formData.planimetria} onChange={handleChange} disabled={isFormLoading} placeholder="https://esempio.com/planimetria.pdf" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="mappa">URL Mappa</label>
                            <input id="mappa" name="mappa" value={formData.mappa} onChange={handleChange} disabled={isFormLoading} placeholder="https://maps.google.com/..." />
                        </div>
                    </div>

                    {/* SEZIONE 2: CARATTERISTICHE PRINCIPALI */}
                    <h3>Caratteristiche Principali</h3>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="tipologia">Tipologia *</label>
                            <select id="tipologia" name="tipologia" value={formData.tipologia} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona tipologia</option>
                                {tipologieImmobili.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                            </select>
                            {errors.tipologia && <span className="error-message">{errors.tipologia}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="piano">Piano *</label>
                            <select id="piano" name="piano" value={formData.piano} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona piano</option>
                                {pianiOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {errors.piano && <span className="error-message">{errors.piano}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="piani_edificio">Piani Edificio</label>
                            <input id="piani_edificio" name="piani_edificio" type="number" value={formData.piani_edificio} onChange={handleChange} disabled={isFormLoading} min="1" placeholder="5" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="anno_costruzione">Anno Costruzione</label>
                            <input id="anno_costruzione" name="anno_costruzione" type="number" value={formData.anno_costruzione} onChange={handleChange} disabled={isFormLoading} min="1800" max={new Date().getFullYear()} placeholder="2005" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="classe_energetica">Classe Energetica *</label>
                            <select id="classe_energetica" name="classe_energetica" value={formData.classe_energetica} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona classe</option>
                                {classiEnergetiche.map(classe => <option key={classe} value={classe}>{classe}</option>)}
                            </select>
                            {errors.classe_energetica && <span className="error-message">{errors.classe_energetica}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="contratto">Tipo Contratto *</label>
                            <select id="contratto" name="contratto" value={formData.contratto} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona contratto</option>
                                {tipiContratto.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.contratto && <span className="error-message">{errors.contratto}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="disponibilita">Disponibilità *</label>
                            <select id="disponibilita" name="disponibilita" value={formData.disponibilita} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona disponibilità</option>
                                {disponibilitaOptions.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            {errors.disponibilita && <span className="error-message">{errors.disponibilita}</span>}
                        </div>
                        <div className="form-field">
                            <label htmlFor="riscaldamento">Riscaldamento *</label>
                            <select id="riscaldamento" name="riscaldamento" value={formData.riscaldamento} onChange={handleChange} disabled={isFormLoading}>
                                <option value="">Seleziona riscaldamento</option>
                                {tipiRiscaldamento.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            {errors.riscaldamento && <span className="error-message">{errors.riscaldamento}</span>}
                        </div>
                    </div>

                    {/* SEZIONE 3: COMPOSIZIONE */}
                    <h3> Composizione</h3>
                    <div className="form-grid">
                        <div className="form-field">
                            <label htmlFor="camere">Camere</label>
                            <input id="camere" name="camere" type="number" value={formData.camere} onChange={handleChange} disabled={isFormLoading} min="0" placeholder="2" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="bagni">Bagni</label>
                            <input id="bagni" name="bagni" type="number" value={formData.bagni} onChange={handleChange} disabled={isFormLoading} min="0" placeholder="1" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="balcone">Balconi</label>
                            <input id="balcone" name="balcone" type="number" value={formData.balcone} onChange={handleChange} disabled={isFormLoading} min="0" placeholder="1" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="box_auto">Box Auto</label>
                            <input id="box_auto" name="box_auto" type="number" value={formData.box_auto} onChange={handleChange} disabled={isFormLoading} min="0" placeholder="1" />
                        </div>
                    </div>

                    {/* SEZIONE 4: CARATTERISTICHE AGGIUNTIVE */}
                    <h3> Caratteristiche Aggiuntive</h3>
                    <div className="form-grid checkboxes">
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="ascensore" checked={formData.ascensore} onChange={handleChange} disabled={isFormLoading} />
                                <span>Ascensore</span>
                            </label>
                        </div>
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="arredato" checked={formData.arredato} onChange={handleChange} disabled={isFormLoading} />
                                <span>Arredato</span>
                            </label>
                        </div>
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="terrazzo" checked={formData.terrazzo} onChange={handleChange} disabled={isFormLoading} />
                                <span>Terrazzo</span>
                            </label>
                        </div>
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="giardino" checked={formData.giardino} onChange={handleChange} disabled={isFormLoading} />
                                <span>Giardino</span>
                            </label>
                        </div>
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="cantina" checked={formData.cantina} onChange={handleChange} disabled={isFormLoading} />
                                <span>Cantina</span>
                            </label>
                        </div>
                        <div className="form-field checkbox-field">
                            <label>
                                <input type="checkbox" name="accesso_disabili" checked={formData.accesso_disabili} onChange={handleChange} disabled={isFormLoading} />
                                <span>Accesso Disabili</span>
                            </label>
                        </div>
                    </div>

                    {/* SEZIONE 5: ALTRE CARATTERISTICHE */}
                    <h3> Altre Caratteristiche</h3>
                    <div className="form-grid">
                        <div className="form-field full-width">
                            <label htmlFor="altre_caratteristiche">Altre Caratteristiche</label>
                            <textarea id="altre_caratteristiche" name="altre_caratteristiche" value={formData.altre_caratteristiche} onChange={handleChange} disabled={isFormLoading} rows="3" placeholder="Es: Ripostiglio, cantina, posto auto scoperto..." />
                        </div>
                    </div>

                    {/* Bottoni d'azione */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isFormLoading}>
                            {isFormLoading ? '⏳ Elaborando...' : submitButtonText}
                        </button>
                        <button type="button" className="back-btn" onClick={() => navigate('/admin/immobili')} disabled={isFormLoading}>
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

export default ImmobileForm;
