import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Importa i nuovi componenti
import HeaderImmobile from '../components/HeaderImmobile';
import ImmobileGallery from '../components/ImmobileGallery';
import InformazioneImmobile from '../components/InformazioneImmobile';
import FeatureImmobile from '../components/FeatureImmobile';
import InfoEdificioImmobile from '../components/InfoEdificioImmobile';
import DescrizioneImmobile from '../components/DescrizioneImmobile';
import Newsletter from '../components/NewsLetter';

import useSEO from '../hooks/useSEO';

export default function DettaglioImmobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const immobile = mockImmobili.find(item => item.id_immobile === Number(id));

  const [immobile, setImmobile] = useState(null);

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await fetch(`http://localhost:8085/api/immobili/${id}`);
        const data = await res.json();
        setImmobile(data);
        console.log("Immobile caricato:", data);
      } catch (error) {
        console.error("Errore nel caricamento immobile:", error);
      }
    };

    fetchSingle();
  }, [id]);

  useSEO({
    title: `Immobile in ${immobile?.indirizzo} a ${immobile?.citta}`,
    description: `Vendita ${immobile?.tipologia} in ${immobile?.indirizzo} a ${immobile?.citta}. Prezzo: €${immobile?.prezzo}. ${immobile?.descrizione}`,
    image: String(immobile?.foto),
    imageAlt: `Foto di ${immobile?.titolo}`,
    type: "article"
  })

  if (!immobile) {
    return <p>Caricamento immobile...</p>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const { caratteristiche } = immobile;

    useSEO({
    title: `Immobile in ${immobile?.indirizzo} a ${immobile?.citta}`,
    description: `Vendita ${immobile?.tipologia} in ${immobile?.indirizzo} a ${immobile?.citta}. Prezzo: €${immobile?.prezzo}. ${immobile?.descrizione}`,
    image: String(immobile?.foto),
    imageAlt: `Foto di ${immobile?.titolo}`,
    type: "article"
  })

  return (
    <>
      <div className="dettaglio-immobile">
        
        <HeaderImmobile immobile={immobile} formattedPrice={formatPrice(immobile.prezzo)} onBackClick={() => navigate('/immobili')} />

        {/* Il contenitore del contenuto principale */}
        <div className="dettaglio-immobile__content">
          
          {/* <ImmobileGallery immagini={immobile.immagini} altText={immobile.indirizzo} /> */}

          <InformazioneImmobile immobile={immobile} caratteristiche={caratteristiche}  />

          {caratteristiche && (
            <FeatureImmobile caratteristiche={caratteristiche} />
          )}

          {caratteristiche && (
            <InfoEdificioImmobile caratteristiche={caratteristiche} />
          )}

          <DescrizioneImmobile descrizione={immobile.descrizione} altreCaratteristiche={caratteristiche?.altre_caratteristiche} />

          <div className="dettaglio-immobile__cta-section">
            <button className="dettaglio-immobile__cta-button">
              Contatta agente
            </button>
          </div>

        </div>
      </div>

      <Newsletter />
    </>
  );
}