// /**
//  * COMPONENTE PRINCIPALE: StepForm
//  * 
//  * Questo è un modulo a più step (5 step) che permette agli utenti di compilare
//  * un modulo di ricerca immobili in modo progressivo. Ogni step viene completato
//  * prima di passare al successivo, con validazione dei dati.
//  */

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CardStep from './CardStep';
// import '../styles/components/_stepMulti.scss'

// // Importa le tue immagini personalizzate
// import homeIcon from '../../public/img/casa_indipendente.svg';
// import casa from '../../public/img/casa_indipendente.svg';
// import appartamento from '../../public/img/Appartment.svg';
// import rulerIcon from '../../public/img/coins.svg';
// import dropletsIcon from '../../public/img/coins.svg';
// import userIcon from '../../public/img/coins.svg';
// import arrowLeftIcon from '../../public/img/coins.svg';
// import arrowRightIcon from '../../public/img/coins.svg';
// import homeOptionIcon from '../../public/img/coins.svg';

// /**
//  * INIZIALIZZAZIONE DEL COMPONENTE
//  * 
//  * Questa funzione è il cuore del modulo multi-step. Gestisce:
//  * - Lo stato di quale step siamo (da 1 a 5)
//  * - Gli errori di validazione per ogni campo
//  * - Tutti i dati del modulo
//  */
// const StepForm = () => {
//     const navigate = useNavigate();
//     /**
//      * STEP CORRENTE (1-5)
//      * Rappresenta quale pagina del modulo l'utente sta compilando
//      */
//     const [currentStep, setCurrentStep] = useState(1);

//     /**
//      * ERRORI DI VALIDAZIONE
//      * Oggetto che contiene gli errori per ogni campo del modulo.
//      * Formato: { nomecampo: "messaggio di errore" }
//      * Es: { email: "Email non valida", cap: "CAP deve essere di 5 cifre" }
//      */
//     const [errors, setErrors] = useState({});

//     /**
//      * DATI DEL MODULO
//      * Contiene tutti i dati inseriti dall'utente attraverso i 5 step:
//      * 
//      * Step 1 - Localizzazione:
//      * - indirizzo: via/numero civico
//      * - citta: città
//      * - provincia: sigla provincia (es: MI)
//      * - cap: codice postale (5 cifre)
//      * 
//      * Step 2 - Dettagli immobile:
//      * - tipologia: tipo di casa (Appartamento, Casa indipendente)
//      * - numeroLocali: numero di stanze (1-6+)
//      * 
//      * Step 3 - Condizioni e dimensioni:
//      * - superficie: metratura in m²
//      * - superficieTerreno: terreno in m²
//      * - statoImmobile: (Nuovo, Ristrutturato, Da ristrutturare)
//      * 
//      * Step 4 - Dotazioni:
//      * - dotazioniEsterne: array di dotazioni selezionate (es: ["Giardino", "Piscina"])
//      * 
//      * Step 5 - Dati personali:
//      * - nome: nome dell'utente
//      * - cognome: cognome dell'utente
//      * - email: email per contatti
//      * - telefono: numero di telefono
//      * - privacy: checkbox accettazione privacy (true/false)
//      */
//     const [formData, setFormData] = useState({
//         indirizzo: '',
//         citta: '',
//         provincia: '',
//         cap: '',
//         tipologia: '',
//         numeroLocali: '',
//         superficie: '',
//         pianoAbitazione: '',
//         statoImmobile: '',
//         dotazioniEsterne: [],
//         nome: '',
//         cognome: '',
//         email: '',
//         numeroBagni: '',
//         telefono: '',
//         privacy: false
//     });

//     // Flag per tracciare se il caricamento da localStorage è stato completato
//     const [isHydrated, setIsHydrated] = useState(false);

//     // Totale di step del modulo
//     const totalSteps = 5;

//     // Chiave usata per salvare i dati nel localStorage
//     const STORAGE_KEY = 'stepMultiForm.saved';

//     // Carica i dati salvati (se presenti) al montaggio del componente
//     // Questo useEffect corre PRIMA del salvataggio, per evitare di sovrascrivere i dati
//     useEffect(() => {
//         try {
//             const raw = localStorage.getItem(STORAGE_KEY);

//             if (raw) {
//                 const parsed = JSON.parse(raw);
//                 if (parsed.formData) {
//                     setFormData(parsed.formData);
//                 }
//                 if (parsed.currentStep) {
//                     setCurrentStep(parsed.currentStep);
//                 }
//             }
//         } catch (e) {
//             // Se parse fallisce, ignora e non caricare
//             console.warn('Unable to load saved form data', e);
//         }
//         // Marca il completamento dell'idratazione per attivare il salvataggio
//         setIsHydrated(true);
//     }, []);

//     // Salva i dati ad ogni cambiamento di formData o currentStep
//     // Ma solo DOPO che l'idratazione iniziale è completata (isHydrated === true)
//     useEffect(() => {
//         if (!isHydrated) return; // Non salvare finché i dati non sono carichi da localStorage
//         try {
//             const payload = JSON.stringify({ formData, currentStep });
//             localStorage.setItem(STORAGE_KEY, payload);
//         } catch (e) {
//             console.warn('Unable to save form data', e);
//         }
//     }, [formData, currentStep, isHydrated]);

