import Card from './Card';

import cardOneImg from '../assets/images/svg/card-one-home.svg';
import cardTwoImg from '../assets/images/svg/card-two-home.svg';
import cardThreeImg from '../assets/images/svg/card-three-home.svg';

export default function CardSection() {
  return (
    <section className="card-section">
      <h2 className="card-section__title">Come funziona</h2>

      <div className="card-section__grid">
        <Card
          image={cardOneImg}
          subtitle="Valuta Online"
          text="Ricevi la prima stima e l'analisi di mercato entro 72 ore."
        />
        <Card
          image={cardTwoImg}
          subtitle="Proposta su misura"
          text="Il nostro consulente ti contatta con la proposta di vendita in esclusiva e la strategia marketing dedicata."
        />
        <Card
          image={cardThreeImg}
          subtitle="Vendi rapidamente"
          text="Gestiamo noi tutte le trattative e le procedure legali per finalizzare la vendita al miglior prezzo."
        />
      </div>
    </section>
  );
}
