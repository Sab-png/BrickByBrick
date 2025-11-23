import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { immobiliFittizi } from '../dati_fittizzi/immobili';
import '../../styles/pages/_addImmobile.scss';

const AddImmobile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Funzione helper per estrarre il valore numerico da stringhe come "85 m²"
  const extractNumber = (value) => {
    if (!value) return '';
    const match = value.toString().match(/\d+/);
    return match ? match[0] : value;
  };

  const [formData, setFormData] = useState({
    titolo: '',
    indirizzo: '',
    citta: '',
    prezzo: '',
    mq: '',
    locali: '',
    foto: '',
    status: 'Disponibile',
    descrizione: '',
    tipologia: 'Appartamento',
    bagni: '',
    piano: '',
    annoCostruzione: '',
    riscaldamento: 'Autonomo',
    classeEnergetica: 'A',
    balconi: '',
    box: 'No',
    arredato: 'No'
  });

  // Carica i dati dell'immobile in modalità edit
  useEffect(() => {
    if (isEditMode) {
      const immobile = immobiliFittizi.find(i => i.id === parseInt(id));
      if (immobile) {
        setFormData({
          titolo: immobile.titolo || '',
          indirizzo: immobile.indirizzo || '',
          citta: immobile.citta || '',
          prezzo: extractNumber(immobile.prezzo) || '',
          mq: extractNumber(immobile.mq) || '',
          locali: extractNumber(immobile.locali) || '',
          foto: immobile.foto || '',
          status: immobile.status || 'Disponibile',
          descrizione: immobile.descrizione || '',
          tipologia: immobile.tipologia || 'Appartamento',
          bagni: immobile.bagni || '',
          piano: immobile.piano || '',
          annoCostruzione: immobile.annoCostruzione || '',
          riscaldamento: immobile.riscaldamento || 'Autonomo',
          classeEnergetica: immobile.classeEnergetica || 'A',
          balconi: immobile.balconi || '',
          box: immobile.box || 'No',
          arredato: immobile.arredato || 'No'
        });
      } else {
        alert('Immobile non trovato');
        navigate('/admin/immobili');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const immobileData = {
      titolo: formData.titolo,
      indirizzo: formData.indirizzo,
      citta: formData.citta,
      prezzo: formData.prezzo.includes('€') ? formData.prezzo : `${formData.prezzo} €`,
      mq: formData.mq.includes('m²') ? formData.mq : `${formData.mq} m²`,
      locali: formData.locali.includes('locali') ? formData.locali : `${formData.locali} locali`,
      foto: formData.foto || 'https://via.placeholder.com/150',
      status: formData.status,
      descrizione: formData.descrizione,
      tipologia: formData.tipologia,
      bagni: formData.bagni,
      piano: formData.piano,
      annoCostruzione: formData.annoCostruzione,
      riscaldamento: formData.riscaldamento,
      classeEnergetica: formData.classeEnergetica,
      balconi: formData.balconi,
      box: formData.box,
      arredato: formData.arredato
    };

    if (isEditMode) {
      // Modifica immobile esistente
      const index = immobiliFittizi.findIndex(i => i.id === parseInt(id));
      if (index !== -1) {
        immobiliFittizi[index] = {
          ...immobiliFittizi[index],
          ...immobileData
        };
        console.log('Immobile modificato:', immobiliFittizi[index]);
        alert('Immobile modificato con successo!');
      }
    } else {
      // Crea nuovo immobile
      const newImmobile = {
        id: Math.max(...immobiliFittizi.map(i => i.id), 0) + 1,
        ...immobileData
      };
      immobiliFittizi.push(newImmobile);
      console.log('Nuovo immobile aggiunto:', newImmobile);
      alert('Immobile aggiunto con successo!');
    }

    // Torna alla pagina di gestione immobili
    navigate('/admin/immobili');
  };

  const handleCancel = () => {
    navigate('/admin/immobili');
  };

  return (
    <div className="add-immobile-container">
      <div className="add-immobile-header">
        <h1>{isEditMode ? 'Modifica Immobile' : 'Aggiungi Nuovo Immobile'}</h1>
        <button onClick={handleCancel} className="back-button">
          ← Torna alla lista
        </button>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>

          {/* Sezione foto */}
          <div className="section-title">Immagine immobile</div>
          <div className="photo-upload-section">
            <div className="photo-placeholder">
              📷
            </div>
            <div className="upload-info">
              <label htmlFor="foto">URL Foto</label>
              <input
                type="text"
                id="foto"
                name="foto"
                value={formData.foto}
                onChange={handleChange}
                placeholder="https://esempio.com/immagine.jpg"
              />
            </div>
          </div>

          {/* Informazioni base */}
          <div className="section-title">Informazioni base</div>
          <div className="form-grid">
            <div className="form-field full-width">
              <label htmlFor="titolo">Titolo annuncio *</label>
              <input
                type="text"
                id="titolo"
                name="titolo"
                value={formData.titolo}
                onChange={handleChange}
                placeholder="Es: Appartamento moderno centro"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="tipologia">Tipologia *</label>
              <select
                id="tipologia"
                name="tipologia"
                value={formData.tipologia}
                onChange={handleChange}
                required
              >
                <option value="Appartamento">Appartamento</option>
                <option value="Villa">Villa</option>
                <option value="Attico">Attico</option>
                <option value="Loft">Loft</option>
                <option value="Bilocale">Bilocale</option>
                <option value="Trilocale">Trilocale</option>
                <option value="Quadrilocale">Quadrilocale</option>
                <option value="Monolocale">Monolocale</option>
                <option value="Casa indipendente">Casa indipendente</option>
                <option value="Mansarda">Mansarda</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="status">Stato *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Disponibile">Disponibile</option>
                <option value="Prenotato">Prenotato</option>
                <option value="Venduto">Venduto</option>
              </select>
            </div>
          </div>

          {/* Localizzazione */}
          <div className="section-title">Localizzazione</div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="indirizzo">Indirizzo *</label>
              <input
                type="text"
                id="indirizzo"
                name="indirizzo"
                value={formData.indirizzo}
                onChange={handleChange}
                placeholder="Via Roma 123"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="citta">Città *</label>
              <input
                type="text"
                id="citta"
                name="citta"
                value={formData.citta}
                onChange={handleChange}
                placeholder="Milano"
                required
              />
            </div>
          </div>

          {/* Caratteristiche principali */}
          <div className="section-title">Caratteristiche principali</div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="prezzo">Prezzo (€) *</label>
              <input
                type="text"
                id="prezzo"
                name="prezzo"
                value={formData.prezzo}
                onChange={handleChange}
                placeholder="250.000"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="mq">Metri quadri *</label>
              <input
                type="number"
                id="mq"
                name="mq"
                value={formData.mq}
                onChange={handleChange}
                placeholder="85"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="locali">Numero locali *</label>
              <input
                type="number"
                id="locali"
                name="locali"
                value={formData.locali}
                onChange={handleChange}
                placeholder="3"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="bagni">Numero bagni</label>
              <input
                type="number"
                id="bagni"
                name="bagni"
                value={formData.bagni}
                onChange={handleChange}
                placeholder="2"
              />
            </div>

            <div className="form-field">
              <label htmlFor="piano">Piano</label>
              <input
                type="text"
                id="piano"
                name="piano"
                value={formData.piano}
                onChange={handleChange}
                placeholder="3"
              />
            </div>

            <div className="form-field">
              <label htmlFor="balconi">Numero balconi</label>
              <input
                type="number"
                id="balconi"
                name="balconi"
                value={formData.balconi}
                onChange={handleChange}
                placeholder="1"
              />
            </div>
          </div>

          {/* Dettagli immobile */}
          <div className="section-title">Dettagli immobile</div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="annoCostruzione">Anno costruzione</label>
              <input
                type="number"
                id="annoCostruzione"
                name="annoCostruzione"
                value={formData.annoCostruzione}
                onChange={handleChange}
                placeholder="2020"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-field">
              <label htmlFor="riscaldamento">Riscaldamento</label>
              <select
                id="riscaldamento"
                name="riscaldamento"
                value={formData.riscaldamento}
                onChange={handleChange}
              >
                <option value="Autonomo">Autonomo</option>
                <option value="Centralizzato">Centralizzato</option>
                <option value="Non presente">Non presente</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="classeEnergetica">Classe energetica</label>
              <select
                id="classeEnergetica"
                name="classeEnergetica"
                value={formData.classeEnergetica}
                onChange={handleChange}
              >
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="box">Box auto</label>
              <select
                id="box"
                name="box"
                value={formData.box}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Sì">Sì</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="arredato">Arredato</label>
              <select
                id="arredato"
                name="arredato"
                value={formData.arredato}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Sì">Sì</option>
                <option value="Parzialmente">Parzialmente</option>
              </select>
            </div>
          </div>

          {/* Descrizione */}
          <div className="section-title">Descrizione</div>
          <div className="form-field full-width">
            <label htmlFor="descrizione">Descrizione dettagliata</label>
            <textarea
              id="descrizione"
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              rows="6"
              placeholder="Inserisci una descrizione dettagliata dell'immobile..."
            />
          </div>

          {/* Pulsanti azione */}
          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-button">
              Annulla
            </button>
            <button type="submit" className="submit-button">
              {isEditMode ? 'Salva Modifiche' : 'Aggiungi Immobile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImmobile;