//     /**
//      * Controlla se uno step è considerato "completato" (tutti i campi richiesti
//      * di quello step sono stati compilati correttamente). Usato per abilitare
//      * il click sui numeri degli step per tornare indietro.
//      */
//     const isStepCompleted = (step) => {
//         switch (step) {
//             case 1:
//                 return (
//                     formData.indirizzo.trim() &&
//                     formData.citta.trim() &&
//                     formData.provincia.trim() &&
//                     /^\d{5}$/.test(formData.cap)
//                 );
//             case 2:
//                 return (
//                     formData.tipologia &&
//                     String(formData.numeroLocali).trim() !== '' && Number(formData.numeroLocali) > 0 &&
//                     String(formData.numeroBagni).trim() !== '' && Number(formData.numeroBagni) > 0
//                 );
//             case 3:
//                 return (
//                     String(formData.superficie).trim() !== '' && Number(formData.superficie) > 0 &&
//                     String(formData.pianoAbitazione).trim() !== '' && Number(formData.pianoAbitazione) >= 0 &&
//                     !!formData.statoImmobile
//                 );
//             case 4:
//                 return Array.isArray(formData.dotazioniEsterne) && formData.dotazioniEsterne.length > 0;
//             case 5:
//                 return (
//                     formData.nome.trim() &&
//                     formData.cognome.trim() &&
//                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
//                     formData.telefono.trim() &&
//                     formData.privacy === true
//                 );
//             default:
//                 return false;
//         }
//     };

//     // Ritorna array di step, usato per abilitare click sui numeri
//     // Abilita: step precedenti completati (backward), step futuri se step corrente è completato (forward)
//     const getClickableSteps = () => {
//         const clickable = [];

//         // Aggiungi tutti gli step precedenti (sempre cliccabili per tornare indietro)
//         for (let i = 1; i < currentStep; i++) {
//             clickable.push(i);
//         }

//         // Se lo step corrente è completato, permetti di saltare agli step futuri
//         if (isStepCompleted(currentStep)) {
//             for (let i = currentStep + 1; i <= totalSteps; i++) {
//                 clickable.push(i);
//             }
//         }

//         return clickable;
//     };



//     /**
//      * FUNZIONE DI VALIDAZIONE PER OGNI STEP
//      * 
//      * Questa funzione controlla che i dati inseriti nello step corrente siano validi.
//      * Se ci sono errori, li salva nell'oggetto 'newErrors'.
//      * Ritorna true se tutto è valido, false se ci sono errori.
//      * 
//      * Il controllo è diverso per ogni step:
//      */
//     // Funzione di validazione per ogni step
//     const validateStep = (step) => {
//         const newErrors = {};

//         switch (step) {
//             /**
//              * STEP 1: Localizzazione immobile
//              * Valida che l'utente abbia compilato: indirizzo, città, provincia, CAP
//              * Il CAP deve essere esattamente 5 cifre (regex: ^\d{5}$)
//              */
//             case 1: // Dove si trova l'immobile
//                 if (!formData.indirizzo.trim()) {
//                     newErrors.indirizzo = 'Indirizzo obbligatorio';
//                 } else if (!/^[a-zA-Z0-9\s,.'-]{3,}$/i.test(formData.indirizzo)) {
//                     newErrors.indirizzo = 'Indirizzo non valido';
//                 }

//                 if (!formData.citta.trim()) {
//                     newErrors.citta = 'Città obbligatoria';
//                 } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.citta)) {
//                     newErrors.citta = 'Città non valida';
//                 }

//                 if (!formData.provincia.trim()) {
//                     newErrors.provincia = 'Provincia obbligatoria';
//                 } else if (!/^[A-Z]{2}$/i.test(formData.provincia)) {
//                     newErrors.provincia = 'Provincia deve essere 2 lettere';
//                 }

//                 if (!formData.cap.trim()) {
//                     newErrors.cap = 'CAP obbligatorio';
//                 } else if (!/^\d{5}$/.test(formData.cap)) {
//                     newErrors.cap = 'CAP deve essere di 5 cifre';
//                 }

//                 break;

//             /**
//              * STEP 2: Dettagli dell'immobile
//              * Valida che l'utente abbia scelto una tipologia e un numero di locali
//              */
//             case 2:
//                 if (!formData.tipologia) {
//                     newErrors.tipologia = 'Seleziona una tipologia';
//                 }
//                 if (!formData.numeroLocali) {
//                     newErrors.numeroLocali = 'Inserisci il numero di locali';
//                 }
//                 if (!formData.numeroBagni) {
//                     newErrors.numeroBagni = 'Inserisci il numero di bagni';
//                 }
//                 break;

//             /**
//              * STEP 3: Condizioni e dimensioni
//              * Valida che:
//              * - La superficie sia > 0 (deve avere un valore numerico positivo)
//              * - La superficie terreno sia >= 0
//              * - Sia selezionato uno stato dell'immobile
//              */
//             case 3: // Condizioni e dimensioni
//                 if (!formData.superficie) {
//                     newErrors.superficie = 'Superficie obbligatoria';
//                 } else if (formData.superficie <= 0) {
//                     newErrors.superficie = 'Superficie deve essere maggiore di 0';
//                 }
//                 if (!formData.pianoAbitazione) {
//                     newErrors.pianoAbitazione = 'Superficie terreno obbligatoria';
//                 } else if (formData.pianoAbitazione < 0) {
//                     newErrors.pianoAbitazione = 'Superficie terreno non valida';
//                 }
//                 if (!formData.statoImmobile) {
//                     newErrors.statoImmobile = 'Seleziona lo stato dell\'immobile';
//                 }
//                 break;

//             /**
//              * STEP 4: Dotazioni esterne
//              * Valida che l'utente abbia selezionato ALMENO UNA dotazione
//              * (minimo 1 elemento nell'array)
//              */
//             case 4: // Dotazioni esterne
//                 if (formData.dotazioniEsterne.length === 0) {
//                     newErrors.dotazioniEsterne = 'Seleziona almeno una dotazione';
//                 }
//                 break;

//             /**
//              * STEP 5: Dati personali
//              * Valida che siano compilati: nome, cognome, email valida, telefono
//              * Valida che la checkbox privacy sia stata accettata (true)
//              * 
//              * Email: usa una regex che controlla formato base (xxxxx@xxxxx.xxx)
//              * Regex spiegata: ^[^\s@]+@[^\s@]+\.[^\s@]+$
//              * - ^[^\s@]+ = almeno un carattere che non sia spazio o @
//              * - @ = il simbolo @
//              * - [^\s@]+ = almeno un carattere che non sia spazio o @
//              * - \. = un punto letterale
//              * - [^\s@]+$ = almeno un carattere che non sia spazio o @ fino alla fine
//              */
//             case 5: // Dati personali
//                 if (!formData.nome.trim()) {
//                     newErrors.nome = 'Nome obbligatorio';
//                 } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.nome)) {
//                     newErrors.nome = 'Nome non valido';
//                 }

//                 if (!formData.cognome.trim()) {
//                     newErrors.cognome = 'Cognome obbligatorio';
//                 } else if (!/^[a-zA-ZÀ-ÿ\s'-]{2,}$/i.test(formData.cognome)) {
//                     newErrors.cognome = 'Cognome non valido';
//                 }

//                 if (!formData.email.trim()) {
//                     newErrors.email = 'Email obbligatoria';
//                 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//                     newErrors.email = 'Email non valida';
//                 }

//                 if (!formData.telefono.trim()) {
//                     newErrors.telefono = 'Telefono obbligatorio';
//                 } else if (!/^\+?[\d\s\-()]{6,15}$/.test(formData.telefono)) {
//                     newErrors.telefono = 'Telefono non valido';
//                 }

//                 if (!formData.privacy) {
//                     newErrors.privacy = 'Devi accettare la privacy policy';
//                 }

//                 break;

//             default:
//                 break;
//         }

//         // Salva gli errori nello state
//         setErrors(newErrors);
//         // Ritorna true se non ci sono errori (lunghezza dell'oggetto errori è 0)
//         return Object.keys(newErrors).length === 0;
//     };

//     /**
//      * FUNZIONE: updateFormData
//      * 
//      * Aggiorna un singolo campo del modulo.
//      * 
//      * Come funziona:
//      * 1. Prende il campo (field) e il nuovo valore (value)
//      * 2. Crea un nuovo oggetto formData che mantiene tutti i dati precedenti (...prev)
//      * 3. Sostituisce il valore del campo specifico con il nuovo valore
//      * 
//      * Esempio: updateFormData('email', 'mario@example.com')
//      * -> Mantiene tutti gli altri dati e aggiorna solo email
//      */
//     const updateFormData = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     /**
//      * FUNZIONE: toggleArrayValue
//      * 
//      * Aggiunge o toglie un valore da un array (es: dotazioni).
//      * Usato specificamente per Step 4 (Dotazioni esterne) dove si possono
//      * scegliere MULTIPLE opzioni.
//      * 
//      * Come funziona:
//      * 1. Controlla se il valore esiste già nell'array con .includes()
//      * 2. Se esiste: lo rimuove con .filter() (toglie)
//      * 3. Se non esiste: lo aggiunge con [...prev[field], value] (aggiunge)
//      * 
//      * Esempio: Se dotazioniEsterne = ["Giardino"]
//      * - toggleArrayValue('dotazioniEsterne', 'Piscina') 
//      *   -> diventa ["Giardino", "Piscina"]
//      * - toggleArrayValue('dotazioniEsterne', 'Giardino')
//      *   -> diventa [] (rimuove Giardino)
//      */
//     const toggleArrayValue = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: prev[field].includes(value)
//                 ? prev[field].filter(item => item !== value)
//                 : [...prev[field], value]
//         }));
//     };

//     /**
//      * FUNZIONE: nextStep
//      * 
//      * Avanza al prossimo step del modulo.
//      * 
//      * Flusso logico:
//      * 1. Valida lo step corrente (chiamando validateStep)
//      * 2. Se la validazione PASSA:
//      *    - Se non siamo all'ultimo step: incrementa currentStep di 1
//      *    - Pulisce gli errori (setErrors({}))
//      * 3. Se la validazione FALLISCE:
//      *    - Rimane sullo stesso step
//      *    - Mostra gli errori di validazione all'utente
//      * 
//      * Questo impedisce all'utente di procedere con dati errati.
//      */
//     const nextStep = () => {
//         // IMPORTANTE: Valida lo step corrente prima di procedere
//         if (validateStep(currentStep)) {
//             if (currentStep < totalSteps) {
//                 setCurrentStep(currentStep + 1);
//                 setErrors({}); // Pulisci gli errori quando vai avanti
//             }
//         }
//         // Se la validazione fallisce, NON fa nulla (rimane sullo stesso step)
//     };

//     /**
//      * FUNZIONE: handleJumpToStep
//      * 
//      * Permette di saltare a uno step specifico.
//      * 
//      * Se va INDIETRO: sempre permesso
//      * Se va AVANTI: valida lo step corrente E tutti gli step intermedi
//      *   Se uno step intermedio diventa non valido (es: dati rimossi), blocca il salto
//      */
//     const handleJumpToStep = (targetStep) => {
//         // Se torna indietro, permetti sempre
//         if (targetStep < currentStep) {
//             setCurrentStep(targetStep);
//             setErrors({});
//             return;
//         }

//         // Se va avanti, valida lo step corrente e TUTTI gli step intermedi
//         if (targetStep > currentStep) {
//             // Valida lo step corrente
//             if (!validateStep(currentStep)) {
//                 return; // Blocca il salto se lo step corrente non è valido
//             }

//             // Valida tutti gli step intermedi dal primo al target
//             for (let i = 1; i < targetStep; i++) {
//                 if (!isStepCompleted(i)) {
//                     // Se uno step intermedio è incompleto, blocca il salto
//                     return;
//                 }
//             }

//             // Tutti gli step sono validi, permetti il salto
//             setCurrentStep(targetStep);
//             setErrors({});
//             return;
//         }

//         // Se clicca sul passo corrente, non fare nulla
//     };

//     /**
//      * FUNZIONE: prevStepWithHomeRedirect
//      * 
//      * Torna indietro. Se siamo allo step 1, rimanda alla homepage.
//      * Altrimenti torna al step precedente.
//      */
//     const prevStepWithHomeRedirect = () => {
//         console.log('prevStepWithHomeRedirect called, currentStep:', currentStep);
//         if (currentStep === 1) {
//             console.log('Navigating to home...');
//             // Rimanda alla homepage
//             navigate('/');
//         } else {
//             prevStep();
//         }
//     };

