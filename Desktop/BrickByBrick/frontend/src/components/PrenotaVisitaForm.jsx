// import { useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaArrowLeft } from "react-icons/fa";

// import AuthContext from '../store/auth-context';

// const PrenotaVisitaForm = ({ onClose }) => {

//   let numeroAgenti = 1;

//   fetch("http://localhost:8085/api/agenti").then(res => res.json()).then(data => {
//       numeroAgenti = data.length;
//     }) 

//   const { user } = useContext(AuthContext) || {};

//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [status, setStatus] = useState('idle');

//   const { id } = useParams();

//   const getUserData = () => ({
//       idUtente: user?.id || null
//   });

//   const userData = getUserData();
  
//   const navigate = useNavigate();

//   const handleBack = () => {
//     if (onClose) {
//       onClose();
//     }
//     navigate(`/immobili/${id}`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setStatus('loading');

//     const sqlDateTime = `${date} ${time}:00`;

//     const randomAgentId = Math.floor(Math.random() * numeroAgenti)

//     const payload = {
//       Id_immobile: Number(id),
//       Id_utente: userData.idUtente,
//       Id_agente: randomAgentId ?? 1,
//       data: sqlDateTime
//     };

//     console.log(payload);
    
//     try {
//       const response = await fetch('http://localhost:8085/api/visite', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setStatus('success');
//         setTimeout(() => {
//           handleBack();
//         }, 2500);
//       } else {
//         setStatus('error');
//       }
//     } catch (error) {
//       console.error("Errore prenotazione:", error);
//       setStatus('error');
//     }
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       handleBack();
//     }
//   };

//   return (
//     <div className="prenota-visita" onClick={handleOverlayClick}>
      
//       <div className="prenota-visita__container">

//         {status === 'success' ? (
//           <div className="prenota-visita__success">
//             <h3>Richiesta Inviata!</h3>
//             <p>L'agente ti contatterà per confermare la visita per il <strong>{date}</strong> alle <strong>{time}</strong>.</p>
//           </div>
//         ) : (
//           <>
//             <div className="prenota-visita__header">
//               <h3 className="prenota-visita__title">Prenota una visita</h3>
//               <p className="prenota-visita__subtitle">Scegli data e ora per visionare l'immobile.</p>
//             </div>
            
//             <form onSubmit={handleSubmit} className="prenota-visita__form">
              
//               <div className="prenota-visita__group">
//                 <label className="prenota-visita__label">Seleziona Data</label>
//                 <input type="date" className="prenota-visita__input" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
//               </div>

//               <div className="prenota-visita__group">
//                 <label className="prenota-visita__label">Seleziona Orario</label>
//                 <input type="time" className="prenota-visita__input" required value={time} onChange={(e) => setTime(e.target.value)} min="09:00" max="19:00" />
//               </div>

//               {status === 'error' && (
//                 <p className="prenota-visita__error-msg">
//                   Errore durante la prenotazione. Riprova.
//                 </p>
//               )}

//               <div className="prenota-visita__actions">
//                 <button type="submit" className="prenota-visita__submit" disabled={status === 'loading'} >
//                   {status === 'loading' ? 'Invio in corso...' : 'Conferma Visita'}
//                 </button>

//                 <button type="button" className="prenota-visita__back-btn" onClick={handleBack}>
//                   <FaArrowLeft /> Torna all'immobile
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrenotaVisitaForm;

import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import AuthContext from '../store/auth-context';

const PrenotaVisitaForm = ({ onClose }) => {
  const { user } = useContext(AuthContext) || {};
  const { id } = useParams();
  const navigate = useNavigate();

  // STATI
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('idle');
  
  // Stato per memorizzare la lista degli agenti (non solo il numero)
  const [listaAgenti, setListaAgenti] = useState([]);

  // 1. FETCH CORRETTA: Dentro useEffect per eseguirla solo una volta al montaggio
  useEffect(() => {
    const fetchAgenti = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/agenti");
        if(res.ok) {
            const data = await res.json();
            setListaAgenti(data); // Salviamo l'array vero e proprio
        }
      } catch (err) {
        console.error("Errore caricamento agenti", err);
      }
    };
    
    fetchAgenti();
  }, []); // Array vuoto = esegui solo una volta


  const handleBack = () => {
    if (onClose) onClose();
    navigate(`/immobili/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const sqlDateTime = `${date}T${time}:00`;

    // let idAgenteSelezionato = 1; 
    
    // if (listaAgenti.length > 0) {
    //     const randomIndex = Math.floor(Math.random() * listaAgenti.length);
    //     idAgenteSelezionato = randomIndex;

    //     idAgenteSelezionato === 0 ? idAgenteSelezionato = 1 : "";
    // }

    let idAgenteReale = 1; // Fallback di sicurezza

    if (listaAgenti.length > 0) {
        const randomIndex = Math.floor(Math.random() * listaAgenti.length);
        // Assicuriamoci che l'oggetto esista e abbia la proprietà 'id'
        if (listaAgenti[randomIndex]?.id) {
            idAgenteReale = listaAgenti[randomIndex].id;
        }
    }

    const payload = {
      Id_immobile: Number(id),
      Id_utente: user?.id || 1, 
      Id_agente: idAgenteReale,
      data: sqlDateTime
    };

    console.log("Payload inviato:", payload);
    
    try {
      const response = await fetch('http://localhost:8085/api/visite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          handleBack();
        }, 2500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Errore prenotazione:", error);
      setStatus('error');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleBack();
  };

  return (
    // ... IL TUO JSX RIMANE UGUALE ...
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
              <h3 className="prenota-visita__title">Prenota una visita</h3>
              <p className="prenota-visita__subtitle">Scegli data e ora per visionare l'immobile.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="prenota-visita__form">
              <div className="prenota-visita__group">
                <label className="prenota-visita__label">Seleziona Data</label>
                <input type="date" className="prenota-visita__input" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>

              <div className="prenota-visita__group">
                <label className="prenota-visita__label">Seleziona Orario</label>
                <input type="time" className="prenota-visita__input" required value={time} onChange={(e) => setTime(e.target.value)} min="09:00" max="19:00" />
              </div>

              {status === 'error' && (
                <p className="prenota-visita__error-msg">Errore durante la prenotazione. Riprova.</p>
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