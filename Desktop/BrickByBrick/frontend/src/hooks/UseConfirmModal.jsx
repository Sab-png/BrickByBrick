import { useState, useCallback } from 'react';

/**
 * Hook personalizzato per gestire modali di conferma
 * Permette di usare i modali come Promise (async/await)
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