//     /**
//      * FUNZIONE: prevStep
//      * 
//      * Torna al passo precedente senza validazione.
//      * Consente all'utente di tornare indietro per modificare i dati.
//      * Non valida nulla (l'utente può tornare indietro anche con errori).
//      */
//     const prevStep = () => {
//         if (currentStep > 1) {
//             setCurrentStep(currentStep - 1);
//         }
//     };

//     /**
//      * FUNZIONE: handleSubmit
//      * 
//      * Esegue l'azione finale quando l'utente completa il modulo.
//      * Attualmente:
//      * 1. Stampa i dati nel console (per debug)
//      * 2. Mostra un alert di conferma all'utente
//      * 
//      * TODO: Qui dovrebbe essere implementata l'API call per inviare
//      * i dati al backend (POST request)
//      */
//     // Quando l'utente clicca "Invia" dall'ultimo step, prima valida lo step 5.
//     // Se la validazione passa, procede con l'invio; altrimenti imposta gli errori
//     // e rimane nello stesso step (l'UI mostrerà i messaggi sotto i campi).
//     const handleSubmit = () => {
//         const valid = validateStep(5);
//         if (!valid) {
//             // Se non valido, non inviare — validateStep ha già aggiornato lo stato `errors`
//             return;
//         }

//         // Qui puoi inserire la chiamata API reale. Per ora loggo e mostro un alert.
//         console.log('Form Data:', formData);

//         // Resetta il form dopo l'invio
//         setFormData({
//             indirizzo: '',
//             citta: '',
//             provincia: '',
//             cap: '',
//             tipologia: '',
//             numeroLocali: '',
//             superficie: '',
//             pianoAbitazione: '',
//             statoImmobile: '',
//             dotazioniEsterne: [],
//             nome: '',
//             cognome: '',
//             email: '',
//             numeroBagni: '',
//             telefono: '',
//             privacy: false
//         });
//         setCurrentStep(1);
//         setErrors({});

//         // Rimuovi i dati salvati — l'utente ha inviato il form
//         try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
//         alert('Ricerca immobile inviata! Controlla la console per i dati.');
//     };

//     /**
//      * RENDERING CONDIZIONALE: STEP 1 - LOCALIZZAZIONE
//      * 
//      * Solo se currentStep === 1, mostra il primo passo del modulo.
//      * 
//      * Cosa chiede all'utente:
//      * - Indirizzo (via e numero civico)
//      * - Città
//      * - Provincia (es: MI, TO, NA...)
//      * - CAP (deve essere 5 cifre)
//      * 
//      * Componente CardStep:
//      * - Mostra il titolo e sottotitolo
//      * - Mostra i pulsanti "Indietro" e "Avanti"
//      * - Mostra il progresso (1/5)
//      * - Passa i dati e le callback (onNext, onPrev)
//      * 
//      * Input fields:
//      * - Aggiornano formData quando l'utente scrive (onChange)
//      * - Mostrano gli errori sotto il campo (se ci sono nella validazione)
//      */
//     // Step 1: Dove si trova l'immobile
//     if (currentStep === 1) {
//         return (
//             <CardStep
//                 title="Dove si trova l'immobile?"
//                 subtitle="Inserisci la posizione dell'immobile che stai cercando"
//                 currentStep={currentStep}
//                 totalSteps={totalSteps}
//                 clickableSteps={getClickableSteps()}
//                 onJumpToStep={handleJumpToStep}
//                 onNext={nextStep}
//                 onPrev={prevStepWithHomeRedirect}
//                 onSubmit={handleSubmit}
//                 isLastStep={false}
//                 prevIcon={arrowLeftIcon}
//                 nextIcon={arrowRightIcon}
//             >
//                 {/* Grid di form con 4 campi di input */}
//                 <div className="form-grid">
//                     {/* Campo Indirizzo */}
//                     <div className="form-field">
//                         <label className="form-label">Indirizzo</label>
//                         <input
//                             type="text"
//                             value={formData.indirizzo}
//                             onChange={(e) => updateFormData('indirizzo', e.target.value)}
//                             className="form-input"
//                             placeholder="Via Roma, 123"
//                         />
//                         {errors.indirizzo && <p className="error-message">{errors.indirizzo}</p>}
//                     </div>
//                     {/* Campo Città */}
//                     <div className="form-field">
//                         <label className="form-label">Città</label>
//                         <input
//                             type="text"
//                             value={formData.citta}
//                             onChange={(e) => updateFormData('citta', e.target.value)}
//                             className="form-input"
//                             placeholder="Milano"
//                         />
//                         {errors.citta && <p className="error-message">{errors.citta}</p>}
//                     </div>
//                     {/* Campo Provincia */}
//                     <div className="form-field">
//                         <label className="form-label">Provincia</label>
//                         <input
//                             type="text"
//                             value={formData.provincia}
//                             onChange={(e) => updateFormData('provincia', e.target.value)}
//                             className="form-input"
//                             placeholder="MI"
//                         />
//                         {errors.provincia && <p className="error-message">{errors.provincia}</p>}
//                     </div>
//                     {/* Campo CAP */}
//                     <div className="form-field">
//                         <label className="form-label">CAP</label>
//                         <input
//                             type="text"
//                             value={formData.cap}
//                             onChange={(e) => updateFormData('cap', e.target.value)}
//                             className="form-input"
//                             placeholder="20100"
//                         />
//                         {errors.cap && <p className="error-message">{errors.cap}</p>}
//                     </div>
//                 </div>
//             </CardStep>
//         );
//     }

