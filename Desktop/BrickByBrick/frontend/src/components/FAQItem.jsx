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