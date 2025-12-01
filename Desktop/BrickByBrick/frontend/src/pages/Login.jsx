import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthData } from '../providers/AuthContextProvider';

import useSEO from '../hooks/useSEO';


import ImageLoginAvif from '../assets/images/avif/accedi-registrati.avif'; 
import ImageLoginWebp from '../assets/images/webp/accedi-registrati.webp'; 
import ImageLoginJpg from '../assets/images/jpg/accedi-registrati.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthData();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Se il login è riuscito, redirect basato sul ruolo
      if (result.user.role === 'ADMIN') {
        navigate('/dashboard');
      } else if (result.user.role === 'AGENTE') {
        navigate('/dashboard/agente');
      } else {
        navigate('/valuta-immobile');
      }
    } catch (err) {
      setError(err.message || 'Errore durante il login');
      setLoading(false);
    }
  };

    useSEO({
    title: "Accedi all'Area Riservata",
    description: "Effettua il login su Immobiliaris per gestire i tuoi annunci, consultare le valutazioni salvate e monitorare i tuoi preferiti.",
    noindex: true
  })

  return (
    <>
    <div className="login">
      <div className="login__container">
        {/* SEZIONE IMMAGINE */}
        <div className="login__image-section">
          <picture>
            <source srcSet={ImageLoginAvif} type="image/avif" />
            <source srcSet={ImageLoginWebp} type="image/webp" />
            <img src={ImageLoginJpg} alt="Interior Design" className="register__image" loading="eager" fetchPriority="high" width="960" height="1080"/>
          </picture>
        </div>

        {/* SEZIONE FORM */}
        <div className="login__form-section">
          <div className="login__form-wrapper">

            <button 
              type="button" 
              className="login__back-btn" 
              onClick={() => navigate("/")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Indietro
            </button>

            <h1 className="login__title">Accedi</h1>
            <p className="login__subtitle">Accedi al tuo account</p>

            {error && <div className="login__error">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="login__form-group">
                <label htmlFor="email" className="login__label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="login__input"
                  placeholder="Inserisci la tua email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* PASSWORD */}
              <div className="login__form-group">
                <label htmlFor="password" className="login__label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="login__input"
                  placeholder="Inserisci la tua password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* REMEMBER & FORGOT */}
              <div className="login__checkbox-group">
                <label className="login__checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span>Ricordami</span>
                </label>
                <a href="#" className="login__forgot-link">Password dimenticata?</a>
              </div>

              {/* BUTTON */}
              <button 
                type="submit" 
                className="login__button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login__loading"></span>
                    {' '}Accesso in corso...
                  </>
                ) : (
                  'Accedi'
                )}
              </button>
            </form>

            {/* REGISTRAZIONE */}
            <p className="login__register-text">
              Non hai un account? <Link to="/registrati">Registrati</Link>
            </p>


          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;