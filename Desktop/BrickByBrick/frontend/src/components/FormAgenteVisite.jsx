/**
 * @fileoverview Form per la modifica delle visite da parte dell'agente.
 * Permette solo modifica data/ora, non creazione nuove visite.
 * 
 * @module FormAgenteVisite
 * @requires react
 * @requires react-router-dom
 * @requires ./ConfirmModal
 * @requires ../hooks/UseConfirmModal
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';

/** @constant {string} URL base per le chiamate API */
const API_BASE_URL = 'http://localhost:8085';

/**
 * Stato iniziale del form visita
 * @constant {Object}
 */
const initialFormData = {
    id_immobile: '',
    id_agente: '',
    id_utente: '',
    data: ''
};

/**
 * Form per modificare una visita esistente
 * 
 * Limitazioni:
 * - Solo modifica (no creazione)
 * - L'agente può modificare solo data/ora della visita
 * - ID immobile, agente e utente non modificabili
 * 
 * @component
 * @returns {JSX.Element} Form per modifica visita
 * 
 * @example
 * <Route path="/agente/visite/modifica/:id" element={<FormAgenteVisite />} />
 */
const FormAgenteVisite = () => {
    const navigate = useNavigate();
    const { id: visitaId } = useParams();
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    // Carica visita esistente
    const getVisitaById = useCallback(async (id) => {
        const url = `${API_BASE_URL}/api/visite/${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Impossibile trovare la visita ${id}`);
        return await response.json();
    }, []);

    // Salva visita (PUT)
    const saveVisita = useCallback(async (visitaId, payload) => {
        const url = `${API_BASE_URL}/api/visite/edit/${visitaId}`;
        const response = await fetch(url, {
            method: 'PUT',
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

        if (!formData.data) {
            newErrors.data = 'Data e ora obbligatorie';
        } else {
            // Verifica che la data sia nel futuro
            const dataVisita = new Date(formData.data);
            const ora = new Date();
            if (dataVisita < ora) {
                newErrors.data = 'La data deve essere nel futuro';
            }
        }

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
                if (visitaId) {
                    const visita = await getVisitaById(visitaId);
                    
                    // Converti la data dal formato backend (LocalDateTime) a formato input datetime-local
                    let dataFormatted = '';
                    if (visita.data) {
                        // Assumendo che arrivi come "2024-12-15T10:30:00"
                        dataFormatted = visita.data.slice(0, 16); // Prende solo YYYY-MM-DDTHH:mm
                    }

                    setFormData({
                        id_immobile: String(visita.id_immobile || visita.Id_immobile),
                        id_agente: String(visita.id_agente || visita.Id_agente),
                        id_utente: String(visita.id_utente || visita.Id_utente),
                        data: dataFormatted
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
                navigate('/agente/visite');
            } finally {
                setIsDataLoading(false);
            }
        };

        loadData();
    }, [visitaId, navigate, getVisitaById]);

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
            // Converti la data in formato ISO per il backend
            const dataISO = new Date(formData.data).toISOString();

            const payload = {
                id_immobile: parseInt(formData.id_immobile),
                id_agente: parseInt(formData.id_agente),
                id_utente: parseInt(formData.id_utente),
                data: dataISO
            };

            await saveVisita(visitaId, payload);

            await showConfirm({
                title: 'Successo',
                message: ' Visita aggiornata con successo!',
                type: 'success',
                confirmText: 'OK',
                showCancel: false
            });
            navigate('/agente/visite');
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
                <div className="data-status-message loading">
                    Caricamento dati in corso...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <h1> Modifica Visita</h1>
                <p>Modifica la data e ora della visita programmata</p>
            </header>

            {apiError && (
                <div className="data-status-message error">
                    <strong> Attenzione:</strong> {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">
                {/* ID Immobile (Read-only) */}
                <div className="form-group">
                    <label htmlFor="id_immobile"> ID Immobile</label>
                    <input
                        type="text"
                        id="id_immobile"
                        name="id_immobile"
                        value={formData.id_immobile}
                        disabled
                        readOnly
                    />
                    <small style={{ color: '#6b7280', fontSize: '12px' }}>
                        Campo non modificabile
                    </small>
                </div>

                {/* ID Utente (Read-only) */}
                <div className="form-group">
                    <label htmlFor="id_utente">👤 ID Utente</label>
                    <input
                        type="text"
                        id="id_utente"
                        name="id_utente"
                        value={formData.id_utente}
                        disabled
                        readOnly
                    />
                    <small style={{ color: '#6b7280', fontSize: '12px' }}>
                        Campo non modificabile
                    </small>
                </div>

                {/* Data e Ora (Modificabile) */}
                <div className="form-group">
                    <label htmlFor="data"> Data e Ora Visita *</label>
                    <input
                        type="datetime-local"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        disabled={isFormLoading}
                        min={new Date().toISOString().slice(0, 16)}
                    />
                    {errors.data && <span className="error-text">{errors.data}</span>}
                </div>

                {/* Pulsanti */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isFormLoading}
                    >
                         Salva Modifiche
                    </button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate('/agente/visite')}
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

export default FormAgenteVisite;
