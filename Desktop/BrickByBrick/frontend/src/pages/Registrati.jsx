import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import useSEO from '../hooks/useSEO';

import ImageRegistratiAvif from '../assets/images/avif/accedi-registrati.avif'; 
import ImageRegistratiWebp from '../assets/images/webp/accedi-registrati.webp'; 
import ImageRegistratiJpg from '../assets/images/jpg/accedi-registrati.jpg';

const Registrati = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    codice_fiscale: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.nome || !formData.cognome || !formData.email || !formData.password) {
      setError('Compila tutti i campi obbligatori');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La password deve avere almeno 6 caratteri');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono');
      return false;
    }

    if (!formData.agreeTerms) {
      setError('Devi accettare i termini e le condizioni');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8085/api/utenti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cognome: formData.cognome,
          email: formData.email,
          telefono: formData.telefono || null,
          codice_fiscale: formData.codice_fiscale || null,
          passw: formData.password,
          id_ruolo: 3 // Ruolo CLIENT
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Errore durante la registrazione');
      }

      setSuccess('Registrazione completata! Reindirizzamento al login...');
      
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Registrazione completata! Accedi con le tue credenziali.' } 
        });
      }, 2000);
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  };

  useSEO({
    title: "Registrati - Crea un nuovo account",
    description: "Iscriviti a Immobiliaris. Crea il tuo profilo gratuito per salvare ricerche, ricevere notifiche sui nuovi immobili e richiedere valutazioni.",
    noindex: true
  })

  return (
    <>
    <div className="register">
      <div className="register__container">
        {/* SEZIONE IMMAGINE */}
        <div className="register__image-section">

          <picture>
            <source srcSet={ImageRegistratiAvif} type="image/avif" />
            <source srcSet={ImageRegistratiWebp} type="image/webp" />
            <img src={ImageRegistratiJpg} alt="Interior Design" className="register__image" loading="eager" fetchPriority="high" width="960" height="1080" />
          </picture>
        </div>

        {/* SEZIONE FORM */}
        <div className="register__form-section">
          <div className="register__form-wrapper">
            
            {/* BOTTONE INDIETRO */}
            <button 
              type="button" 
              className="register__back-btn" 
              onClick={() => navigate("/")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Indietro
            </button>

            <h1 className="register__title">Registrati</h1>
            <p className="register__subtitle">Crea un nuovo account</p>

            {error && <div className="register__error">{error}</div>}
            {success && <div className="register__success">{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* NOME E COGNOME */}
              <div className="register__row">
                <div className="register__form-group">
                  <label htmlFor="nome" className="register__label">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="register__input"
                    placeholder="es. Andrea"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="register__form-group">
                  <label htmlFor="cognome" className="register__label">Cognome *</label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    className="register__input"
                    placeholder="es. Rossi"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="register__form-group">
                <label htmlFor="email" className="register__label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="register__input"
                  placeholder="es. andrea@email.it"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* TELEFONO E CODICE FISCALE */}
              <div className="register__row">
                <div className="register__form-group">
                  <label htmlFor="telefono" className="register__label">Telefono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="register__input"
                    placeholder="es. 333 1234567"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="register__form-group">
                  <label htmlFor="codice_fiscale" className="register__label">Codice Fiscale</label>
                  <input
                    type="text"
                    id="codice_fiscale"
                    name="codice_fiscale"
                    className="register__input"
                    placeholder="es. RVAAND98A01H501J"
                    value={formData.codice_fiscale}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="register__form-group">
                <label htmlFor="password" className="register__label">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="register__input"
                  placeholder="Crea una password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="register__form-group">
                <label htmlFor="confirmPassword" className="register__label">Conferma Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="register__input"
                  placeholder="Ripeti la password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* CHECKBOX TERMINI */}
              <label className="register__checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <span>Accetto i <a href="#">termini e le condizioni</a> e l'<a href="#">informativa sulla privacy</a></span>
              </label>

              {/* BUTTON */}
              <button 
                type="submit" 
                className="register__button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="register__loading"></span>
                    {' '}Registrazione in corso...
                  </>
                ) : (
                  'Crea un account'
                )}
              </button>

              {/* LOGIN */}
              <p className="register__login-text">
                Hai già un account? <Link to="/login">Login</Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Registrati;