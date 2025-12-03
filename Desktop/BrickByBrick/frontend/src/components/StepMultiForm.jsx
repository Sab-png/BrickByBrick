/**
 * @fileoverview Form multi-step per valutazione immobile.
 * 5 step: dati proprietario, ubicazione, tipologia, dettagli, riepilogo.
 * 
 * @module StepMultiForm
 * @requires react
 * @requires react-router-dom
 * @requires ./CardStep
 * @requires ../store/auth-context
 */

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardStep from './CardStep';
import AuthContext from '../store/auth-context';

const StepForm = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext) || {};
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    const getUserData = () => ({
        nome: user?.nome || 'Guest',
        cognome: user?.cognome || 'User',
        email: user?.email || 'guest@example.com',
        telefono: user?.telefono || '',
        idUtente: user?.id || null
    });

    const userData = getUserData();

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        indirizzo: '',
        citta: '',
        provincia: '',
        cap: '',
        tipologia: '',
        numeroLocali: '',
        superficie: '',
        pianoAbitazione: '',
        statoImmobile: '',
        classeEnergetica: '',
        annoCostruzione: '',
        dotazioniEsterne: [],
        ascensore: false,
        nome: userData.nome,
        cognome: userData.cognome,
        email: userData.email,
        numeroBagni: '',
        telefono: userData.telefono,
        privacy: false
    });

    const [isHydrated, setIsHydrated] = useState(false);
    const totalSteps = 6;
    const STORAGE_KEY = 'stepMultiForm.saved';

    // Carica dati da sessionStorage
    useEffect(() => {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);

                if (parsed.currentStep >= 6) {
                    sessionStorage.removeItem(STORAGE_KEY);
                    setIsHydrated(true);
                    return;
                }

                if (parsed.formData) {
                    setFormData(prev => ({
                        ...parsed.formData,
                        nome: userData.nome,
                        cognome: userData.cognome,
                        email: userData.email,
                        telefono: parsed.formData.telefono || userData.telefono
                    }));
                }
                if (parsed.currentStep) {
                    setCurrentStep(parsed.currentStep);
                }
            }
        } catch (e) {
            console.warn('Unable to load saved form data', e);
        }
        setIsHydrated(true);
    }, []);

    // Salva dati su sessionStorage
    useEffect(() => {
        if (!isHydrated) return;

        if (currentStep === 6) {
            sessionStorage.removeItem(STORAGE_KEY);
            return;
        }

        try {
            const payload = JSON.stringify({ formData, currentStep });
            sessionStorage.setItem(STORAGE_KEY, payload);
        } catch (e) {
            console.warn('Unable to save form data', e);
        }
    }, [formData, currentStep, isHydrated]);

    const isStepCompleted = (step) => {
        switch (step) {
            case 1:
                return (
                    formData.indirizzo.trim() &&
                    formData.citta.trim() &&
                    formData.provincia.trim() &&
                    /^\d{5}$/.test(formData.cap)
                );
            case 2:
                return (
                    formData.tipologia &&
                    String(formData.numeroLocali).trim() !== '' && Number(formData.numeroLocali) > 0 &&
                    String(formData.numeroBagni).trim() !== '' && Number(formData.numeroBagni) > 0
                );
            case 3:
                return (
                    String(formData.superficie).trim() !== '' && Number(formData.superficie) > 0 &&
                    String(formData.pianoAbitazione).trim() !== '' && Number(formData.pianoAbitazione) >= 0 &&
                    !!formData.statoImmobile &&
                    !!formData.classeEnergetica &&
                    String(formData.annoCostruzione).trim() !== ''
                );
            case 4:
                return Array.isArray(formData.dotazioniEsterne) && formData.dotazioniEsterne.length > 0;
            case 5:
                return formData.privacy === true;
            default:
                return false;
        }
    };

    const getClickableSteps = () => {
        if (currentStep >= 6) return [];
        const clickable = [];
        for (let i = 1; i < currentStep; i++) {
            clickable.push(i);
        }
        if (isStepCompleted(currentStep)) {
            for (let i = currentStep + 1; i < 6; i++) {
                clickable.push(i);
            }
        }
        return clickable;
    };

    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 1:
                if (!formData.indirizzo.trim()) newErrors.indirizzo = 'Indirizzo obbligatorio';
                if (!formData.citta.trim()) newErrors.citta = 'Città obbligatoria';
                if (!formData.provincia.trim()) newErrors.provincia = 'Provincia obbligatoria';
                if (!formData.cap.trim() || !/^\d{5}$/.test(formData.cap)) newErrors.cap = 'CAP non valido';
                break;

            case 2:
                if (!formData.tipologia) newErrors.tipologia = 'Seleziona una tipologia';
                if (!formData.numeroLocali) newErrors.numeroLocali = 'Inserisci i locali';
                if (!formData.numeroBagni) newErrors.numeroBagni = 'Inserisci i bagni';
                break;

            case 3:
                if (!formData.superficie) newErrors.superficie = 'Superficie obbligatoria';
                if (!formData.pianoAbitazione) newErrors.pianoAbitazione = 'Piano obbligatorio';
                if (!formData.statoImmobile) newErrors.statoImmobile = 'Seleziona stato';
                if (!formData.classeEnergetica) newErrors.classeEnergetica = 'Seleziona classe';
                if (!formData.annoCostruzione) newErrors.annoCostruzione = 'Anno obbligatorio';
                break;

            case 4:
                if (formData.dotazioniEsterne.length === 0) {
                    newErrors.dotazioniEsterne = 'Seleziona almeno una dotazione';
                }
                break;

            case 5:
                if (!formData.privacy) {
                    newErrors.privacy = 'Devi accettare la privacy policy per inviare la richiesta';
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleArrayValue = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
                setErrors({});
            }
        }
    };

    const handleJumpToStep = (targetStep) => {
        if (currentStep >= 6) return;
        if (targetStep < currentStep) {
            setCurrentStep(targetStep);
            setErrors({});
            return;
        }
        if (targetStep > currentStep) {
            if (!validateStep(currentStep)) return;
            for (let i = 1; i < targetStep; i++) {
                if (!isStepCompleted(i)) return;
            }
            setCurrentStep(targetStep);
            setErrors({});
            return;
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const prevStepWithHomeRedirect = () => {
        if (currentStep === 1) {
            navigate('/');
        } else {
            prevStep();
        }
    };

    const handleSubmit = async () => {
        const valid = validateStep(5);
        if (!valid) return;

        setIsLoading(true);
        setSubmitError('');

        const payload = {
            idUtente: userData.idUtente || null,
            cap: formData.cap,
            citta: formData.citta,
            indirizzo: formData.indirizzo,
            tipologia: formData.tipologia,
            piano: String(formData.pianoAbitazione),
            locali: Number(formData.numeroLocali),
            superficie: Number(formData.superficie),
            condizioni: formData.statoImmobile,
            bagni: Number(formData.numeroBagni),
            anno_costruzione: Number(formData.annoCostruzione),
            classe_energetica: formData.classeEnergetica,
            dotazioni: {
                ascensore: formData.dotazioniEsterne.includes('Ascensore'),
                giardino: formData.dotazioniEsterne.includes('Giardino'),
                piscina: formData.dotazioniEsterne.includes('Piscina'),
                garage: formData.dotazioniEsterne.includes('Garage'),
                terrazzo: formData.dotazioniEsterne.includes('Terrazzo'),
                balcone: formData.dotazioniEsterne.includes('Balcone'),
                cantina: formData.dotazioniEsterne.includes('Cantina')
            }
        };

        try {
            const response = await fetch('http://localhost:8085/api/valutazione/calcola', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
            }

            const result = await response.json();

            console.log(result)

            setApiResponse(result);
            sessionStorage.removeItem(STORAGE_KEY);
            setCurrentStep(6);

        } catch (error) {
            console.error('Errore nell\'invio:', error);
            setSubmitError(error.message || 'Errore durante l\'invio della ricerca. Riprovare.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            indirizzo: '',
            citta: '',
            provincia: '',
            cap: '',
            tipologia: '',
            numeroLocali: '',
            superficie: '',
            pianoAbitazione: '',
            statoImmobile: '',
            classeEnergetica: '',
            annoCostruzione: '',
            dotazioniEsterne: [],
            ascensore: false,
            nome: userData.nome,
            cognome: userData.cognome,
            email: userData.email,
            numeroBagni: '',
            telefono: userData.telefono,
            privacy: false
        });
        setApiResponse(null);
        setCurrentStep(1);
        sessionStorage.removeItem(STORAGE_KEY);
    };

    // STEP 1 - LOCALIZZAZIONE
    if (currentStep === 1) {
        return (
            <CardStep
                title="Dove si trova l'immobile?"
                subtitle="Inserisci la posizione"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStepWithHomeRedirect}
            >
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Indirizzo</label>
                        <input type="text" value={formData.indirizzo} onChange={(e) => updateFormData('indirizzo', e.target.value)} className="form-input" placeholder="Via Roma, 123" />
                        {errors.indirizzo && <p className="error-message">{errors.indirizzo}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Città</label>
                        <input type="text" value={formData.citta} onChange={(e) => updateFormData('citta', e.target.value)} className="form-input" placeholder="Milano" />
                        {errors.citta && <p className="error-message">{errors.citta}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Provincia</label>
                        <input type="text" value={formData.provincia} onChange={(e) => updateFormData('provincia', e.target.value)} className="form-input" placeholder="MI" />
                        {errors.provincia && <p className="error-message">{errors.provincia}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">CAP</label>
                        <input type="text" value={formData.cap} onChange={(e) => updateFormData('cap', e.target.value)} className="form-input" placeholder="20100" />
                        {errors.cap && <p className="error-message">{errors.cap}</p>}
                    </div>
                </div>
            </CardStep>
        );
    }

    // STEP 2 - TIPOLOGIA E COMPOSIZIONE
    if (currentStep === 2) {
        return (
            <CardStep
                title="Dettagli dell'immobile"
                subtitle="Seleziona la tipologia e le caratteristiche"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
            >
                <div className="form-section">
                    <label className="section-label">Tipologia</label>
                    <div className="options-grid tipologia-grid centered">
                        {['APPARTAMENTO', 'CASA_INDIPENDENTE'].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => updateFormData('tipologia', tipo)}
                                className={`option-card ${formData.tipologia === tipo ? 'selected' : ''}`}
                            >
                                <p className="option-text">{tipo === 'APPARTAMENTO' ? 'Appartamento' : 'Casa Indipendente'}</p>
                            </button>
                        ))}
                    </div>
                    {errors.tipologia && <p className="error-message">{errors.tipologia}</p>}
                </div>
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Locali</label>
                        <input type="number" value={formData.numeroLocali} onChange={(e) => updateFormData('numeroLocali', e.target.value)} className="form-input" min="1" />
                        {errors.numeroLocali && <p className="error-message">{errors.numeroLocali}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Bagni</label>
                        <input type="number" value={formData.numeroBagni} onChange={(e) => updateFormData('numeroBagni', e.target.value)} className="form-input" min="1" />
                        {errors.numeroBagni && <p className="error-message">{errors.numeroBagni}</p>}
                    </div>
                </div>
            </CardStep>
        );
    }

    // STEP 3 - CONDIZIONI E DIMENSIONI
    if (currentStep === 3) {
        return (
            <CardStep
                title="Condizioni e dimensioni"
                subtitle="Inserisci i dettagli tecnici"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
            >
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Superficie (m²)</label>
                        <input type="number" value={formData.superficie} onChange={(e) => updateFormData('superficie', e.target.value)} className="form-input" min="1" />
                        {errors.superficie && <p className="error-message">{errors.superficie}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Piano</label>
                        <input type="number" value={formData.pianoAbitazione} onChange={(e) => updateFormData('pianoAbitazione', e.target.value)} className="form-input" min="0" />
                        {errors.pianoAbitazione && <p className="error-message">{errors.pianoAbitazione}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Anno di costruzione</label>
                        <input type="number" value={formData.annoCostruzione} onChange={(e) => updateFormData('annoCostruzione', e.target.value)} className="form-input" min="1800" max={new Date().getFullYear()} />
                        {errors.annoCostruzione && <p className="error-message">{errors.annoCostruzione}</p>}
                    </div>
                    <div className="form-field">
                        <label className="form-label">Classe Energetica</label>
                        <select value={formData.classeEnergetica} onChange={(e) => updateFormData('classeEnergetica', e.target.value)} className="form-input">
                            <option value="">-- Seleziona --</option>
                            {['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.classeEnergetica && <p className="error-message">{errors.classeEnergetica}</p>}
                    </div>
                </div>
                <div className="form-section">
                    <label className="section-label">Stato dell'immobile</label>
                    <div className="options-grid stato-grid">
                        {['NUOVO', 'RISTRUTTURATO', 'DA_RISTRUTTURARE'].map((stato) => (
                            <button key={stato} onClick={() => updateFormData('statoImmobile', stato)} className={`option-card simple ${formData.statoImmobile === stato ? 'selected' : ''}`}>
                                <p className="option-text">{stato.replace(/_/g, ' ')}</p>
                            </button>
                        ))}
                    </div>
                    {errors.statoImmobile && <p className="error-message">{errors.statoImmobile}</p>}
                </div>
            </CardStep>
        );
    }

    // STEP 4 - DOTAZIONI
    if (currentStep === 4) {
        return (
            <CardStep
                title="Dotazioni esterne"
                subtitle="Seleziona gli optional dell'immobile"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
            >
                <div className="options-grid dotazioni-grid">
                    {['Giardino', 'Piscina', 'Garage', 'Terrazzo', 'Balcone', 'Cantina', 'Ascensore'].map((dot) => (
                        <button key={dot} onClick={() => toggleArrayValue('dotazioniEsterne', dot)} className={`option-card ${formData.dotazioniEsterne.includes(dot) ? 'selected' : ''}`}>
                            <p className="option-text">{dot}</p>
                        </button>
                    ))}
                </div>
                {errors.dotazioniEsterne && <p className="error-message">{errors.dotazioniEsterne}</p>}
            </CardStep>
        );
    }

    // STEP 5 - RIEPILOGO E PRIVACY
    if (currentStep === 5) {
        return (
            <CardStep
                title="Riepilogo Richiesta"
                subtitle="Controlla i dati prima di inviare"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={null}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={true}
            >
                {submitError && (
                    <div className="error-banner">
                        {submitError}
                    </div>
                )}

                <div className="summary-container">
                    <h4>Dettagli Inseriti:</h4>
                    <div>
                        <div><strong>Indirizzo:</strong> {formData.indirizzo}, {formData.citta} ({formData.provincia})</div>
                        <div><strong>CAP:</strong> {formData.cap}</div>
                        <div><strong>Tipologia:</strong> {formData.tipologia === 'APPARTAMENTO' ? 'Appartamento' : 'Casa Indipendente'}</div>
                        <div><strong>Composizione:</strong> {formData.numeroLocali} locali, {formData.numeroBagni} bagni</div>
                        <div><strong>Superficie:</strong> {formData.superficie} m²</div>
                        <div><strong>Piano:</strong> {formData.pianoAbitazione}</div>
                        <div><strong>Stato:</strong> {formData.statoImmobile.replace(/_/g, ' ')}</div>
                        <div><strong>Classe Energetica:</strong> {formData.classeEnergetica}</div>
                        <div><strong>Anno:</strong> {formData.annoCostruzione}</div>
                        <div style={{ gridColumn: 'span 2' }}><strong>Dotazioni:</strong> {formData.dotazioniEsterne.join(', ') || 'Nessuna'}</div>
                    </div>
                </div>

                <div className="privacy-checkbox">
                    <input
                        type="checkbox"
                        id="privacy"
                        checked={formData.privacy}
                        onChange={(e) => updateFormData('privacy', e.target.checked)}
                        className="checkbox-input"
                        disabled={isLoading}
                    />
                    <label htmlFor="privacy" className="checkbox-label">
                        Confermo che i dati inseriti sono corretti e accetto l'informativa sulla privacy per procedere con la valutazione.
                    </label>
                    {errors.privacy && <p className="error-message">{errors.privacy}</p>}
                </div>
            </CardStep>
        );
    }

    // STEP 6 - RISULTATO VALUTAZIONE
    if (currentStep === 6 && apiResponse) {
        return (
            <CardStep
                title="Valutazione Completata!"
                subtitle="Ecco la stima del tuo immobile"
                hideProgressBar={true}
                hideButtons={true}
                onPrev={() => { }}
                onNext={() => { }}
            >
                <div className="success-container">
                    <h3>Grazie, {formData.nome}!</h3>
                    <p className="success-subtitle">Abbiamo elaborato la tua richiesta con successo.</p>

                    <div className="valuation-box">
                        <div className="valuation-main">
                            <p className="valuation-label">Range di valutazione stimato</p>

                            {/* Visualizzazione Range Minimo - Massimo */}
                            <div className="valuation-price">
                                € {apiResponse.valoreMinimo?.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}
                                <span style={{ fontSize: '0.6em', color: '#666', margin: '0 10px' }}> - </span>
                                € {apiResponse.valoreMassimo?.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}
                            </div>

                            {/* Visualizzazione Prezzo Medio */}
                            <p className="valuation-description">
                                Il valore medio calcolato è di circa <span className="price-highlight">€ {apiResponse.valoreMedio?.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}</span>
                            </p>
                        </div>

                        <div className="property-summary">
                            <h4>Riepilogo Proprietà</h4>
                            <div className="summary-grid">
                                <div className="summary-item">
                                    <span className="summary-label">Tipologia</span>
                                    <span className="summary-value">{formData.tipologia === 'APPARTAMENTO' ? 'Appartamento' : 'Casa Indipendente'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Composizione</span>
                                    <span className="summary-value">{formData.numeroLocali} locali, {formData.numeroBagni} bagni</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Stato</span>
                                    <span className="summary-value">{formData.statoImmobile.replace(/_/g, ' ')}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Superficie</span>
                                    <span className="summary-value">{formData.superficie} m²</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Zona</span>
                                    <span className="summary-value">{formData.citta} ({formData.cap})</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Classe Energetica</span>
                                    <span className="summary-value">{formData.classeEnergetica}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={() => navigate('/')}
                            className="btn-primary"
                        >
                            Torna alla Home
                        </button>

                        <button
                            onClick={handleReset}
                            className="btn-secondary"
                        >
                            Nuova Valutazione
                        </button>
                    </div>
                </div>
            </CardStep>
        );
    }

    return null;
};

export default StepForm;