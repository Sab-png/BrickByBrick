// AddAgentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Usa le tue classi SCSS per lo stile del form
// import './your-scss-file.scss'; 
import { users as agenti } from '../dati_fittizzi/users'

const AddAgentPage = () => {
  const navigate = useNavigate();

  // Stato per i dati del form
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    cittaOperativa: '',
    sesso: ''
  });

  // Stato per gli errori di validazione
  const [errors, setErrors] = useState({});

  // Regex di validazione per ogni campo
  const validationRules = {
    nome: {
      regex: /^[a-zA-Z\s']{2,50}$/,
      message: 'Il nome deve contenere solo lettere e spazi (2-50 caratteri)'
    },
    cognome: {
      regex: /^[a-zA-Z\s']{2,50}$/,
      message: 'Il cognome deve contenere solo lettere e spazi (2-50 caratteri)'
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email non valida'
    },
    telefono: {
      regex: /^[0-9\s\+\-\(\)]{9,20}$/,
      message: 'Numero telefono non valido (almeno 9 cifre)'
    },
    cittaOperativa: {
      regex: /^[a-zA-Z\s']{2,50}$/,
      message: 'La città deve contenere solo lettere e spazi (2-50 caratteri)'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Funzione di validazione
  const validateForm = () => {
    const newErrors = {};

    // Validazione nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio';
    } else if (!validationRules.nome.regex.test(formData.nome)) {
      newErrors.nome = validationRules.nome.message;
    }

    // Validazione cognome
    if (!formData.cognome.trim()) {
      newErrors.cognome = 'Il cognome è obbligatorio';
    } else if (!validationRules.cognome.regex.test(formData.cognome)) {
      newErrors.cognome = validationRules.cognome.message;
    }

    // Validazione email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!validationRules.email.regex.test(formData.email)) {
      newErrors.email = validationRules.email.message;
    }

    // Validazione telefono
    if (formData.telefono.trim() && !validationRules.telefono.regex.test(formData.telefono)) {
      newErrors.telefono = validationRules.telefono.message;
    }

    // Validazione città operativa
    if (formData.cittaOperativa.trim() && !validationRules.cittaOperativa.regex.test(formData.cittaOperativa)) {
      newErrors.cittaOperativa = validationRules.cittaOperativa.message;
    }

    // Validazione sesso
    if (!formData.sesso) {
      newErrors.sesso = 'Seleziona il sesso';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida il form
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se la validazione passa, crea il nuovo agente
    const newAgent = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      fullName: `${formData.nome} ${formData.cognome}`,
      email: formData.email,
      phone: formData.telefono,
      status: 'Offline',
      cittaOperativa: formData.cittaOperativa,
      sesso: formData.sesso,
    };

    // Aggiunge l'utente all'array fittizio
    agenti.push(newAgent);

    // Naviga alla pagina di gestione utenti
    navigate('/admin/gestione-utenti');
  };

  return (
    <div className="add-agent-container"> {/* Applica qui il tuo stile SCSS */}
      <h1>Aggiungi agente</h1>

      <div className="form-card"> {/* Usa lo stile card dal file SCSS precedente */}
        <form onSubmit={handleSubmit}>
          {/* La sezione di caricamento foto (placeholders) */}
          <div className="photo-upload-section">
            <div className="photo-placeholder"> {/* Stili SCSS per l'icona e il cerchio */}
              📷
            </div>
            <p className="upload-link">Carica foto</p>
          </div>

          {/* Campi del modulo affiancati (usa flexbox o grid con SCSS) */}
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="cognome">Cognome</label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
              />
              {errors.cognome && <span className="error-message">{errors.cognome}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Numero telefono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="cittaOperativa">Città operativa</label>
              <input
                type="text"
                id="cittaOperativa"
                name="cittaOperativa"
                value={formData.cittaOperativa}
                onChange={handleChange}
              />
              {errors.cittaOperativa && <span className="error-message">{errors.cittaOperativa}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="sesso">Sesso</label>
              <select
                id="sesso"
                name="sesso"
                value={formData.sesso}
                onChange={handleChange}
              >
                <option value="">Seleziona sesso</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
              {errors.sesso && <span className="error-message">{errors.sesso}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-agent-submit-btn">
              Aggiungi
            </button>
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate('/admin/gestione-utenti')}
            >
              Indietro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentPage;
