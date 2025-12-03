/**
 * @fileoverview Hook per gestione modale di conferma con Promise API.
 * Permette di usare modali come async/await per flussi più puliti.
 * 
 * @module UseConfirmModal
 * @requires react
 */

import { useState, useCallback } from 'react';

/**
 * Hook per modale di conferma
 * 
 * Caratteristiche:
 * - API basata su Promise (async/await)
 * - 4 tipi di modale (danger, warning, success, info)
 * - Testi personalizzabili
 * - Gestione stato modale
 * 
 * @hook
 * @returns {Object} Oggetto con stato e funzioni
 * @returns {Object} returns.modalState - Stato corrente del modale
 * @returns {boolean} returns.modalState.isOpen - Modale aperto/chiuso
 * @returns {string} returns.modalState.title - Titolo modale
 * @returns {string} returns.modalState.message - Messaggio
 * @returns {string} returns.modalState.type - Tipo (danger/warning/success/info)
 * @returns {Function} returns.showConfirm - Mostra modale e ritorna Promise
 * @returns {Function} returns.handleClose - Chiude modale (resolve false)
 * @returns {Function} returns.handleConfirm - Conferma modale (resolve true)
 * 
 * @example
 * const { modalState, showConfirm } = useConfirmModal();
 * 
 * // Uso con async/await
 * const confirmed = await showConfirm({
 *   title: 'Elimina agente',
 *   message: 'Sei sicuro?',
 *   type: 'danger'
 * });
 * 
 * if (confirmed) {
 *   // Procedi con eliminazione
 * }
 */
const useConfirmModal = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        confirmText: 'Conferma',
        cancelText: 'Annulla',
        showCancel: true,
        resolve: null
    });

    /**
     * Apre il modale e ritorna una Promise
     * @param {Object} options - Configurazione del modale
     * @returns {Promise<boolean>} - true se confermato, false se annullato
     */
    const showConfirm = useCallback((options = {}) => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                title: options.title || 'Conferma',
                message: options.message || 'Sei sicuro di voler procedere?',
                type: options.type || 'info',
                confirmText: options.confirmText || 'Conferma',
                cancelText: options.cancelText || 'Annulla',
                showCancel: options.showCancel !== undefined ? options.showCancel : true,
                resolve
            });
        });
    }, []);

    /**
     * Chiude il modale e risolve la Promise con false
     */
    const handleClose = useCallback(() => {
        if (modalState.resolve) {
            modalState.resolve(false);
        }
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, [modalState.resolve]);

    /**
     * Conferma e chiude il modale, risolve la Promise con true
     */
    const handleConfirm = useCallback(() => {
        if (modalState.resolve) {
            modalState.resolve(true);
        }
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, [modalState.resolve]);

    return {
        modalState,
        showConfirm,
        handleClose,
        handleConfirm
    };
};

export default useConfirmModal;
