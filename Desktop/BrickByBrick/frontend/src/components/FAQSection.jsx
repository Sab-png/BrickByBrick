import React, { useState } from 'react';
import FAQItem from './FAQItem';
import '../styles/components/_faqSection.scss'

// --- Dati per tutte le sezioni ---
const allFAQs = {
  "Generali": [
    {
      id: 1,
      question: "Cosa fate di diverso rispetto a un'agenzia tradizionale?",
      answer: `
        L'agenzia tradizionale spesso si limita a inserire l'immobile sul proprio sito e sui portali generalisti, aspettando il cliente. 
        Noi di Immobiliaris gestiamo la vendita come una vera campagna di marketing digitale:
        <ul>
          <li>Creiamo contenuti (foto/video) professionali.</li>
          <li>Lanciamo campagne sponsorizzate mirate.</li>
          <li>Ottimizziamo l'annuncio per la SEO (per farla trovare su Google).</li>
          <li>Utilizziamo la Marketing Automation per gestire i contatti degli acquirenti.</li>
        </ul>
      `,
    },
    {
      id: 2,
      question: "È possibile vendere senza l’incontro con l’agente di persona?",
      answer: `
        No, e questo è a tua completa tutela. Il nostro portale innovativo ti permette di avviare il processo, ottenere una valutazione AI affidabile in 72 ore e ottimizzare i tempi.  
        Tuttavia, la vendita immobiliare è un atto legale complesso. Il sopralluogo di un nostro agente qualificato è un passaggio obbligatorio e fondamentale per due motivi:
        <ul>
          <li><strong>Confermare i dati:</strong> L'agente deve verificare visivamente lo stato dell'immobile, le finiture e i dettagli che hai inserito online.</li>
          <li><strong>Definire il prezzo finale:</strong> Solo dopo il sopralluogo è possibile fornirti una quotazione vincolante.</li>
        </ul>
        Usiamo la tecnologia per garantirti efficienza all'inizio e la competenza umana per garantirti massima precisione e sicurezza alla fine.
      `,
    },
    {
      id: 3,
      question: "La trattativa verrà seguita da un agente?",
      answer: `
        Assolutamente sì. Immobiliaris non è un semplice "sito vetrina", ma un servizio completo.  
        Il nostro processo è chiaro:
        <ul>
          <li><strong>Valutazione AI:</strong> Avvii la richiesta online.</li>
          <li><strong>Backoffice:</strong> Il nostro team amministrativo valida i dati e ti contatta per organizzare il passo successivo.</li>
          <li><strong>Agente Dedicato:</strong> Un agente qualificato del nostro team (Gruppo Indomus) gestirà il sopralluogo, la definizione del prezzo, la strategia di marketing e, soprattutto, condurrà l'intera trattativa con i potenziali acquirenti, difendendo i tuoi interessi fino al rogito.</li>
        </ul>
        La tecnologia ci aiuta a trovare i clienti giusti; l'esperienza del nostro agente si occupa di chiudere l'affare al meglio.
      `,
    },
    {
      id: 4,
      question: "Cosa succede se non sono soddisfatto del preventivo AI?",
      answer: `
        Questo è uno dei motivi per cui la nostra valutazione non è istantanea, ma un processo ibrido.  
        Il nostro preventivo in 72 ore è una stima altamente affidabile basata sui dati che tu hai fornito e sui nostri database di mercato.
        <br><br>
        Se ritieni che il valore sia diverso, è molto probabile che ci siano dettagli di pregio (es. una ristrutturazione recente, finiture particolari, impianti) che un algoritmo non può valutare appieno da un form.  
        Il sopralluogo gratuito con l'agente serve proprio a questo: è il momento chiave in cui potrai mostrare di persona i punti di forza del tuo immobile.  
        Il nostro consulente analizzerà insieme a te la stima AI e i dettagli aggiuntivi per definire il prezzo di vendita finale corretto e allineato al mercato.
      `,
    },
  ],

  "Preventivo AI": [
    {
      id: 5,
      question: "Come funziona la valutazione online e perché richiede 72 ore?",
      answer: `
        Il nostro processo unisce il meglio della tecnologia AI e l'esperienza umana:
        <ul>
          <li><strong>Tu inserisci i dati:</strong> Compili il nostro form guidato con i dettagli chiave (indirizzo, metri quadri, stato, finiture).</li>
          <li><strong>L'AI analizza:</strong> Il nostro software confronta i tuoi dati con migliaia di compravendite recenti e annunci attivi nelle zone target (Torino, Cuneo, Alessandria, Asti).</li>
          <li><strong>L'esperto convalida:</strong> A differenza dei simulatori istantanei (che danno stime generiche), un nostro analista umano convalida i risultati dell'AI.</li>
        </ul>
        Ci prendiamo fino a 72 ore proprio per garantire questa convalida umana, fornendoti un report via email che sia realistico, affidabile e non una stima automatica imprecisa.
      `,
    },
    {
      id: 6,
      question: "La valutazione immobiliare è davvero gratuita?",
      answer: `
        Sì, il servizio di valutazione immobiliare professionale è completamente gratuito e non vincolante.  
        Non ci sono costi nascosti né clausole.  
        <br><br>
        Il nostro obiettivo è farti conoscere la nostra professionalità e il nostro approccio innovativo.  
        Consideriamo questa valutazione il primo passo per dimostrarti quanto vale il tuo immobile e quanto potremmo essere vantaggiosi per te, qualora decidessi di vendere.
      `,
    },
    {
      id: 7,
      question: "Quanto è affidabile una stima AI basata sui dati che inserisco io?",
      answer: `
        L'affidabilità della stima è molto alta, a condizione che i dati inseriti nel form siano accurati.  
        La nostra intelligenza artificiale è calibrata sul mercato piemontese.
        <br><br>
        Più sei preciso nell'indicare lo stato di manutenzione, le finiture o eventuali ristrutturazioni, più la valutazione sarà vicina alla realtà.  
        Questa stima online è il punto di partenza più innovativo e affidabile per definire una forbice di prezzo.  
        Per una quotazione finale (necessaria per un mandato di vendita), sarà comunque indispensabile un sopralluogo di un nostro agente per confermare visivamente quanto da te dichiarato.
      `,
    },
  ],

  "Post valutazione": [
    {
      id: 8,
      question: "Cosa succede dopo aver ricevuto la valutazione via email?",
      answer: `
        Dopo l'invio del form, riceverai la tua valutazione dettagliata via email entro 72 ore.  
        Contestualmente, i tuoi dati vengono inviati al nostro backoffice amministrativo.  
        Un nostro consulente interno ti contatterà (via email o telefono, come preferisci) non per venderti qualcosa, ma per assicurarsi che il report sia chiaro e per rispondere ai tuoi dubbi.
        `,
    },
    {
      id: 9,
      question: "La stima AI è vincolante? Coincide con il prezzo di vendita finale?",
      answer:"La nostra valutazione AI (convalidata umanamente) è una stima di mercato altamente affidabile, ma per definire il prezzo finale e vincolante è necessario un sopralluogo dell'agente.",
    },
    {
      id: 10,
      question: "Il sopralluogo dell'agente è gratuito?",
      answer: `
        Sì. Sia la valutazione digitale iniziale che l'eventuale sopralluogo di un nostro agente sono completamente gratuiti e senza impegno.  
        Fa parte del nostro approccio "Affidabile e Vantaggioso": ti forniamo tutti gli strumenti per prendere una decisione informata, prima ancora di parlare di contratti.
      `,
    },
    {
      id: 11,
      question: "Quali documenti devo preparare per velocizzare il processo?",
      answer: `
        Non è obbligatorio avere tutto subito, ma se vuoi velocizzare i tempi, i documenti più utili durante il sopralluogo sono:
        <ul>
          <li>L'Atto di provenienza (l'atto di acquisto o la successione).</li>
          <li>La Planimetria Catastale recente.</li>
          <li>L'Attestato di Prestazione Energetica (APE), se già in tuo possesso.</li>
        </ul>
        Non preoccuparti: se mancano, il nostro consulente ti guiderà passo passo per reperirli.
      `,
    },
  ],

  "Mandato in Esclusiva": [
    {
      id: 12,
      question: "Perché Immobiliaris chiede un mandato in esclusiva?",
      answer: `
        Perché il nostro non è un servizio di semplice "messa in vetrina".  
        Per attrarre il target 35-55 anni, investiamo un budget marketing dedicato specificamente sul tuo immobile, usando campagne Paid su Google, Meta e portali premium.  
        L'esclusiva ci permette di garantire questo investimento e di lavorare con un obiettivo comune: vendere la tua casa al miglior prezzo e nel minor tempo possibile, senza confusione tra agenzie.
      `,
    },
    {
      id: 13,
      question: "Il mandato in esclusiva costa di più? Le commissioni sono più alte?",
      answer: `
        No. Nonostante l'approccio innovativo e l'investimento marketing che garantiamo, le nostre commissioni sono allineate allo standard di mercato delle agenzie immobiliari professionali.  
        <br><br>
        Il nostro modello è pensato per essere vantaggioso: ottieni un servizio premium (marketing digitale, backoffice dedicato, valutazione AI) allo stesso costo di un servizio tradizionale.
      `,
    },
    {
      id: 14,
      question: "Cosa succede se la casa non si vende entro la scadenza del mandato?",
      answer: `
        La trasparenza è fondamentale. Durante tutto il mandato, avrai accesso a un report sull'andamento delle campagne e sull'interesse generato.  
        Se l'immobile non dovesse vendersi nei tempi stabiliti, analizzeremo insieme i dati raccolti per capire se è necessario un riposizionamento strategico del prezzo o un cambio nella comunicazione, sempre in totale accordo con te.
      `,
    },
    {
      id: 15,
      question: "Quanto dura il mandato in esclusiva?",
      answer: `
        Il nostro obiettivo è lo stesso del tuo: vendere velocemente e al prezzo giusto.  
        La durata del mandato in esclusiva (solitamente tra i 3 e i 6 mesi) viene concordata insieme ed è funzionale a un obiettivo preciso: darci il tempo tecnico per far performare al massimo le campagne di marketing digitale che finanziamo per te.
      `,
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