//     /**
//      * RENDERING CONDIZIONALE: STEP 2 - DETTAGLI DELL'IMMOBILE
//      * 
//      * Solo se currentStep === 2, mostra il secondo passo.
//      * 
//      * Cosa chiede all'utente:
//      * - Tipologia: sceglie tra "Appartamento" o "Casa indipendente"
//      * - Numero di locali: sceglie tra 1, 2, 3, 4, 5, 6+
//      * 
//      * UI Pattern:
//      * - Usa button selezionabili (diventa highlighted quando selezionato)
//      * - Le scelte si memorizzano in formData
//      * - Quando clicca un option, updateFormData aggiorna il valore
//      * 
//      * className management:
//      * - 'selected' è aggiunto solo se il valore corrisponde a formData
//      * - CSS poi evidenzia i button con classe 'selected'
//      */
//     // Step 2: Dettagli dell'immobile
//     // Mappa tipologia → immagine
//     const tipologiaImages = {
//         'Appartamento': appartamento,
//         'Casa indipendente': casa
//     };
//     // Step 2: Dettagli dell'immobile
//     if (currentStep === 2) {
//         return (
//             <CardStep
//                 title="Dettagli dell'immobile"
//                 currentStep={currentStep}
//                 totalSteps={totalSteps}
//                 clickableSteps={getClickableSteps()}
//                 onJumpToStep={handleJumpToStep}
//                 onNext={nextStep}
//                 onPrev={prevStep}
//                 onSubmit={handleSubmit}
//                 isLastStep={false}
//                 prevIcon={arrowLeftIcon}
//                 nextIcon={arrowRightIcon}
//             >
//                 {/* SEZIONE 1: Selezione Tipologia */}
//                 <div className="form-section">
//                     <label className="section-label">Tipologia</label>

//                     {/* Mostra messaggio errore se presente */}
//                     {errors.tipologia && <p className="error-message">{errors.tipologia}</p>}

//                     <div className="options-grid tipologia-grid">
//                         {['Appartamento', 'Casa indipendente'].map((tipo) => (
//                             <button
//                                 key={tipo}
//                                 onClick={() => updateFormData('tipologia', tipo)}
//                                 className={`option-card ${formData.tipologia === tipo ? 'selected' : ''}`}
//                             >
//                                 <img
//                                     src={tipologiaImages[tipo]}
//                                     alt={tipo}
//                                     className="option-icon"
//                                 />
//                                 <p className="option-text">{tipo}</p>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* SEZIONE 2: Input per Locali e Bagni */}
//                 <div className="form-grid">
//                     <div className="form-field">
//                         <label className="form-label">Quanti locali?</label>
//                         <input
//                             type="number"
//                             value={formData.numeroLocali}
//                             onChange={(e) => updateFormData('numeroLocali', e.target.value)}
//                             className="form-input"
//                             placeholder="Es. 3"
//                             min="1"
//                         />
//                         {errors.numeroLocali && <p className="error-message">{errors.numeroLocali}</p>}
//                     </div>

//                     <div className="form-field">
//                         <label className="form-label">Quanti bagni?</label>
//                         <input
//                             type="number"
//                             value={formData.numeroBagni}
//                             onChange={(e) => updateFormData('numeroBagni', e.target.value)}
//                             className="form-input"
//                             placeholder="Es. 2"
//                             min="1"
//                         />
//                         {errors.numeroBagni && <p className="error-message">{errors.numeroBagni}</p>}
//                     </div>
//                 </div>
//             </CardStep>
//         );
//     }

//     /**
//      * RENDERING CONDIZIONALE: STEP 3 - CONDIZIONI E DIMENSIONI
//      * 
//      * Solo se currentStep === 3, mostra il terzo passo.
//      * 
//      * Cosa chiede all'utente:
//      * - Superficie: inserisce un numero (metri quadri)
//      * - Superficie terreno: inserisce un numero (metri quadri)
//      * - Stato dell'immobile: sceglie tra "Nuovo", "Ristrutturato", "Da ristrutturare"
//      * 
//      * Mix di input types:
//      * - Tipo "number" per le superfici (accetta solo numeri)
//      * - Button selezionabili per lo stato
//      */
//     // Step 3: Condizioni e dimensioni
//     if (currentStep === 3) {
//         return (
//             <CardStep
//                 title="Condizioni e dimensioni"
//                 subtitle="In che condizione è ?"
//                 currentStep={currentStep}
//                 totalSteps={totalSteps}
//                 clickableSteps={getClickableSteps()}
//                 onJumpToStep={handleJumpToStep}
//                 onNext={nextStep}
//                 onPrev={prevStep}
//                 onSubmit={handleSubmit}
//                 isLastStep={false}
//                 prevIcon={arrowLeftIcon}
//                 nextIcon={arrowRightIcon}
//             >
//                 {/* SEZIONE 1: Campi numerici (Superficie) */}

//                 <div className="form-grid">
//                     {/* Campo Superficie in m² */}
//                     <div className="form-field">
//                         <label className="form-label">Superficie (m²)</label>
//                         <input
//                             type="number"
//                             value={formData.superficie}
//                             onChange={(e) => updateFormData('superficie', e.target.value)}
//                             className="form-input"
//                             placeholder="inserisci la superficie"
//                             min ="1"
//                         />
//                         {errors.superficie && <p className="error-message">{errors.superficie}</p>}
//                     </div>
//                     {/* Campo Superficie Terreno in m² */}
//                     <div className="form-field">
//                         <label className="form-label">Piano</label>
//                         <input
//                             type="number"
//                             value={formData.pianoAbitazione}
//                             onChange={(e) => updateFormData('pianoAbitazione', e.target.value)}
//                             className="form-input"
//                             placeholder="inserisci il piano"
//                             min = "1"
//                         />
//                         {errors.pianoAbitazione && <p className="error-message">{errors.pianoAbitazione}</p>}
//                     </div>
//                 </div>

