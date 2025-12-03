/**
 * @fileoverview Singolo elemento FAQ con accordion (details/summary).
 * Supporta HTML nella risposta.
 * 
 * @module FAQItem
 */

/**
 * Componente FAQ Item
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.question - Domanda FAQ
 * @param {string} props.answer - Risposta (può contenere HTML)
 * @returns {JSX.Element} Elemento accordion con domanda/risposta
 * 
 * @example
 * <FAQItem
 *   question="Come funziona la valutazione?"
 *   answer="<p>Ricevi una stima entro <strong>72 ore</strong></p>"
 * />
 */
const FAQItem = ({ question, answer }) => {
  return (
    <details className="faq-item">
      <summary className="faq-question">
        <span className="faq-question-text">{question}</span>
        <span className="faq-icon"></span>
      </summary>
      <div className="faq-answer">
        <div className="faq-answer-text" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </details>
  );
};

export default FAQItem;