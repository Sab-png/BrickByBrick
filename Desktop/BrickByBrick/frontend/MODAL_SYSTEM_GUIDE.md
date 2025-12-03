# 🎯 Sistema Modali Riutilizzabili - BrickByBrick

Sistema completo di modali personalizzati per sostituire gli `alert()` e `confirm()` nativi del browser.

## 📦 Componenti

### 1. **ConfirmModal.jsx**
Componente modale riutilizzabile con 4 varianti di stile.

### 2. **UseConfirmModal.jsx**
Hook personalizzato per gestire i modali con Promise (async/await).

### 3. **_confirmModal.scss**
Stili completi con animazioni e responsive design.

---

## 🚀 Utilizzo Base

### Importa nell'componente:
```javascript
import ConfirmModal from './ConfirmModal';
import useConfirmModal from '../hooks/UseConfirmModal';
```

### Setup nel componente:
```javascript
const MioComponente = () => {
    const { modalState, showConfirm, handleClose, handleConfirm } = useConfirmModal();
    
    // ... resto del codice
}
```

### Mostra il modale:
```javascript
const handleDelete = async (id) => {
    const confirmed = await showConfirm({
        title: 'Conferma Eliminazione',
        message: 'Sei sicuro di voler eliminare questo elemento?',
        type: 'danger',
        confirmText: 'Elimina',
        cancelText: 'Annulla'
    });

    if (confirmed) {
        // Utente ha confermato
        await deleteItem(id);
    }
};
```

### Aggiungi il componente nel JSX:
```javascript
return (
    <div>
        {/* ... tuo contenuto */}
        
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
```

---

## 🎨 Tipi di Modali

### 1. **Danger** (Eliminazioni)
```javascript
await showConfirm({
    title: 'Conferma Eliminazione',
    message: 'Questa azione è irreversibile!',
    type: 'danger',
    confirmText: 'Elimina',
    cancelText: 'Annulla'
});
```
🔴 Rosso - Per azioni distruttive

### 2. **Warning** (Avvisi)
```javascript
await showConfirm({
    title: 'Attenzione',
    message: 'Questa azione potrebbe causare problemi.',
    type: 'warning',
    confirmText: 'Continua',
    cancelText: 'Annulla'
});
```
🟡 Giallo/Arancione - Per avvisi importanti

### 3. **Success** (Conferme positive)
```javascript
await showConfirm({
    title: 'Successo',
    message: 'Operazione completata con successo!',
    type: 'success',
    confirmText: 'OK',
    showCancel: false
});
```
🟢 Verde - Per successi

### 4. **Info** (Informazioni)
```javascript
await showConfirm({
    title: 'Informazione',
    message: 'Vuoi procedere con questa azione?',
    type: 'info',
    confirmText: 'Sì',
    cancelText: 'No'
});
```
🔵 Blu - Per informazioni generiche

---

## ⚙️ Opzioni Disponibili

| Opzione | Tipo | Default | Descrizione |
|---------|------|---------|-------------|
| `title` | string | "Conferma" | Titolo del modale |
| `message` | string | "Sei sicuro di voler procedere?" | Messaggio principale |
| `type` | string | "info" | Tipo: 'danger', 'warning', 'success', 'info' |
| `confirmText` | string | "Conferma" | Testo pulsante conferma |
| `cancelText` | string | "Annulla" | Testo pulsante annulla |
| `showCancel` | boolean | true | Mostra pulsante annulla |

---

## 📋 Esempi Pratici

### Esempio 1: Eliminazione con conferma
```javascript
const handleDeleteAgent = async (agentId) => {
    const confirmed = await showConfirm({
        title: 'Conferma Eliminazione',
        message: 'Sei sicuro di voler rimuovere questo agente?',
        type: 'danger',
        confirmText: 'Elimina',
        cancelText: 'Annulla'
    });

    if (confirmed) {
        try {
            await removeAgent(agentId);
            
            // Mostra successo
            await showConfirm({
                title: 'Successo',
                message: 'Agente eliminato con successo!',
                type: 'success',
                confirmText: 'OK',
                showCancel: false
            });
        } catch (error) {
            // Mostra errore
            await showConfirm({
                title: 'Errore',
                message: error.message,
                type: 'danger',
                confirmText: 'OK',
                showCancel: false
            });
        }
    }
};
```

### Esempio 2: Solo messaggio informativo
```javascript
const showInfo = async () => {
    await showConfirm({
        title: 'Informazione',
        message: 'Questa funzionalità sarà disponibile presto!',
        type: 'info',
        confirmText: 'OK',
        showCancel: false
    });
};
```

### Esempio 3: Richiesta conferma azione
```javascript
const handlePublish = async () => {
    const confirmed = await showConfirm({
        title: 'Pubblica Annuncio',
        message: 'Sei sicuro di voler pubblicare questo annuncio?',
        type: 'warning',
        confirmText: 'Pubblica',
        cancelText: 'Annulla'
    });

    if (confirmed) {
        await publishAnnuncio();
    }
};
```

---

## ✨ Caratteristiche

- ✅ **Design moderno** con gradients e animazioni smooth
- ✅ **Completamente responsive** (mobile, tablet, desktop)
- ✅ **Accessibile** (keyboard navigation, ESC per chiudere, autofocus)
- ✅ **Promise-based** (usa async/await)
- ✅ **Personalizzabile** (4 tipi con colori diversi)
- ✅ **Overlay con blur** per focus sul modale
- ✅ **Animazioni** (fadeIn per overlay, slideUp per modale)
- ✅ **Body scroll lock** quando il modale è aperto

---

## 🎯 Dove usarlo

Sostituisci tutti gli `alert()` e `confirm()` in:
- ✅ **AdminAgenti.jsx** (fatto)
- ⏳ **AdminUtenti.jsx**
- ⏳ **AdminImmobili.jsx**
- ⏳ **AdminContratti.jsx**
- ⏳ **AgenteVisite.jsx**
- ⏳ **Form di modifica/creazione**

---

## 🔧 Personalizzazione

Per modificare i colori o lo stile, edita `_confirmModal.scss`:

```scss
// Cambia il colore danger
.modal-btn-danger {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

// Cambia dimensioni modale
.modal-container {
    max-width: 500px; // Modifica qui
}
```

---

## 📝 Note

- Il modale viene chiuso premendo ESC
- Il modale viene chiuso cliccando sull'overlay
- Il pulsante conferma ha autofocus per accessibilità
- Il body scroll viene bloccato quando il modale è aperto
- Supporta Promise per un controllo asincrono pulito

---

**Creato per BrickByBrick** 🏠✨
