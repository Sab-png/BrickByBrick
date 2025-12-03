import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import AuthContext from '../store/auth-context';

const PrenotaVisitaForm = ({ onClose }) => {
  const { user } = useContext(AuthContext) || {};
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('idle');

  const [immobile, setImmobile] = useState(null);
  const [agenteRandom, setAgenteRandom] = useState(null);


  useEffect(() => {
    const fetchImmobile = async () => {
      try {
        const res = await fetch(`http://localhost:8085/api/immobili/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Immobile caricato:", data);
          setImmobile(data);
        }
      } catch (err) {
        console.error("Errore caricamento immobile:", err);
      }
    };

    fetchImmobile();
  }, [id]);

  useEffect(() => {
    const fetchAgenti = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/agenti");
        if (res.ok) {
          const data = await res.json();
          console.log("Agenti caricati:", data);
          // setAgenti(data);

          if (data.length > 0) {
            const random = data[Math.floor(Math.random() * data.length)];
            console.log("Agente random selezionato:", random);
            setAgenteRandom(random);
          }
        }
      } catch (err) {
        console.error("Errore caricamento agenti:", err);
      }
    };

    fetchAgenti();
  }, []);

  const handleBack = () => {
    if (onClose) onClose();
    navigate(`/immobili/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const sqlDateTime = `${date}T${time}:00`;
    console.log("Data formattata:", sqlDateTime);

    const immobileId = immobile?.Id_immobile || immobile?.id_immobile || immobile?.idImmobile;
    const agenteId = agenteRandom?.Id_agente || agenteRandom?.id_agente || agenteRandom?.idAgente;
    const utenteId = user?.Id_utente || user?.id_utente || user?.id || 1;

    if (!immobileId) {
      console.error("ERRORE: immobileId è null/undefined!");
      setStatus('error');
      return;
    }
    if (!agenteId) {
      console.error("ERRORE: agenteId è null/undefined!");
      console.error("Agente random object:", agenteRandom);
      setStatus('error');
      return;
    }
    if (!utenteId) {
      console.error("ERRORE: utenteId è null/undefined!");
      setStatus('error');
      return;
    }


    const payload = {
      data: sqlDateTime,
      id_agente: Number(agenteId),
      id_immobile: Number(immobileId),  
      id_utente: Number(utenteId)        
    };

    console.log("=== PAYLOAD COMPLETO ===");
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('http://localhost:8085/api/visite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Visita creata con successo:", responseData);
        setStatus('success');
        setTimeout(() => {
          handleBack();
        }, 2500);
      } else {
        const errorText = await response.text();
        console.error("Errore dal backend:", errorText);
        setStatus('error');
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      setStatus('error');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleBack();
  };

  return (
    <div className="prenota-visita" onClick={handleOverlayClick}>
      <div className="prenota-visita__container">

        {status === 'success' ? (
          <div className="prenota-visita__success">
            <h3>Richiesta Inviata!</h3>
            <p>L'agente ti contatterà per confermare la visita per il <strong>{date}</strong> alle <strong>{time}</strong>.</p>
          </div>
        ) : (
          <>
            <div className="prenota-visita__header">
              <h3 className="prenota-visita__title">
                Prenota visita presso {immobile?.indirizzo || "..."}
              </h3>
              <p className="prenota-visita__subtitle">Scegli data e ora per visionare l'immobile.</p>
            </div>

            <form onSubmit={handleSubmit} className="prenota-visita__form">

              <div className="prenota-visita__group">
                <label className="prenota-visita__label">Seleziona Data</label>
                <input
                  type="date"
                  className="prenota-visita__input"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="prenota-visita__group">
                <label className="prenota-visita__label">Seleziona Orario</label>
                <input
                  type="time"
                  className="prenota-visita__input"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  min="09:00"
                  max="19:00"
                />
              </div>

              {status === 'error' && (
                <p className="prenota-visita__error-msg">Errore durante la prenotazione. Controlla la console per dettagli.</p>
              )}

              <div className="prenota-visita__actions">
                <button type="submit" className="prenota-visita__submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Invio in corso...' : 'Conferma Visita'}
                </button>

                <button type="button" className="prenota-visita__back-btn" onClick={handleBack}>
                  <FaArrowLeft /> Torna all'immobile
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default PrenotaVisitaForm;