//                 {/* SEZIONE 2: Selezione dello Stato dell'Immobile */}
//                 <div className="form-section">
//                     <label className="section-label">Stato dell'immobile</label>
//                     {/* Crea 3 button per le diverse condizioni dell'immobile */}
//                     <div className="options-grid stato-grid">
//                         {['Nuovo', 'Ristrutturato', 'Da ristrutturare'].map((stato) => (
//                             <button
//                                 key={stato}
//                                 onClick={() => updateFormData('statoImmobile', stato)}
//                                 // Aggiunge classe 'selected' se questo stato è selezionato
//                                 // Nota: 'simple' è una classe di stile aggiuntiva
//                                 className={`option-card simple ${formData.statoImmobile === stato ? 'selected' : ''}`}
//                             >
//                                 <p className="option-text">{stato}</p>
//                             </button>
//                         ))}
//                     </div>
//                     {errors.statoImmobile && <p className="error-message">{errors.statoImmobile}</p>}
//                 </div>
//             </CardStep>
//         );
//     }

//     /**
//      * RENDERING CONDIZIONALE: STEP 4 - DOTAZIONI ESTERNE
//      * 
//      * Solo se currentStep === 4, mostra il quarto passo.
//      * 
//      * Cosa chiede all'utente:
//      * - Seleziona MULTIPLE dotazioni (Giardino, Piscina, Garage, Terrazzo, Balcone, Cantina)
//      * - Può scegliere nessuna, una sola, o tutte
//      * 
//      * Differenza rispetto agli step precedenti:
//      * - Usa toggleArrayValue() invece di updateFormData()
//      * - dotazioniEsterne è un ARRAY, non una stringa singola
//      * - Quando clicca uno stesso button due volte, toglie la selezione
//      * - Mostra classe 'selected' se il valore è incluso nell'array
//      */
//     // Step 4: Dotazioni esterne
//     if (currentStep === 4) {
//         return (
//             <CardStep
//                 iconAlt="Dotazioni"
//                 title="Dotazioni esterne"
//                 subtitle="Seleziona le dotazioni che desideri (selezione multipla)"
//                 currentStep={currentStep}
//                 totalSteps={totalSteps}
//                 clickableSteps={getClickableSteps()}
//                 onJumpToStep={handleJumpToStep}
//                 onNext={nextStep}
//                 onPrev={prevStep}
//                 onSubmit={handleSubmit}
//                 isLastStep={false}
//                 prevIcon={arrowLeftIcon}
//                 nextIcon={arrowRightIcon}
//             >
//                 {/* Griglia di opzioni selezionabili multiple */}

//                 <div className="options-grid dotazioni-grid">
//                     {['Giardino', 'Piscina', 'Garage', 'Terrazzo', 'Balcone', 'Cantina'].map((dotazione) => (
//                         <button
//                             key={dotazione}
//                             onClick={() => toggleArrayValue('dotazioniEsterne', dotazione)}
//                             // Controlla se la dotazione è già selezionata nell'array
//                             // Se sì, aggiunge classe 'selected'
//                             className={`option-card ${formData.dotazioniEsterne.includes(dotazione) ? 'selected' : ''}`}
//                         >
//                             <img src={homeOptionIcon} alt={dotazione} className="option-icon" />
//                             <p className="option-text">{dotazione}</p>
//                         </button>
//                     ))}
//                 </div>
//                 {errors.dotazioniEsterne && <p className="error-message">{errors.dotazioniEsterne}</p>}
//             </CardStep>
//         );
//     }

//     /**
//      * RENDERING CONDIZIONALE: STEP 5 - DATI PERSONALI (ULTIMO STEP)
//      * 
//      * Solo se currentStep === 5, mostra il quinto e ultimo passo.
//      * 
//      * Cosa chiede all'utente:
//      * - Nome: input testo
//      * - Cognome: input testo
//      * - Email: input email (validata con regex)
//      * - Telefono: input telefono
//      * - Privacy: checkbox che deve essere spuntato
//      * 
//      * Differenze rispetto agli altri step:
//      * - isLastStep={true}: il componente CardStep mostrerà il bottone "Invia" invece di "Avanti"
//      * - Include una checkbox per accettare la privacy policy (OBBLIGATORIA)
//      * - Tipo input diversi: text, email, tel
//      * 
//      * Quando l'utente clicca "Invia":
//      * 1. validateStep(5) controlla tutti i campi
//      * 2. Se tutto OK, chiama handleSubmit()
//      * 3. handleSubmit() stampa i dati e mostra un alert
//      */
//     // Step 5: Dati personali
//     if (currentStep === 5) {
//         return (
//             <CardStep
//                 iconSrc={userIcon}
//                 iconAlt="Utente"
//                 title="Dati personali"
//                 subtitle="Inserisci i tuoi dati per ricevere i risultati"
//                 currentStep={currentStep}
//                 totalSteps={totalSteps}
//                 clickableSteps={getClickableSteps()}
//                 onJumpToStep={handleJumpToStep}
//                 onNext={nextStep}
//                 onPrev={prevStep}
//                 onSubmit={handleSubmit}
//                 isLastStep={true}  /* Questo è l'ultimo step */
//                 prevIcon={arrowLeftIcon}
//                 nextIcon={arrowRightIcon}
//             >
//                 {/* Griglia di form con 4 campi di input testuali */}
//                 <div className="form-grid">
//                     {/* Campo Nome */}
//                     <div className="form-field">
//                         <label className="form-label">Nome</label>
//                         <input
//                             type="text"
//                             value={formData.nome}
//                             onChange={(e) => updateFormData('nome', e.target.value)}
//                             className="form-input"
//                             placeholder="Mario"
//                         />
//                         {errors.nome && <p className="error-message">{errors.nome}</p>}
//                     </div>
//                     {/* Campo Cognome */}
//                     <div className="form-field">
//                         <label className="form-label">Cognome</label>
//                         <input
//                             type="text"
//                             value={formData.cognome}
//                             onChange={(e) => updateFormData('cognome', e.target.value)}
//                             className="form-input"
//                             placeholder="Rossi"
//                         />
//                         {errors.cognome && <p className="error-message">{errors.cognome}</p>}
//                     </div>
//                     {/* Campo Email */}
//                     <div className="form-field">
//                         <label className="form-label">Email</label>
//                         <input
//                             type="email"
//                             value={formData.email}
//                             onChange={(e) => updateFormData('email', e.target.value)}
//                             className="form-input"
//                             placeholder="mario.rossi@example.com"
//                         />
//                         {errors.email && <p className="error-message">{errors.email}</p>}
//                     </div>
//                     {/* Campo Telefono */}
//                     <div className="form-field">
//                         <label className="form-label">Telefono</label>
//                         <input
//                             type="tel"
//                             value={formData.telefono}
//                             onChange={(e) => updateFormData('telefono', e.target.value)}
//                             className="form-input"
//                             placeholder="+39 123 456 7890"
//                         />
//                         {errors.telefono && <p className="error-message">{errors.telefono}</p>}
//                     </div>
//                 </div>

