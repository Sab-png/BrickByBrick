import React, { useState } from 'react';
import FAQItem from './FAQItem';
import '../styles/components/_faqSection.scss'

// --- Dati per tutte le sezioni ---
const allFAQs = {
  "Generali": [
    {
      id: 1,
      question: "Cosa fate di diverso rispetto a un'agenzia tradizionale?",
      answer: "Utilizziamo la tecnologia AI per ottimizzare il processo di valutazione e vendita, offrendo maggiore trasparenza e velocità rispetto ai metodi tradizionali.",
    },
    {
      id: 2,
      question: "È possibile vendere senza l'incontro con l'agente di persona?",
      answer: "Sì, il nostro processo è progettato per gestire gran parte delle fasi da remoto, sebbene una verifica finale in loco possa essere necessaria.",
    },
    {
      id: 3,
      question: "La trattativa verrà seguita da un agente?",
      answer: "Assolutamente. Le fasi cruciali come la trattativa e la chiusura sono sempre gestite da agenti immobiliari professionisti.",
    },
    {
      id: 4,
      question: "Cosa succede se non sono soddisfatto del preventivo AI?",
      answer: "Puoi richiedere una valutazione umana approfondita e personalizzata senza alcun impegno.",
    },
  ],
  
  "Preventivo AI": [
    {
      id: 5,
      question: "Quanto è accurato il preventivo generato dall'AI?",
      answer: "L'algoritmo di intelligenza artificiale analizza migliaia di dati immobiliari in tempo reale, offrendo una stima iniziale con un elevato grado di accuratezza, che serve come base di partenza per la valutazione finale.",
    },
    {
      id: 6,
      question: "Quali dati devo fornire per ottenere un preventivo?",
      answer: "Sono sufficienti l'indirizzo dell'immobile, la metratura, lo stato di conservazione e alcune foto. Più dettagli fornisci, più preciso sarà il risultato.",
    },
    {
      id: 7,
      question: "Il preventivo AI è vincolante per la vendita?",
      answer: "No, il preventivo AI è puramente indicativo e non vincolante. Serve solo per darti una prima idea del valore di mercato, prima della valutazione di un agente.",
    },
  ],
  
  "Post valutazione": [
    {
      id: 8,
      question: "Cosa succede dopo aver accettato la valutazione finale?",
      answer: "Un agente dedicato ti contatterà per definire la strategia di vendita, preparare la documentazione legale e procedere con la promozione professionale dell'immobile sul mercato.",
    },
    {
      id: 9,
      question: "Quali documenti mi verranno richiesti?",
      answer: "Ti chiederemo la planimetria catastale, l'atto di provenienza, l'attestato di prestazione energetica (APE) e la visura catastale aggiornata.",
    },
    {
      id: 10,
      question: "Quanto tempo ci vuole in media per vendere?",
      answer: "Il tempo di vendita varia in base al mercato locale e al prezzo stabilito, ma la nostra strategia basata sull'AI mira a ridurre i tempi rispetto alla media tradizionale.",
    },
  ],
  
  "Mandato in Esclusiva": [
    {
      id: 11,
      question: "Quali vantaggi offre un mandato in esclusiva?",
      answer: "Il mandato in esclusiva garantisce il massimo impegno da parte nostra in termini di investimenti marketing (foto professionali, virtual tour, pubblicità mirate) e previene la confusione sul mercato, portando spesso a una vendita più rapida e a un prezzo migliore.",
    },
    {
      id: 12,
      question: "Qual è la durata standard del mandato?",
      answer: "La durata standard è di 6 mesi, ma è flessibile e può essere concordata in base alle tue esigenze e alla tipologia dell'immobile.",
    },
    {
      id: 13,
      question: "Posso recedere dal mandato in esclusiva?",
      answer: "Sì, le condizioni di recesso sono chiaramente specificate nel contratto e prevedono generalmente un preavviso, come previsto dalla legge.",
    },
  ],
};


const tabs = ["Generali", "Preventivo AI", "Post valutazione", "Mandato in Esclusiva"];


export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("Generali");
  
  const currentFAQs = allFAQs[activeTab] || []; 

  return (
    <div className="faq-background">
      <div className="faq-header">
        <h1>FAQ</h1>
        <p>Ecco le domande più frequenti.</p>
      </div>

      <div className="faq-container">

        {/* --- Area Tabs --- */}
        <div className="faq-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* --- Area Contenuto FAQ --- */}
        <div className="faq-content-area">
          {currentFAQs.length > 0 ? (
            currentFAQs.map((faq) => (
              <FAQItem 
                key={faq.id} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))
          ) : (
            <p className="no-faqs">Nessuna FAQ disponibile per questa sezione.</p>
          )}
        </div>
      </div>
    </div>
  );
}