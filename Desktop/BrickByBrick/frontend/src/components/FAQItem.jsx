import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };

  const icon = isOpen ? '-' : '+';

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleItem}>
        <span>{question}</span>
        <span className="faq-icon">{icon}</span>
      </div>

      {isOpen && (
        <div className="faq-answer">
          <div
            className="faq-answer-text"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      )}
    </div>
  );
};

export default FAQItem;
