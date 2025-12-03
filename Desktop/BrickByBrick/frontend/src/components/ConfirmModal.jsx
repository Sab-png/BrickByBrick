/**
 * @fileoverview Componente modale riutilizzabile per conferme e notifiche.
 * Supporta 4 tipi (danger, warning, success, info) con stili e icone dedicate.
 * 
 * @module ConfirmModal
 * @requires react
 */

import React, { useEffect } from 'react';

/**
 * Componente Modale Riutilizzabile
 * 
 * Caratteristiche:
 * - 4 varianti di stile: danger, warning, success, info
 * - Chiusura con ESC o click overlay
 * - Blocco scroll body quando aperto
 * - Supporto pulsante singolo o doppio
 * - Icone SVG personalizzate per tipo
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {boolean} props.isOpen - Controlla la visibilità del modale
 * @param {Function} props.onClose - Callback per chiudere il modale
 * @param {string} [props.title='Conferma'] - Titolo del modale
 * @param {string} props.message - Messaggio principale
 * @param {Function} props.onConfirm - Callback per conferma
 * @param {string} [props.confirmText='Conferma'] - Testo pulsante conferma
 * @param {string} [props.cancelText='Annulla'] - Testo pulsante annulla
 * @param {'danger'|'warning'|'success'|'info'} [props.type='info'] - Tipo modale
 * @param {boolean} [props.showCancel=true] - Mostra pulsante annulla
 * @returns {JSX.Element|null} Modale o null se chiuso
 * 
 * @example
 * // Modale di conferma eliminazione
 * <ConfirmModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConfirm={handleDelete}
 *   title="Conferma Eliminazione"
 *   message="Sei sicuro di voler eliminare?"
 *   type="danger"
 *   confirmText="Elimina"
 * />
 * 
 * @example
 * // Modale di notifica (solo conferma)
 * <ConfirmModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConfirm={handleClose}
 *   title="Successo"
 *   message="Operazione completata!"
 *   type="success"
 *   showCancel={false}
 * />
 */
const ConfirmModal = ({
    isOpen,
    onClose,
    title = 'Conferma',
    message,
    onConfirm,
    confirmText = 'Conferma',
    cancelText = 'Annulla',
    type = 'info',
    showCancel = true
}) => {
    // Gestisce la chiusura con ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Icone per ogni tipo
    const icons = {
        danger: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        ),
        warning: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        ),
        success: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 12 15 16 10"></polyline>
            </svg>
        ),
        info: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
        )
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={`modal-container modal-${type}`}>
                <div className="modal-icon">
                    {icons[type] || icons.info}
                </div>

                <div className="modal-content">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-message">{message}</p>
                </div>

                <div className="modal-actions">
                    {showCancel && (
                        <button 
                            className="modal-btn modal-btn-cancel" 
                            onClick={onClose}
                            type="button"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button 
                        className={`modal-btn modal-btn-confirm modal-btn-${type}`}
                        onClick={handleConfirm}
                        type="button"
                        autoFocus
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
