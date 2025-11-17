import React from 'react';
import '../styles/components/_cardstep.scss';

const CardStep = ({ 
  iconSrc,  // Cambiato da 'icon' a 'iconSrc' per accettare path immagine
  iconAlt,  // Alt text per accessibilità
  title, 
  subtitle, 
  children, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev,
  onSubmit,
  isLastStep,
  prevIcon,  // Path immagine per freccia indietro
  nextIcon   // Path immagine per freccia avanti
  ,
  // Nuovi props opzionali per navigazione diretta tra step
  onJumpToStep, // function(stepNumber)
  clickableSteps // array di step numerici che possono essere cliccati
}) => {
  return (
    <div className="card-step-container">
      <div className="card-step-wrapper">
        {/* Card Content */}
        <div className="card-step-content">
          {/* Progress Bar - NOW INSIDE THE CARD */}
          <div className="progress-section">
            <div className="progress-steps">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
                const isClickable = Array.isArray(clickableSteps) && clickableSteps.includes(step);
                return (
                  <div
                    key={step}
                    className={`progress-step ${
                      step === currentStep ? 'active' : ''
                    } ${step < currentStep ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
                    onClick={() => {
                      if (isClickable && typeof onJumpToStep === 'function') onJumpToStep(step);
                    }}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : -1}
                    onKeyDown={(e) => { if (isClickable && (e.key === 'Enter' || e.key === ' ')) onJumpToStep(step); }}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="card-step-header">
            {iconSrc && (
              <img 
                src={iconSrc} 
                alt={iconAlt || 'Step icon'} 
                className="card-step-icon" 
              />
            )}
            <h2 className="card-step-title">{title}</h2>
            <p className="card-step-subtitle">{subtitle}</p>
          </div>

          {/* Content */}
          <div className="card-step-body">
            {children}
          </div>

          {/* Navigation Buttons */}
          <div className="card-step-footer">
            <button
              onClick={onPrev}
              className={`btn-nav btn-prev`}
            >
              {prevIcon ? (
                <img src={prevIcon} alt="Indietro" className="btn-icon" />
              ) : (
                <span className="btn-icon-text">←</span>
              )}
              Indietro
            </button>

            {!isLastStep ? (
              <button
                onClick={onNext}
                className="btn-nav btn-next"
              >
                Avanti
                {nextIcon ? (
                  <img src={nextIcon} alt="Avanti" className="btn-icon" />
                ) : (
                  <span className="btn-icon-text">→</span>
                )}
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="btn-nav btn-submit"
              >
                Invia ricerca
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStep;