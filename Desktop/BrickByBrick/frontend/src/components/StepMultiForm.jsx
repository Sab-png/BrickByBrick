/**
 * COMPONENTE PRINCIPALE: StepForm
 * 
 * Questo è un modulo a più step (5 step) che permette agli utenti di compilare
 * un modulo di ricerca immobili in modo progressivo. Ogni step viene completato
 * prima di passare al successivo, con validazione dei dati.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardStep from './CardStep';
import '../styles/components/_stepMulti.scss'

// Importa le tue immagini personalizzate
import homeIcon from '../../public/img/casa_indipendente.svg';
import casa from '../../public/img/casa_indipendente.svg';
import appartamento from '../../public/img/Appartment.svg';
import rulerIcon from '../../public/img/Papa-V.jpg';
import dropletsIcon from '../../public/img/Papa-V.jpg';
import userIcon from '../../public/img/Papa-V.jpg';
import arrowLeftIcon from '../../public/img/Papa-V.jpg';
import arrowRightIcon from '../../public/img/Papa-V.jpg';
import homeOptionIcon from '../../public/img/Papa-V.jpg';

/**
 * INIZIALIZZAZIONE DEL COMPONENTE
 * 
 * Questa funzione è il cuore del modulo multi-step. Gestisce:
 * - Lo stato di quale step siamo (da 1 a 5)
 * - Gli errori di validazione per ogni campo
 * - Tutti i dati del modulo
 */
