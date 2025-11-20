import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { users as agenti } from '../dati_fittizzi/users';

const ModifyAgent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    cittaOperativa: '',
    sesso: ''
  });

  useEffect(() => {
    const agent = agenti.find(a => a.id === id);
    if (!agent) return;
    const names = (agent.fullName || '').split(' ');
    const nome = names.shift() || '';
    const cognome = names.join(' ') || '';
    setFormData({
      nome,
      cognome,
      email: agent.email || '',
      telefono: agent.phone || '',
      cittaOperativa: agent.cittaOperativa || '',
      sesso: agent.sesso || ''
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const index = agenti.findIndex(a => a.id === id);
    if (index === -1) return navigate('/admin/gestione-utenti');

    agenti[index] = {
      ...agenti[index],
      fullName: `${formData.nome} ${formData.cognome}`,
      email: formData.email,
      phone: formData.telefono,
      cittaOperativa: formData.cittaOperativa,
      sesso: formData.sesso
    };

    navigate('/admin/gestione-utenti');
  };

  if (!agenti.find(a => a.id === id)) {
    return (
      <div className="modify-agent-page">
        <h2>Agente non trovato</h2>
        <button onClick={() => navigate('/admin/gestione-utenti')}>Torna agli agenti</button>
      </div>
    );
  }

  return (
    <div className="modify-agent-page">
      <h1>Modifica agente</h1>
      <div className="form-card">
        <form onSubmit={handleSave}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" value={formData.nome} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="cognome">Cognome</label>
              <input id="cognome" name="cognome" value={formData.cognome} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Telefono</label>
              <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="cittaOperativa">Città operativa</label>
              <input id="cittaOperativa" name="cittaOperativa" value={formData.cittaOperativa} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="sesso">Sesso</label>
              <select id="sesso" name="sesso" value={formData.sesso} onChange={handleChange}>
                <option value="">Seleziona sesso</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Salva</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin/gestione-utenti')}>Indietro</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyAgent;
