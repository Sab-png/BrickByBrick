import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';

const API_BASE_URL = 'http://localhost:8085';

const initialFormData = {
    id_utente: '',
    id_immobile: '',
    data_di_scadenza: '',
    prezzo: ''
};

/**
 * Form Unificato per Contratti Esclusivi
 * Gestisce 3 modalità:
 * - 'add': crea nuovo contratto (contrattoId assente)
 * - 'edit': modifica contratto esistente (contrattoId presente)
 */
const AdminContrattoForm = () => {
    const navigate = useNavigate();
    const { id: contrattoId } = useParams();
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();
    
    // Rileva automaticamente il mode: se c'è un ID nell'URL è edit, altrimenti add
    const mode = contrattoId ? 'edit' : 'add';

    const [formData, setFormData] = useState(initialFormData);
    const [utentiList, setUtentiList] = useState([]);
    const [immobiliList, setImmobiliList] = useState([]);
    const [errors, setErrors] = useState({});
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    // Carica lista utenti
    const fetchUtenti = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/utenti`);
            if (!response.ok) throw new Error('Errore nel caricamento utenti');
            const data = await response.json();
            setUtentiList(data);
        } catch (error) {
            console.error('Errore caricamento utenti:', error);
            setApiError('Impossibile caricare la lista utenti');
        }
    }, []);

    // Carica lista immobili
    const fetchImmobili = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/immobili`);
            if (!response.ok) throw new Error('Errore nel caricamento immobili');
            const data = await response.json();
            setImmobiliList(data);
        } catch (error) {
            console.error('Errore caricamento immobili:', error);
            setApiError('Impossibile caricare la lista immobili');
        }
    }, []);

    // Carica contratto esistente (per modalità edit)
    const getContrattoById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/contratti/${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Impossibile trovare il contratto ${id}`);
        return await response.json();
    }, []);

    // Salva contratto (POST o PUT)
    const saveContratto = useCallback(async (contrattoId, payload, mode) => {
        let url = '';
        let method = '';
        
        if (mode === 'add') {
            url = `${API_BASE_URL}/api/contratti`;
            method = 'POST';
        } else {
            url = `${API_BASE_URL}/api/contratti/edit/${contrattoId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Salvataggio fallito: ${response.status} - ${errorText}`);
        }
    }, []);

    // Validazione
    const validateForm = useCallback(() => {
        const newErrors = {};
        
        if (!formData.id_utente) newErrors.id_utente = 'Seleziona un utente';
        if (!formData.id_immobile) newErrors.id_immobile = 'Seleziona un immobile';
        if (!formData.data_di_scadenza) newErrors.data_di_scadenza = 'Data di scadenza obbligatoria';
        if (!formData.prezzo || parseFloat(formData.prezzo) <= 0) newErrors.prezzo = 'Prezzo obbligatorio e maggiore di 0';
        
        return newErrors;
    }, [formData]);

    // Gestione campi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setApiError(null);
    };

    // Caricamento dati iniziali
    useEffect(() => {
        const loadData = async () => {
            setIsDataLoading(true);
            setApiError(null);

            try {
                // Carica sempre liste utenti e immobili
                await Promise.all([fetchUtenti(), fetchImmobili()]);
                
                // Se in modalità edit, carica anche il contratto esistente
                if (mode === 'edit' && contrattoId) {
                    const contratto = await getContrattoById(contrattoId);
                    setFormData({
                        id_utente: String(contratto.id_utente || contratto.Id_utente),
                        id_immobile: String(contratto.id_immobile || contratto.Id_immobile),
                        data_di_scadenza: contratto.data_di_scadenza || '',
                        prezzo: contratto.prezzo || ''
                    });
                }
            } catch (error) {
                console.error(error);
                const errorMsg = error.message;
                setApiError(errorMsg);
                await showConfirm({
                    title: 'Errore Caricamento',
                    message: errorMsg,
                    type: 'danger',
                    confirmText: 'OK',
                    showCancel: false
                });
                navigate('/admin/contratti');
            } finally {
                setIsDataLoading(false);
            }
        };

        loadData();
    }, [mode, contrattoId, navigate, fetchUtenti, fetchImmobili, getContrattoById]);

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsFormLoading(true);
        setApiError(null);

        try {
            const payload = {
                id_utente: parseInt(formData.id_utente),
                id_immobile: parseInt(formData.id_immobile),
                data_di_scadenza: formData.data_di_scadenza,
                prezzo: formData.prezzo
            };

            await saveContratto(contrattoId, payload, mode);
            
            await showConfirm({
                title: 'Successo',
                message: mode === 'add' ? 'Contratto creato con successo!' : 'Contratto aggiornato con successo!',
                type: 'success',
                confirmText: 'OK',
                showCancel: false
            });
            navigate('/admin/contratti');
        } catch (error) {
            console.error('Errore salvataggio:', error);
            const errorMsg = error.message;
            setApiError(errorMsg);
            await showConfirm({
                title: 'Errore',
                message: errorMsg,
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
        } finally {
            setIsFormLoading(false);
        }
    };

    if (isDataLoading) {
        return (
            <div className="admin-page-container">
                <div className="data-status-message loading-message">
                    Caricamento dati in corso...
                </div>
            </div>
        );
    }

    // Trova utente e immobile selezionati per mostrare info
    const utenteSelezionato = utentiList.find(u => 
        String(u.id_utente || u.Id_utente) === String(formData.id_utente)
    );
    const immobileSelezionato = immobiliList.find(i => 
        String(i.id_immobile || i.Id_immobile) === String(formData.id_immobile)
    );

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <h1>{mode === 'add' ? 'Nuovo Contratto Esclusivo' : 'Modifica Contratto'}</h1>
                <p>{mode === 'add' ? 'Crea un nuovo contratto selezionando utente e immobile' : 'Modifica i dettagli del contratto esistente'}</p>
            </header>

            {apiError && (
                <div className="data-status-message error-message">
                    <strong>Attenzione:</strong> {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">
                {/* Selezione Utente */}
                <div className="form-group">
                    <label htmlFor="id_utente">Seleziona Utente *</label>
                    <select
                        id="id_utente"
                        name="id_utente"
                        value={formData.id_utente}
                        onChange={handleChange}
                        disabled={isFormLoading}
                    >
                        <option value="">-- Seleziona un utente --</option>
                        {utentiList.map((utente) => {
                            const id = utente.id_utente || utente.Id_utente;
                            return (
                                <option key={id} value={id}>
                                    {utente.nome} {utente.cognome} - {utente.email} (ID: {id})
                                </option>
                            );
                        })}
                    </select>
                    {errors.id_utente && <span className="error-text">{errors.id_utente}</span>}
                    {utenteSelezionato && (
                        <div className="info-preview" style={{ 
                            marginTop: '10px', 
                            padding: '10px', 
                            background: '#f0f8ff', 
                            borderRadius: '5px',
                            fontSize: '0.9em'
                        }}>
                            <strong>Utente selezionato:</strong> {utenteSelezionato.nome} {utenteSelezionato.cognome}<br/>
                            <strong>Email:</strong> {utenteSelezionato.email}<br/>
                            <strong>Telefono:</strong> {utenteSelezionato.telefono || 'N/A'}
                        </div>
                    )}
                </div>

                {/* Selezione Immobile */}
                <div className="form-group">
                    <label htmlFor="id_immobile">Seleziona Immobile *</label>
                    <select
                        id="id_immobile"
                        name="id_immobile"
                        value={formData.id_immobile}
                        onChange={handleChange}
                        disabled={isFormLoading}
                    >
                        <option value="">-- Seleziona un immobile --</option>
                        {immobiliList.map((immobile) => {
                            const id = immobile.id_immobile || immobile.Id_immobile;
                            return (
                                <option key={id} value={id}>
                                    {immobile.indirizzo}, {immobile.citta} - €{immobile.prezzo} (ID: {id})
                                </option>
                            );
                        })}
                    </select>
                    {errors.id_immobile && <span className="error-text">{errors.id_immobile}</span>}
                    {immobileSelezionato && (
                        <div className="info-preview" style={{ 
                            marginTop: '10px', 
                            padding: '10px', 
                            background: '#f0fff0', 
                            borderRadius: '5px',
                            fontSize: '0.9em'
                        }}>
                            <strong>Immobile selezionato:</strong> {immobileSelezionato.indirizzo}<br/>
                            <strong>Città:</strong> {immobileSelezionato.citta}<br/>
                            <strong>Prezzo:</strong> €{immobileSelezionato.prezzo}<br/>
                            <strong>Superficie:</strong> {immobileSelezionato.superficie}m² - {immobileSelezionato.locali} locali
                        </div>
                    )}
                </div>

                {/* Data Scadenza */}
                <div className="form-group">
                    <label htmlFor="data_di_scadenza">Data di Scadenza *</label>
                    <input
                        type="date"
                        id="data_di_scadenza"
                        name="data_di_scadenza"
                        value={formData.data_di_scadenza}
                        onChange={handleChange}
                        disabled={isFormLoading}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.data_di_scadenza && <span className="error-text">{errors.data_di_scadenza}</span>}
                </div>

                {/* Prezzo */}
                <div className="form-group">
                    <label htmlFor="prezzo">Prezzo Contratto €</label>
                    <input
                        type="text"
                        id="prezzo"
                        name="prezzo"
                        value={formData.prezzo}
                        onChange={handleChange}
                        disabled={isFormLoading}
                        placeholder="Es: 150000"
                    />
                    {errors.prezzo && <span className="error-text">{errors.prezzo}</span>}
                </div>

                {/* Pulsanti */}
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isFormLoading}
                    >
                        {mode === 'add' ? 'Crea Contratto' : 'Salva Modifiche'}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate('/admin/contratti')}
                        disabled={isFormLoading}
                    >
                        Annulla
                    </button>
                </div>
            </form>
            
            <ConfirmModal
                isOpen={modalState.isOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                showCancel={modalState.showCancel}
            />
        </div>
    );
};

export default AdminContrattoForm;
