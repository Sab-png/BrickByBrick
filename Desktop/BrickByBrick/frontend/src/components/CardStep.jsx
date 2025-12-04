/**
 * @fileoverview Componente card per multi-step form con barra progresso.
 * Gestisce navigazione avanti/indietro e submit finale.
 * 
 * @module CardStep
 */

/**
 * Componente Card Step
 * 
 * Caratteristiche:
 * - Progress bar con percentuale automatica
 * - Navigazione prev/next
 * - Submit su ultimo step
 * - Opzioni per nascondere progressBar o buttons
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.iconSrc - URL icona dello step
 * @param {string} props.iconAlt - Alt text icona
 * @param {string} props.title - Titolo principale dello step
 * @param {string} props.subtitle - Sottotitolo descrittivo
 * @param {React.ReactNode} props.children - Contenuto dello step (form fields)
 * @param {number} props.currentStep - Step corrente (1-based)
 * @param {number} props.totalSteps - Numero totale di step
 * @param {Function} props.onNext - Callback per prossimo step
 * @param {Function} props.onPrev - Callback per step precedente
 * @param {Function} props.onSubmit - Callback per submit finale
 * @param {boolean} props.isLastStep - True se è l'ultimo step
 * @param {boolean} [props.hideProgressBar=false] - Nasconde barra progresso
 * @param {boolean} [props.hideButtons=false] - Nasconde pulsanti navigazione
 * @returns {JSX.Element} Card con step form
 * 
 * @example
 * <CardStep
 *   iconSrc="/img/step1.svg"
 *   title="Dati Proprietario"
 *   subtitle="Inserisci i tuoi dati"
 *   currentStep={1}
 *   totalSteps={4}
 *   onNext={handleNext}
 *   onPrev={handlePrev}
 * >
 *   <input type="text" name="nome" />
 * </CardStep>
 */
const CardStep = ({
  iconSrc,
  iconAlt,
  title,
  subtitle,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  hideProgressBar,
  hideButtons
}) => {

  const inputSteps = totalSteps > 1 ? totalSteps - 1 : 1;
  let progressPercentage = ((currentStep - 1) / (inputSteps - 1)) * 100;

  progressPercentage = Math.min(100, Math.max(0, progressPercentage));

  return (
    <div className="card-step-container">
      <div className="card-step-wrapper">
        <div className="card-step-content">

          {/* Progress Bar - Nascondibile */}
          {!hideProgressBar && (
            <div className="progress-section">
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          )}

          {/* Header */}
          <div className="card-step-header">
            {iconSrc && (
              <img src={iconSrc} alt={iconAlt || 'Step icon'} className="card-step-icon" />
            )}
            <h2 className="card-step-title">{title}</h2>
            <p className="card-step-subtitle">{subtitle}</p>
          </div>

          {/* Content */}
          <div className="card-step-body">
            {children}
          </div>

          {/* Navigation Buttons - Nascondibili */}
          {!hideButtons && (
            <div className="card-step-footer">
              <button onClick={onPrev} className={`btn-nav btn-prev`}>← Indietro</button>

              {!isLastStep ? (
                <button onClick={onNext} className="btn-nav btn-next">Avanti →</button>
              ) : (
                <button onClick={onSubmit} className="btn-nav btn-submit">Invia ricerca</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardStep;