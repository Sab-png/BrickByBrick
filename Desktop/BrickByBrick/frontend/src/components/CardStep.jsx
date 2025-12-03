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