//                 {/* CHECKBOX PRIVACY - OBBLIGATORIA */}
//                 <div className="privacy-checkbox">
//                     {/* Checkbox per accettare la privacy */}
//                     <input
//                         type="checkbox"
//                         id="privacy"
//                         checked={formData.privacy}
//                         onChange={(e) => updateFormData('privacy', e.target.checked)}
//                         className="checkbox-input"
//                     />
//                     {/* Label e testo della privacy policy */}
//                     <label htmlFor="privacy" className="checkbox-label">
//                         Accetto i termini e le condizioni e l'informativa sulla privacy. Autorizzo il trattamento dei miei dati personali secondo il GDPR.
//                     </label>
//                     {errors.privacy && <p className="error-message">{errors.privacy}</p>}
//                 </div>
//             </CardStep>
//         );
//     }

//     /**
//      * FALLBACK: Se per qualche motivo currentStep non corrisponde a nessuno
//      * dei 5 step, ritorna null (non mostra nulla)
//      * 
//      * Questo di solito non dovrebbe mai accadere se la logica è corretta.
//      */
//     return null;
// };

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardStep from './CardStep';
import AuthContext from '../store/auth-context';
import '../styles/components/_stepMulti.scss';

// ... import delle icone (invariato) ...
import homeIcon from '../../public/img/casa_indipendente.svg';
import casa from '../../public/img/casa_indipendente.svg';
import appartamento from '../../public/img/Appartment.svg';
import rulerIcon from '../../public/img/coins.svg';
import dropletsIcon from '../../public/img/coins.svg';
import userIcon from '../../public/img/coins.svg';
import arrowLeftIcon from '../../public/img/coins.svg';
import arrowRightIcon from '../../public/img/coins.svg';
import homeOptionIcon from '../../public/img/coins.svg';

const StepForm = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext) || {};
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    // Stato per la risposta del backend
    const [apiResponse, setApiResponse] = useState(null);

    const getUserData = () => ({
        nome: user?.nome || 'Guest',
        cognome: user?.cognome || 'User',
        email: user?.email || 'guest@example.com',
        telefono: user?.telefono || '',
        idUtente: user?.id || null // Usa null se non c'è utente
    });

    const userData = getUserData();

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        indirizzo: '',
        citta: '',
        provincia: '',
        // regione: '', // RIMOSSO COME RICHIESTO
        cap: '',
        tipologia: '', // Deve essere 'APPARTAMENTO' o 'CASA_INDIPENDENTE'
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

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                
                // FIX LOGICA: Se avevamo finito (step 6), ricominciamo da 1
                if (parsed.currentStep >= 6) {
                    localStorage.removeItem(STORAGE_KEY);
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

    useEffect(() => {
        if (!isHydrated) return;
        
        // Se siamo allo step 6, NON salviamo, anzi puliamo
        if (currentStep === 6) {
             localStorage.removeItem(STORAGE_KEY);
             return;
        }

        try {
            const payload = JSON.stringify({ formData, currentStep });
            localStorage.setItem(STORAGE_KEY, payload);
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
                    formData.tipologia && // Deve essere valorizzato
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
        if (currentStep >= 6) return []; // Nessun click se finito
        const clickable = [];
        for (let i = 1; i < currentStep; i++) {
            clickable.push(i);
        }
        if (isStepCompleted(currentStep)) {
            for (let i = currentStep + 1; i < 6; i++) { // Non mostriamo lo step 6 nella barra
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

        // DEBUG: Vediamo cosa stiamo inviando
        console.log("Tipologia inviata:", formData.tipologia);

        const payload = {
            idUtente: userData.idUtente || null, // Importante per la questione NULL/0
            cap: formData.cap,
            citta: formData.citta,
            indirizzo: formData.indirizzo,
            tipologia: formData.tipologia, // Deve essere 'APPARTAMENTO' o 'CASA_INDIPENDENTE'
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
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
            }

            const result = await response.json();
            
            setApiResponse(result);
            localStorage.removeItem(STORAGE_KEY);
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
        localStorage.removeItem(STORAGE_KEY);
    };

    // STEP 1
    if (currentStep === 1) {
        return (
            <CardStep 
                title="Dove si trova l'immobile?" 
                subtitle="Inserisci la posizione"
                currentStep={currentStep} totalSteps={totalSteps} clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep} onNext={nextStep} onPrev={prevStepWithHomeRedirect}
                prevIcon={arrowLeftIcon} nextIcon={arrowRightIcon}
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

    // STEP 2
    if (currentStep === 2) {
        const tipologiaImages = {
            'APPARTAMENTO': appartamento,     
            'CASA_INDIPENDENTE': casa       
        };
        const tipologiaLabels = {
            'APPARTAMENTO': 'Appartamento',
            'CASA_INDIPENDENTE': 'Casa Indipendente'
        };

        return (
            <CardStep 
                title="Dettagli dell'immobile" 
                currentStep={currentStep} totalSteps={totalSteps} clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep} onNext={nextStep} onPrev={prevStep}
                prevIcon={arrowLeftIcon} nextIcon={arrowRightIcon}
            >
                <div className="form-section">
                    <label className="section-label">Tipologia</label>
                    <div className="options-grid tipologia-grid">
                        {/* NOTA BENE: Le chiavi qui sotto DEVONO corrispondere esattamente all'ENUM del Database */}
                        {['APPARTAMENTO', 'CASA_INDIPENDENTE'].map((tipo) => (
                            <button 
                                key={tipo} 
                                onClick={() => updateFormData('tipologia', tipo)} 
                                className={`option-card ${formData.tipologia === tipo ? 'selected' : ''}`}
                            >
                                <img src={tipologiaImages[tipo]} alt={tipologiaLabels[tipo]} className="option-icon" />
                                <p className="option-text">{tipologiaLabels[tipo]}</p>
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

    // STEP 3
    if (currentStep === 3) {
        return (
            <CardStep 
                title="Condizioni e dimensioni" 
                currentStep={currentStep} totalSteps={totalSteps} clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep} onNext={nextStep} onPrev={prevStep}
                prevIcon={arrowLeftIcon} nextIcon={arrowRightIcon}
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
                        <label className="form-label">Anno</label>
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
                    <label className="section-label">Stato</label>
                    <div className="options-grid stato-grid">
                        {['NUOVO', 'RISTRUTTURATO', 'DA_RISTRUTTURARE'].map((stato) => (
                            <button key={stato} onClick={() => updateFormData('statoImmobile', stato)} className={`option-card simple ${formData.statoImmobile === stato ? 'selected' : ''}`}>
                                <p className="option-text">{stato}</p>
                            </button>
                        ))}
                    </div>
                    {errors.statoImmobile && <p className="error-message">{errors.statoImmobile}</p>}
                </div>
            </CardStep>
        );
    }

    // STEP 4
    if (currentStep === 4) {
        return (
            <CardStep 
                title="Dotazioni esterne" iconAlt="Dotazioni"
                currentStep={currentStep} totalSteps={totalSteps} clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep} onNext={nextStep} onPrev={prevStep}
                prevIcon={arrowLeftIcon} nextIcon={arrowRightIcon}
            >
                <div className="options-grid dotazioni-grid">
                    {['Giardino', 'Piscina', 'Garage', 'Terrazzo', 'Balcone', 'Cantina', 'Ascensore'].map((dot) => (
                        <button key={dot} onClick={() => toggleArrayValue('dotazioniEsterne', dot)} className={`option-card ${formData.dotazioniEsterne.includes(dot) ? 'selected' : ''}`}>
                            <img src={homeOptionIcon} alt={dot} className="option-icon" />
                            <p className="option-text">{dot}</p>
                        </button>
                    ))}
                </div>
                {errors.dotazioniEsterne && <p className="error-message">{errors.dotazioniEsterne}</p>}
            </CardStep>
        );
    }

    // STEP 5 - RIEPILOGO
    if (currentStep === 5) {
        return (
            <CardStep
                iconSrc={userIcon}
                iconAlt="Riepilogo"
                title="Riepilogo Richiesta"
                subtitle="Controlla i dati del tuo immobile prima di inviare"
                currentStep={currentStep}
                totalSteps={totalSteps}
                clickableSteps={getClickableSteps()}
                onJumpToStep={handleJumpToStep}
                onNext={null} 
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isLastStep={true} 
                prevIcon={arrowLeftIcon}
                nextIcon={arrowRightIcon}
            >
                {submitError && (
                    <div className="error-banner" style={{ padding: '12px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '16px' }}>
                        {submitError}
                    </div>
                )}

                <div className="summary-container" style={{ marginBottom: '20px' }}>
                    <h4 style={{marginBottom: '10px', color: '#333'}}>Dettagli Inseriti:</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', color: '#555', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                        <div><strong>Indirizzo:</strong> {formData.indirizzo}, {formData.citta} ({formData.provincia})</div>
                        <div><strong>Tipologia:</strong> {formData.tipologia}</div>
                        <div><strong>Dimensioni:</strong> {formData.superficie} m², {formData.numeroLocali} locali, {formData.numeroBagni} bagni</div>
                        <div><strong>Caratteristiche:</strong> Piano {formData.pianoAbitazione}, {formData.statoImmobile}, Cl. {formData.classeEnergetica}, Anno {formData.annoCostruzione}</div>
                        <div style={{gridColumn: 'span 2'}}><strong>Dotazioni:</strong> {formData.dotazioniEsterne.join(', ')}</div>
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

    // STEP 6 - SUCCESS


    if (currentStep === 6) {
        return (
            <CardStep
                title="Valutazione Completata!"
                subtitle="Ecco il risultato della tua richiesta"
                currentStep={5}
                totalSteps={5}
                clickableSteps={[]}
                isLastStep={false} 
                hideButtons={true} 
                onPrev={() => {}}
                onNext={() => {}}
            >
                <div className="success-container" style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ fontSize: '3rem', color: '#4caf50', marginBottom: '10px' }}>✓</div>
                    <h3 style={{ color: '#333', marginBottom: '15px' }}>Grazie, {formData.nome}!</h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>Abbiamo elaborato la tua richiesta con successo.</p>

                    <div className="api-response-box" style={{ 
                        backgroundColor: '#e8f5e9', 
                        border: '1px solid #c8e6c9', 
                        borderRadius: '8px', 
                        padding: '20px',
                        textAlign: 'left',
                        marginBottom: '20px',
                        overflowX: 'auto'
                    }}>
                        <h4 style={{ marginTop: 0, color: '#2e7d32' }}>Risultato Valutazione:</h4>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#333' }}>
                            {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                    </div>

                    <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        <button 
                            onClick={() => navigate('/')} 
                            className="btn-primary"
                            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}
                        >
                            Torna alla Home
                        </button>
                        
                        <button 
                            onClick={handleReset} 
                            className="btn-secondary"
                            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#fff', color: '#333', border: '1px solid #333', borderRadius: '4px' }}
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