const StepForm = () => {
    const navigate = useNavigate();
    /**
     * STEP CORRENTE (1-5)
     * Rappresenta quale pagina del modulo l'utente sta compilando
     */
    const [currentStep, setCurrentStep] = useState(1);

    /**
     * ERRORI DI VALIDAZIONE
     * Oggetto che contiene gli errori per ogni campo del modulo.
     * Formato: { nomecampo: "messaggio di errore" }
     * Es: { email: "Email non valida", cap: "CAP deve essere di 5 cifre" }
     */
    const [errors, setErrors] = useState({});

    /**
     * DATI DEL MODULO
     * Contiene tutti i dati inseriti dall'utente attraverso i 5 step:
     * 
     * Step 1 - Localizzazione:
     * - indirizzo: via/numero civico
     * - citta: città
     * - provincia: sigla provincia (es: MI)
     * - cap: codice postale (5 cifre)
     * 
     * Step 2 - Dettagli immobile:
     * - tipologia: tipo di casa (Appartamento, Casa indipendente)
     * - numeroLocali: numero di stanze (1-6+)
     * 
     * Step 3 - Condizioni e dimensioni:
     * - superficie: metratura in m²
     * - superficieTerreno: terreno in m²
     * - statoImmobile: (Nuovo, Ristrutturato, Da ristrutturare)
     * 
     * Step 4 - Dotazioni:
     * - dotazioniEsterne: array di dotazioni selezionate (es: ["Giardino", "Piscina"])
     * 
     * Step 5 - Dati personali:
     * - nome: nome dell'utente
     * - cognome: cognome dell'utente
     * - email: email per contatti
     * - telefono: numero di telefono
     * - privacy: checkbox accettazione privacy (true/false)
     */
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
        dotazioniEsterne: [],
        nome: '',
        cognome: '',
        email: '',
        numeroBagni: '',
        telefono: '',
        privacy: false
    });

    // Flag per tracciare se il caricamento da localStorage è stato completato
    const [isHydrated, setIsHydrated] = useState(false);

    // Totale di step del modulo
    const totalSteps = 5;

    // Chiave usata per salvare i dati nel localStorage
    const STORAGE_KEY = 'stepMultiForm.saved';

    // Carica i dati salvati (se presenti) al montaggio del componente
    // Questo useEffect corre PRIMA del salvataggio, per evitare di sovrascrivere i dati
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.formData) {
                    setFormData(parsed.formData);
                }
                if (parsed.currentStep) {
                    setCurrentStep(parsed.currentStep);
                }
            }
        } catch (e) {
            // Se parse fallisce, ignora e non caricare
            console.warn('Unable to load saved form data', e);
        }
        // Marca il completamento dell'idratazione per attivare il salvataggio
        setIsHydrated(true);
    }, []);

    // Salva i dati ad ogni cambiamento di formData o currentStep
    // Ma solo DOPO che l'idratazione iniziale è completata (isHydrated === true)
    useEffect(() => {
        if (!isHydrated) return; // Non salvare finché i dati non sono carichi da localStorage
        try {
            const payload = JSON.stringify({ formData, currentStep });
            localStorage.setItem(STORAGE_KEY, payload);
        } catch (e) {
            console.warn('Unable to save form data', e);
        }
    }, [formData, currentStep, isHydrated]);

    /**
     * Controlla se uno step è considerato "completato" (tutti i campi richiesti
     * di quello step sono stati compilati correttamente). Usato per abilitare
     * il click sui numeri degli step per tornare indietro.
     */
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
                    !!formData.statoImmobile
                );
            case 4:
                return Array.isArray(formData.dotazioniEsterne) && formData.dotazioniEsterne.length > 0;
            case 5:
                return (
                    formData.nome.trim() &&
                    formData.cognome.trim() &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                    formData.telefono.trim() &&
                    formData.privacy === true
                );
            default:
                return false;
        }
    };

    // Ritorna array di step, usato per abilitare click sui numeri
    // Abilita: step precedenti completati (backward), step futuri se step corrente è completato (forward)
    const getClickableSteps = () => {
        const clickable = [];

        // Aggiungi tutti gli step precedenti (sempre cliccabili per tornare indietro)
        for (let i = 1; i < currentStep; i++) {
            clickable.push(i);
        }

        // Se lo step corrente è completato, permetti di saltare agli step futuri
        if (isStepCompleted(currentStep)) {
            for (let i = currentStep + 1; i <= totalSteps; i++) {
                clickable.push(i);
            }
        }

        return clickable;
    };



    /**
     * FUNZIONE DI VALIDAZIONE PER OGNI STEP
     * 
     * Questa funzione controlla che i dati inseriti nello step corrente siano validi.
     * Se ci sono errori, li salva nell'oggetto 'newErrors'.
     * Ritorna true se tutto è valido, false se ci sono errori.
     * 
     * Il controllo è diverso per ogni step:
     */
    // Funzione di validazione per ogni step
    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            /**
             * STEP 1: Localizzazione immobile
             * Valida che l'utente abbia compilato: indirizzo, città, provincia, CAP
             * Il CAP deve essere esattamente 5 cifre (regex: ^\d{5}$)
             */
            case 1: // Dove si trova l'immobile
                if (!formData.indirizzo.trim()) {
                    newErrors.indirizzo = 'Indirizzo obbligatorio';
                } else if (!/^[a-zA-Z0-9\s,.'-]{3,}$/i.test(formData.indirizzo)) {
                    newErrors.indirizzo = 'Indirizzo non valido';
                }

                if (!formData.citta.trim()) {
                    newErrors.citta = 'Città obbligatoria';
                } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.citta)) {
                    newErrors.citta = 'Città non valida';
                }

                if (!formData.provincia.trim()) {
                    newErrors.provincia = 'Provincia obbligatoria';
                } else if (!/^[A-Z]{2}$/i.test(formData.provincia)) {
                    newErrors.provincia = 'Provincia deve essere 2 lettere';
                }

                if (!formData.cap.trim()) {
                    newErrors.cap = 'CAP obbligatorio';
                } else if (!/^\d{5}$/.test(formData.cap)) {
                    newErrors.cap = 'CAP deve essere di 5 cifre';
                }

                break;

            /**
             * STEP 2: Dettagli dell'immobile
             * Valida che l'utente abbia scelto una tipologia e un numero di locali
             */
            case 2:
                if (!formData.tipologia) {
                    newErrors.tipologia = 'Seleziona una tipologia';
                }
                if (!formData.numeroLocali) {
                    newErrors.numeroLocali = 'Inserisci il numero di locali';
                }
                if (!formData.numeroBagni) {
                    newErrors.numeroBagni = 'Inserisci il numero di bagni';
                }
                break;

            /**
             * STEP 3: Condizioni e dimensioni
             * Valida che:
             * - La superficie sia > 0 (deve avere un valore numerico positivo)
             * - La superficie terreno sia >= 0
             * - Sia selezionato uno stato dell'immobile
             */
            case 3: // Condizioni e dimensioni
                if (!formData.superficie) {
                    newErrors.superficie = 'Superficie obbligatoria';
                } else if (formData.superficie <= 0) {
                    newErrors.superficie = 'Superficie deve essere maggiore di 0';
                }
                if (!formData.pianoAbitazione) {
                    newErrors.pianoAbitazione = 'Superficie terreno obbligatoria';
                } else if (formData.pianoAbitazione < 0) {
                    newErrors.pianoAbitazione = 'Superficie terreno non valida';
                }
                if (!formData.statoImmobile) {
                    newErrors.statoImmobile = 'Seleziona lo stato dell\'immobile';
                }
                break;

            /**
             * STEP 4: Dotazioni esterne
             * Valida che l'utente abbia selezionato ALMENO UNA dotazione
             * (minimo 1 elemento nell'array)
             */
            case 4: // Dotazioni esterne
                if (formData.dotazioniEsterne.length === 0) {
                    newErrors.dotazioniEsterne = 'Seleziona almeno una dotazione';
                }
                break;

            /**
             * STEP 5: Dati personali
             * Valida che siano compilati: nome, cognome, email valida, telefono
             * Valida che la checkbox privacy sia stata accettata (true)
             * 
             * Email: usa una regex che controlla formato base (xxxxx@xxxxx.xxx)
             * Regex spiegata: ^[^\s@]+@[^\s@]+\.[^\s@]+$
             * - ^[^\s@]+ = almeno un carattere che non sia spazio o @
             * - @ = il simbolo @
             * - [^\s@]+ = almeno un carattere che non sia spazio o @
             * - \. = un punto letterale
             * - [^\s@]+$ = almeno un carattere che non sia spazio o @ fino alla fine
             */
            case 5: // Dati personali
                if (!formData.nome.trim()) {
                    newErrors.nome = 'Nome obbligatorio';
                } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.nome)) {
                    newErrors.nome = 'Nome non valido';
                }

                if (!formData.cognome.trim()) {
                    newErrors.cognome = 'Cognome obbligatorio';
                } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.cognome)) {
                    newErrors.cognome = 'Cognome non valido';
                }

                if (!formData.email.trim()) {
                    newErrors.email = 'Email obbligatoria';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = 'Email non valida';
                }

                if (!formData.telefono.trim()) {
                    newErrors.telefono = 'Telefono obbligatorio';
                } else if (!/^\+?[\d\s\-()]{6,15}$/.test(formData.telefono)) {
                    newErrors.telefono = 'Telefono non valido';
                }

                if (!formData.privacy) {
                    newErrors.privacy = 'Devi accettare la privacy policy';
                }

                break;

            default:
                break;
        }

        // Salva gli errori nello state
        setErrors(newErrors);
        // Ritorna true se non ci sono errori (lunghezza dell'oggetto errori è 0)
        return Object.keys(newErrors).length === 0;
    };

    /**
     * FUNZIONE: updateFormData
     * 
     * Aggiorna un singolo campo del modulo.
     * 
     * Come funziona:
     * 1. Prende il campo (field) e il nuovo valore (value)
     * 2. Crea un nuovo oggetto formData che mantiene tutti i dati precedenti (...prev)
     * 3. Sostituisce il valore del campo specifico con il nuovo valore
     * 
     * Esempio: updateFormData('email', 'mario@example.com')
     * -> Mantiene tutti gli altri dati e aggiorna solo email
     */
    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /**
     * FUNZIONE: toggleArrayValue
     * 
     * Aggiunge o toglie un valore da un array (es: dotazioni).
     * Usato specificamente per Step 4 (Dotazioni esterne) dove si possono
     * scegliere MULTIPLE opzioni.
     * 
     * Come funziona:
     * 1. Controlla se il valore esiste già nell'array con .includes()
     * 2. Se esiste: lo rimuove con .filter() (toglie)
     * 3. Se non esiste: lo aggiunge con [...prev[field], value] (aggiunge)
     * 
     * Esempio: Se dotazioniEsterne = ["Giardino"]
     * - toggleArrayValue('dotazioniEsterne', 'Piscina') 
     *   -> diventa ["Giardino", "Piscina"]
     * - toggleArrayValue('dotazioniEsterne', 'Giardino')
     *   -> diventa [] (rimuove Giardino)
     */
    const toggleArrayValue = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    /**
     * FUNZIONE: nextStep
     * 
     * Avanza al prossimo step del modulo.
     * 
     * Flusso logico:
     * 1. Valida lo step corrente (chiamando validateStep)
     * 2. Se la validazione PASSA:
     *    - Se non siamo all'ultimo step: incrementa currentStep di 1
     *    - Pulisce gli errori (setErrors({}))
     * 3. Se la validazione FALLISCE:
     *    - Rimane sullo stesso step
     *    - Mostra gli errori di validazione all'utente
     * 
     * Questo impedisce all'utente di procedere con dati errati.
     */
    const nextStep = () => {
        // IMPORTANTE: Valida lo step corrente prima di procedere
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
                setErrors({}); // Pulisci gli errori quando vai avanti
            }
        }
        // Se la validazione fallisce, NON fa nulla (rimane sullo stesso step)
    };

    /**
     * FUNZIONE: handleJumpToStep
     * 
     * Permette di saltare a uno step specifico.
     * 
     * Se va INDIETRO: sempre permesso
     * Se va AVANTI: valida lo step corrente E tutti gli step intermedi
     *   Se uno step intermedio diventa non valido (es: dati rimossi), blocca il salto
     */
    const handleJumpToStep = (targetStep) => {
        // Se torna indietro, permetti sempre
        if (targetStep < currentStep) {
            setCurrentStep(targetStep);
            setErrors({});
            return;
        }

        // Se va avanti, valida lo step corrente e TUTTI gli step intermedi
        if (targetStep > currentStep) {
            // Valida lo step corrente
            if (!validateStep(currentStep)) {
                return; // Blocca il salto se lo step corrente non è valido
            }

            // Valida tutti gli step intermedi dal primo al target
            for (let i = 1; i < targetStep; i++) {
                if (!isStepCompleted(i)) {
                    // Se uno step intermedio è incompleto, blocca il salto
                    return;
                }
            }

            // Tutti gli step sono validi, permetti il salto
            setCurrentStep(targetStep);
            setErrors({});
            return;
        }

        // Se clicca sul passo corrente, non fare nulla
    };

    /**
     * FUNZIONE: prevStepWithHomeRedirect
     * 
     * Torna indietro. Se siamo allo step 1, rimanda alla homepage.
     * Altrimenti torna al step precedente.
     */
    const prevStepWithHomeRedirect = () => {
        console.log('prevStepWithHomeRedirect called, currentStep:', currentStep);
        if (currentStep === 1) {
            console.log('Navigating to home...');
            // Rimanda alla homepage
            navigate('/');
        } else {
            prevStep();
        }
    };

    /**
     * FUNZIONE: prevStep
     * 
     * Torna al passo precedente senza validazione.
     * Consente all'utente di tornare indietro per modificare i dati.
     * Non valida nulla (l'utente può tornare indietro anche con errori).
     */
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    /**
     * FUNZIONE: handleSubmit
     * 
     * Esegue l'azione finale quando l'utente completa il modulo.
     * Attualmente:
     * 1. Stampa i dati nel console (per debug)
     * 2. Mostra un alert di conferma all'utente
     * 
     * TODO: Qui dovrebbe essere implementata l'API call per inviare
     * i dati al backend (POST request)
     */
    // Quando l'utente clicca "Invia" dall'ultimo step, prima valida lo step 5.
    // Se la validazione passa, procede con l'invio; altrimenti imposta gli errori
    // e rimane nello stesso step (l'UI mostrerà i messaggi sotto i campi).
    const handleSubmit = () => {
        const valid = validateStep(5);
        if (!valid) {
            // Se non valido, non inviare — validateStep ha già aggiornato lo stato `errors`
            return;
        }

        // Qui puoi inserire la chiamata API reale. Per ora loggo e mostro un alert.
        console.log('Form Data:', formData);

        // Resetta il form dopo l'invio
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
            dotazioniEsterne: [],
            nome: '',
            cognome: '',
            email: '',
            numeroBagni: '',
            telefono: '',
            privacy: false
        });
        setCurrentStep(1);
        setErrors({});

        // Rimuovi i dati salvati — l'utente ha inviato il form
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
        alert('Ricerca immobile inviata! Controlla la console per i dati.');
    };

    /**
     * RENDERING CONDIZIONALE: STEP 1 - LOCALIZZAZIONE
     * 
     * Solo se currentStep === 1, mostra il primo passo del modulo.
     * 
     * Cosa chiede all'utente:
     * - Indirizzo (via e numero civico)
     * - Città
     * - Provincia (es: MI, TO, NA...)
     * - CAP (deve essere 5 cifre)
     * 
     * Componente CardStep:
     * - Mostra il titolo e sottotitolo
     * - Mostra i pulsanti "Indietro" e "Avanti"
     * - Mostra il progresso (1/5)
     * - Passa i dati e le callback (onNext, onPrev)
     * 
     * Input fields:
     * - Aggiornano formData quando l'utente scrive (onChange)
     * - Mostrano gli errori sotto il campo (se ci sono nella validazione)
     */
    // Step 1: Dove si trova l'immobile
    if (currentStep === 1) {
        return (
            <CardStep
                title="Dove si trova l'immobile?"
                subtitle="Inserisci la posizione dell'immobile che stai cercando"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStepWithHomeRedirect}
                onSubmit={handleSubmit}
                isLastStep={false}
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {/* Grid di form con 4 campi di input */}
                <div className="form-grid">
                    {/* Campo Indirizzo */}
                    <div className="form-field">
                        <label className="form-label">Indirizzo</label>
                        <input
                            type="text"
                            value={formData.indirizzo}
                            onChange={(e) => updateFormData('indirizzo', e.target.value)}
                            className="form-input"
                            placeholder="Via Roma, 123"
                        />
                        {errors.indirizzo && <p className="error-message">{errors.indirizzo}</p>}
                    </div>
                    {/* Campo Città */}
                    <div className="form-field">
                        <label className="form-label">Città</label>
                        <input
                            type="text"
                            value={formData.citta}
                            onChange={(e) => updateFormData('citta', e.target.value)}
                            className="form-input"
                            placeholder="Milano"
                        />
                        {errors.citta && <p className="error-message">{errors.citta}</p>}
                    </div>
                    {/* Campo Provincia */}
                    <div className="form-field">
                        <label className="form-label">Provincia</label>
                        <input
                            type="text"
                            value={formData.provincia}
                            onChange={(e) => updateFormData('provincia', e.target.value)}
                            className="form-input"
                            placeholder="MI"
                        />
                        {errors.provincia && <p className="error-message">{errors.provincia}</p>}
                    </div>
                    {/* Campo CAP */}
                    <div className="form-field">
                        <label className="form-label">CAP</label>
                        <input
                            type="text"
                            value={formData.cap}
                            onChange={(e) => updateFormData('cap', e.target.value)}
                            className="form-input"
                            placeholder="20100"
                        />
                        {errors.cap && <p className="error-message">{errors.cap}</p>}
                    </div>
                </div>
            </CardStep>
        );
    }

    /**
     * RENDERING CONDIZIONALE: STEP 2 - DETTAGLI DELL'IMMOBILE
     * 
     * Solo se currentStep === 2, mostra il secondo passo.
     * 
     * Cosa chiede all'utente:
     * - Tipologia: sceglie tra "Appartamento" o "Casa indipendente"
     * - Numero di locali: sceglie tra 1, 2, 3, 4, 5, 6+
     * 
     * UI Pattern:
     * - Usa button selezionabili (diventa highlighted quando selezionato)
     * - Le scelte si memorizzano in formData
     * - Quando clicca un option, updateFormData aggiorna il valore
     * 
     * className management:
     * - 'selected' è aggiunto solo se il valore corrisponde a formData
     * - CSS poi evidenzia i button con classe 'selected'
     */
    // Step 2: Dettagli dell'immobile
    // Mappa tipologia → immagine
    const tipologiaImages = {
        'Appartamento': appartamento,
        'Casa indipendente': casa
    };
    // Step 2: Dettagli dell'immobile
    if (currentStep === 2) {
        return (
            <CardStep
                title="Dettagli dell'immobile"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={false}
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {/* SEZIONE 1: Selezione Tipologia */}
                <div className="form-section">
                    <label className="section-label">Tipologia</label>

                    {/* Mostra messaggio errore se presente */}
                    {errors.tipologia && <p className="error-message">{errors.tipologia}</p>}

                    <div className="options-grid tipologia-grid">
                        {['Appartamento', 'Casa indipendente'].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => updateFormData('tipologia', tipo)}
                                className={`option-card ${formData.tipologia === tipo ? 'selected' : ''}`}
                            >
                                <img
                                    src={tipologiaImages[tipo]}
                                    alt={tipo}
                                    className="option-icon"
                                />
                                <p className="option-text">{tipo}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEZIONE 2: Input per Locali e Bagni */}
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Quanti locali?</label>
                        <input
                            type="number"
                            value={formData.numeroLocali}
                            onChange={(e) => updateFormData('numeroLocali', e.target.value)}
                            className="form-input"
                            placeholder="Es. 3"
                            min="1"
                        />
                        {errors.numeroLocali && <p className="error-message">{errors.numeroLocali}</p>}
                    </div>

                    <div className="form-field">
                        <label className="form-label">Quanti bagni?</label>
                        <input
                            type="number"
                            value={formData.numeroBagni}
                            onChange={(e) => updateFormData('numeroBagni', e.target.value)}
                            className="form-input"
                            placeholder="Es. 2"
                            min="1"
                        />
                        {errors.numeroBagni && <p className="error-message">{errors.numeroBagni}</p>}
                    </div>
                </div>
            </CardStep>
        );
    }

    /**
     * RENDERING CONDIZIONALE: STEP 3 - CONDIZIONI E DIMENSIONI
     * 
     * Solo se currentStep === 3, mostra il terzo passo.
     * 
     * Cosa chiede all'utente:
     * - Superficie: inserisce un numero (metri quadri)
     * - Superficie terreno: inserisce un numero (metri quadri)
     * - Stato dell'immobile: sceglie tra "Nuovo", "Ristrutturato", "Da ristrutturare"
     * 
     * Mix di input types:
     * - Tipo "number" per le superfici (accetta solo numeri)
     * - Button selezionabili per lo stato
     */
    // Step 3: Condizioni e dimensioni
    if (currentStep === 3) {
        return (
            <CardStep
                title="Condizioni e dimensioni"
                subtitle="In che condizione è ?"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={false}
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {/* SEZIONE 1: Campi numerici (Superficie) */}

                <div className="form-grid">
                    {/* Campo Superficie in m² */}
                    <div className="form-field">
                        <label className="form-label">Superficie (m²)</label>
                        <input
                            type="number"
                            value={formData.superficie}
                            onChange={(e) => updateFormData('superficie', e.target.value)}
                            className="form-input"
                            placeholder="inserisci la superficie"
                            min ="1"
                        />
                        {errors.superficie && <p className="error-message">{errors.superficie}</p>}
                    </div>
                    {/* Campo Superficie Terreno in m² */}
                    <div className="form-field">
                        <label className="form-label">Piano</label>
                        <input
                            type="number"
                            value={formData.pianoAbitazione}
                            onChange={(e) => updateFormData('pianoAbitazione', e.target.value)}
                            className="form-input"
                            placeholder="inserisci il piano"
                            min = "1"
                        />
                        {errors.pianoAbitazione && <p className="error-message">{errors.pianoAbitazione}</p>}
                    </div>
                </div>

                {/* SEZIONE 2: Selezione dello Stato dell'Immobile */}
                <div className="form-section">
                    <label className="section-label">Stato dell'immobile</label>
                    {/* Crea 3 button per le diverse condizioni dell'immobile */}
                    <div className="options-grid stato-grid">
                        {['Nuovo', 'Ristrutturato', 'Da ristrutturare'].map((stato) => (
                            <button
                                key={stato}
                                onClick={() => updateFormData('statoImmobile', stato)}
                                // Aggiunge classe 'selected' se questo stato è selezionato
                                // Nota: 'simple' è una classe di stile aggiuntiva
                                className={`option-card simple ${formData.statoImmobile === stato ? 'selected' : ''}`}
                            >
                                <p className="option-text">{stato}</p>
                            </button>
                        ))}
                    </div>
                    {errors.statoImmobile && <p className="error-message">{errors.statoImmobile}</p>}
                </div>
            </CardStep>
        );
    }

    /**
     * RENDERING CONDIZIONALE: STEP 4 - DOTAZIONI ESTERNE
     * 
     * Solo se currentStep === 4, mostra il quarto passo.
     * 
     * Cosa chiede all'utente:
     * - Seleziona MULTIPLE dotazioni (Giardino, Piscina, Garage, Terrazzo, Balcone, Cantina)
     * - Può scegliere nessuna, una sola, o tutte
     * 
     * Differenza rispetto agli step precedenti:
     * - Usa toggleArrayValue() invece di updateFormData()
     * - dotazioniEsterne è un ARRAY, non una stringa singola
     * - Quando clicca uno stesso button due volte, toglie la selezione
     * - Mostra classe 'selected' se il valore è incluso nell'array
     */
    // Step 4: Dotazioni esterne
    if (currentStep === 4) {
        return (
            <CardStep
                iconAlt="Dotazioni"
                title="Dotazioni esterne"
                subtitle="Seleziona le dotazioni che desideri (selezione multipla)"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={false}
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {/* Griglia di opzioni selezionabili multiple */}

                <div className="options-grid dotazioni-grid">
                    {['Giardino', 'Piscina', 'Garage', 'Terrazzo', 'Balcone', 'Cantina'].map((dotazione) => (
                        <button
                            key={dotazione}
                            onClick={() => toggleArrayValue('dotazioniEsterne', dotazione)}
                            // Controlla se la dotazione è già selezionata nell'array
                            // Se sì, aggiunge classe 'selected'
                            className={`option-card ${formData.dotazioniEsterne.includes(dotazione) ? 'selected' : ''}`}
                        >
                            <img src={homeOptionIcon} alt={dotazione} className="option-icon" />
                            <p className="option-text">{dotazione}</p>
                        </button>
                    ))}
                </div>
                {errors.dotazioniEsterne && <p className="error-message">{errors.dotazioniEsterne}</p>}
            </CardStep>
        );
    }

    /**
     * RENDERING CONDIZIONALE: STEP 5 - DATI PERSONALI (ULTIMO STEP)
     * 
     * Solo se currentStep === 5, mostra il quinto e ultimo passo.
     * 
     * Cosa chiede all'utente:
     * - Nome: input testo
     * - Cognome: input testo
     * - Email: input email (validata con regex)
     * - Telefono: input telefono
     * - Privacy: checkbox che deve essere spuntato
     * 
     * Differenze rispetto agli altri step:
     * - isLastStep={true}: il componente CardStep mostrerà il bottone "Invia" invece di "Avanti"
     * - Include una checkbox per accettare la privacy policy (OBBLIGATORIA)
     * - Tipo input diversi: text, email, tel
     * 
     * Quando l'utente clicca "Invia":
     * 1. validateStep(5) controlla tutti i campi
     * 2. Se tutto OK, chiama handleSubmit()
     * 3. handleSubmit() stampa i dati e mostra un alert
     */
    // Step 5: Dati personali
    if (currentStep === 5) {
        return (
            <CardStep
                iconSrc={userIcon}
                iconAlt="Utente"
                title="Dati personali"
                subtitle="Inserisci i tuoi dati per ricevere i risultati"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={nextStep}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={true}  /* Questo è l'ultimo step */
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {/* Griglia di form con 4 campi di input testuali */}
                <div className="form-grid">
                    {/* Campo Nome */}
                    <div className="form-field">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => updateFormData('nome', e.target.value)}
                            className="form-input"
                            placeholder="Mario"
                        />
                        {errors.nome && <p className="error-message">{errors.nome}</p>}
                    </div>
                    {/* Campo Cognome */}
                    <div className="form-field">
                        <label className="form-label">Cognome</label>
                        <input
                            type="text"
                            value={formData.cognome}
                            onChange={(e) => updateFormData('cognome', e.target.value)}
                            className="form-input"
                            placeholder="Rossi"
                        />
                        {errors.cognome && <p className="error-message">{errors.cognome}</p>}
                    </div>
                    {/* Campo Email */}
                    <div className="form-field">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="form-input"
                            placeholder="mario.rossi@example.com"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    {/* Campo Telefono */}
                    <div className="form-field">
                        <label className="form-label">Telefono</label>
                        <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => updateFormData('telefono', e.target.value)}
                            className="form-input"
                            placeholder="+39 123 456 7890"
                        />
                        {errors.telefono && <p className="error-message">{errors.telefono}</p>}
                    </div>
                </div>

                {/* CHECKBOX PRIVACY - OBBLIGATORIA */}
                <div className="privacy-checkbox">
                    {/* Checkbox per accettare la privacy */}
                    <input
                        type="checkbox"
                        id="privacy"
                        checked={formData.privacy}
                        onChange={(e) => updateFormData('privacy', e.target.checked)}
                        className="checkbox-input"
                    />
                    {/* Label e testo della privacy policy */}
                    <label htmlFor="privacy" className="checkbox-label">
                        Accetto i termini e le condizioni e l'informativa sulla privacy. Autorizzo il trattamento dei miei dati personali secondo il GDPR.
                    </label>
                    {errors.privacy && <p className="error-message">{errors.privacy}</p>}
                </div>
            </CardStep>
        );
    }

    /**
     * FALLBACK: Se per qualche motivo currentStep non corrisponde a nessuno
     * dei 5 step, ritorna null (non mostra nulla)
     * 
     * Questo di solito non dovrebbe mai accadere se la logica è corretta.
     */
    return null;
};

export default StepForm;
