// AddAgentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Usa le tue classi SCSS per lo stile del form
// import './your-scss-file.scss'; 
import {users as utenti} from '../dati_fittizzi/users'

const AddAgentPage = () => {
  const navigate = useNavigate();
  // Qui puoi gestire lo stato del form per i vari input
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    cittaOperativa: '',
    sesso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dati inviati (in una vera app li invieresti al backend):', formData);

     // 1. Crea il nuovo oggetto utente completo
    const newAgent = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        status: 'Offline',
        cittaOperativa: formData.cittaOperativa,
        sesso: formData.sesso,
    };
    
    // 2. Aggiunge l'utente all'array fittizio importato (l'hack)
    utenti.push(newAgent);
    
    // Dopo aver salvato i dati con successo, torna alla pagina di gestione utenti
    navigate('/admin/utenti'); 
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
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="cognome">Cognome</label>
              <input type="text" id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Numero telefono</label>
              <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="cittaOperativa">Città operativa</label>
              <input type="text" id="cittaOperativa" name="cittaOperativa" value={formData.cittaOperativa} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="sesso">Sesso</label>
              <select id="sesso" name="sesso" value={formData.sesso} onChange={handleChange}>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="add-agent-submit-btn">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentPage;
