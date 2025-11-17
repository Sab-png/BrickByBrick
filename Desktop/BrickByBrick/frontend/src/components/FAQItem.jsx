import React, { useState } from 'react';
import '../styles/components/_faqItem.scss'


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen(!isOpen);
  };


  const icon = isOpen ? '-' : '+';

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleItem}>
        {/* La domanda come nell'immagine */}
        <span>{question}</span>
        {/* L'icona a destra */}
        <span className="faq-icon">{icon}</span>
      </div>
      
   
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;