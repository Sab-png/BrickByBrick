import React, { useState, useMemo } from 'react';
import { messaggi } from '../dati_fittizzi/messaggi';

// --- MOCK DATA (Dati Fittizi) ---
// Ho aggiunto avatar finti per replicare il look dell'immagine


const CommunicationsPage = () => {
  // Stato per tab attivo ('inbox' o 'sent')
  const [activeTab, setActiveTab] = useState('inbox');
  // Stato per la ricerca
  const [searchTerm, setSearchTerm] = useState('');
  // Stato dei messaggi
  const [messages, setMessages] = useState(messaggi);
  // Stato per il messaggio selezionato (per leggere/rispondere)
  const [selectedMessage, setSelectedMessage] = useState(null);
  // Stato per il testo della risposta
  const [replyText, setReplyText] = useState('');

  // --- LOGICA ---

  // Filtriamo i messaggi in base al tab e alla ricerca
  const filteredMessages = useMemo(() => {
    let filtered = messages.filter(m => 
      activeTab === 'inbox' ? m.type === 'received' : m.type === 'sent'
    );

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.agentName.toLowerCase().includes(lowerTerm) || 
        m.subject.toLowerCase().includes(lowerTerm)
      );
    }
    return filtered;
  }, [messages, activeTab, searchTerm]);

  // Calcolo contatori per la sidebar
  const unreadCount = messages.filter(m => m.type === 'received' && !m.isRead).length;
  const sentCount = messages.filter(m => m.type === 'sent').length;

  // Funzione invio risposta
  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'sent',
      agentName: selectedMessage.agentName,
      avatar: selectedMessage.avatar,
      subject: `RE: ${selectedMessage.subject}`,
      fullBody: replyText,
      time: 'Adesso',
      isRead: true
    };

    setMessages([newMessage, ...messages]); // Aggiungi ai messaggi
    setReplyText('');
    setSelectedMessage(null); // Chiudi dettaglio
    setActiveTab('sent'); // Spostati su "Mandati" per vedere il messaggio
  };

  // --- RENDER ---
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Comunicazioni</h1>
      
      <div style={styles.layoutWrapper}>
        
        {/* --- SIDEBAR (Sinistra) --- */}
        <div style={styles.sidebarCard}>
          <h3 style={styles.sidebarTitle}>Comunicazioni:</h3>
          
          <div style={styles.menuList}>
            {/* Tab Da Leggere */}
            <div 
              style={{...styles.menuItem, ...(activeTab === 'inbox' ? styles.menuItemActive : {})}}
              onClick={() => { setActiveTab('inbox'); setSelectedMessage(null); }}
            >
              <span style={styles.menuIcon}>📩</span>
              <span style={{flex: 1}}>Da leggere</span>
              {/* Mostra contatore solo se > 0 */}
              {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
            </div>

            {/* Tab Mandati */}
            <div 
              style={{...styles.menuItem, ...(activeTab === 'sent' ? styles.menuItemActive : {})}}
              onClick={() => { setActiveTab('sent'); setSelectedMessage(null); }}
            >
              <span style={styles.menuIcon}>💬</span>
              <span style={{flex: 1}}>Mandati</span>
              <span style={styles.badgeSimple}>{sentCount}</span>
            </div>
          </div>
        </div>

        {/* --- CONTENT (Destra) --- */}
        <div style={styles.contentCard}>
          
          {/* Se c'è un messaggio selezionato, mostriamo il dettaglio (Risposta) */}
          {selectedMessage ? (
            <div style={styles.detailView}>
              <button onClick={() => setSelectedMessage(null)} style={styles.backButton}>← Torna alla lista</button>
              
              <div style={styles.detailHeader}>
                <img src={selectedMessage.avatar} alt="avatar" style={styles.avatarLarge} />
                <div>
                  <h3 style={{margin: 0}}>{selectedMessage.agentName}</h3>
                  <p style={{margin: 0, color: '#888', fontSize: '14px'}}>{selectedMessage.time}</p>
                </div>
              </div>
              
              <h4 style={{marginTop: '20px'}}>{selectedMessage.subject}</h4>
              <p style={styles.messageBody}>{selectedMessage.fullBody}</p>

              {/* Area Risposta (Solo se siamo in inbox) */}
              {activeTab === 'inbox' && (
                <div style={styles.replyBox}>
                  <textarea 
                    style={styles.textArea} 
                    placeholder="Scrivi la tua risposta qui..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button style={styles.sendButton} onClick={handleSendReply}>Invia Risposta</button>
                </div>
              )}
            </div>
          ) : (
            /* Altrimenti mostriamo la LISTA (come da tua immagine) */
            <>
              {/* Search Bar */}
              <div style={styles.searchContainer}>
                <span style={{marginRight: '10px', color: '#999'}}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Cerca messaggi o persone" 
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Lista Messaggi */}
              <div style={styles.listContainer}>
                {filteredMessages.length === 0 ? (
                  <p style={{textAlign: 'center', color: '#999', marginTop: '40px'}}>Nessun messaggio trovato.</p>
                ) : (
                  filteredMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      style={styles.listItem}
                      onClick={() => {
                        setSelectedMessage(msg);
                        // Segna come letto se cliccato
                        if (!msg.isRead && msg.type === 'received') {
                          setMessages(prev => prev.map(m => m.id === msg.id ? {...m, isRead: true} : m));
                        }
                      }}
                    >
                      <img src={msg.avatar} alt="avatar" style={styles.avatar} />
                      
                      <div style={styles.textContainer}>
                        <div style={styles.nameRow}>
                          <span style={{fontWeight: 'bold', color: '#333'}}>{msg.agentName}</span>
                        </div>
                        <div style={styles.previewText}>
                          {msg.subject.length > 50 ? msg.subject.substring(0, 50) + '...' : msg.subject}
                        </div>
                      </div>

                      <div style={styles.time}>{msg.time}</div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- STILI INLINE (Per replicare la tua immagine senza file CSS esterni) ---
const styles = {
  pageContainer: {
    backgroundColor: '#f5f7fb', // Sfondo grigino chiaro
    minHeight: '100vh',
    padding: '40px',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#000',
  },
  layoutWrapper: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
  },
  // Sidebar Styles
  sidebarCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#555',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  menuItemActive: {
    backgroundColor: '#eef2f6', // Il grigio dell'immagine per l'elemento attivo
    color: '#000',
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: '10px',
  },
  badge: {
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#333',
  },
  badgeSimple: {
    color: '#999',
    fontSize: '12px',
  },
  
  // Content Styles
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '30px',
    minHeight: '500px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    width: 'fit-content',
    minWidth: '300px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    color: '#555',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '20px',
    objectFit: 'cover',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row', // Allineato orizzontalmente come nella foto
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameRow: {
    width: '200px', // Larghezza fissa per il nome come nella foto
  },
  previewText: {
    color: '#666',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '400px',
  },
  time: {
    color: '#999',
    fontSize: '12px',
    marginLeft: 'auto', // Spinge l'orario tutto a destra
  },

  // Dettaglio & Risposta Styles
  detailView: {
    animation: 'fadeIn 0.3s',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    marginBottom: '20px',
    padding: 0,
    fontSize: '14px',
    textDecoration: 'underline',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
  },
  avatarLarge: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  messageBody: {
    color: '#444',
    lineHeight: '1.6',
    backgroundColor: '#fafafa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  replyBox: {
    marginTop: '30px',
  },
  textArea: {
    width: '100%',
    height: '100px',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '10px',
  },
  sendButton: {
    backgroundColor: '#000', // Bottone nero come lo stile generale
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default CommunicationsPage;