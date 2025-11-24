import Card from './Card';

// import iconStima from '../assets/icons/stima-icon.svg';
// import iconAgente from '../assets/icons/agente-icon.svg';
// import iconTrasparenza from '../assets/icons/trasparenza-icon.svg';

export default function VendiTech() {
  return (
    <section className="vendi-tech">
      <h2 className="vendi-tech__title">
        Tecnologia e competenza, insieme per una valutazione reale
      </h2>

      <div className="vendi-tech__grid">
        <Card
          subtitle="Stima automatica immediata"
          text="Il nostro algoritmo analizza dati di mercato aggiornati e ti fornisce subito una fascia di valore del tuo immobile."
        />
        <Card
          subtitle="Verifica dell'agente locale"
          text="Ogni valutazione viene controllata da un agente della tua zona, che conosce dinamiche, quartieri e tendenze reali."
        />
        <Card
          subtitle="Trasparenza e tracciabilità"
          text="Ricevi un report completo, aggiornato online, con tutti i passaggi monitorabili in tempo reale."
        />
      </div>
    </section>
  );
}