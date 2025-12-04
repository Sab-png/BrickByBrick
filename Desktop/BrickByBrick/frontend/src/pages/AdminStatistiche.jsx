/**
 * @fileoverview Pagina dashboard statistiche amministratore.
 * Mostra conteggi totali di immobili, agenti, utenti e contratti.
 * 
 * @module pages/AdminStatistiche
 * @requires react
 */

import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8085';

/**
 * Pagina Statistiche Dashboard (Admin)
 * 
 * Funzionalità:
 * - Fetch parallelo di tutte le risorse (immobili, agenti, utenti, contratti)
 * - Calcolo conteggi totali
 * - Visualizzazione card con icone e numeri
 * - Gestione stati loading/error
 * 
 * Card visualizzate:
 * - Immobili totali
 * - Agenti attivi
 * - Utenti registrati
 * - Contratti gestiti
 * 
 * @page
 * @returns {JSX.Element} Dashboard con statistiche
 * 
 * @example
 * // Route protetta admin (index)
 * <Route path="/admin" element={<Statistiche />} />
 */
export default function Statistiche() {
    const [stats, setStats] = useState({
        immobili: 0,
        agenti: 0,
        utenti: 0,
        contratti: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Chiamate API parallele per ottenere tutti i dati
                const [immobiliRes, agentiRes, utentiRes, contrattiRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/immobili`),
                    fetch(`${API_BASE_URL}/api/agenti`),
                    fetch(`${API_BASE_URL}/api/utenti`),
                    fetch(`${API_BASE_URL}/api/contratti`)
                ]);

                // Verifica che tutte le risposte siano OK
                if (!immobiliRes.ok || !agentiRes.ok || !utentiRes.ok || !contrattiRes.ok) {
                    throw new Error('Errore nel caricamento delle statistiche');
                }

                // Parsing dei dati
                const [immobiliData, agentiData, utentiData, contrattiData] = await Promise.all([
                    immobiliRes.json(),
                    agentiRes.json(),
                    utentiRes.json(),
                    contrattiRes.json()
                ]);

                // Aggiorna lo stato con i conteggi
                setStats({
                    immobili: immobiliData.length || 0,
                    agenti: agentiData.length || 0,
                    utenti: utentiData.length || 0,
                    contratti: contrattiData.length || 0
                });
            } catch (err) {
                console.error('Errore caricamento statistiche:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (isLoading) {
        return (
            <div className="stats-page">
                <div className="data-status-message loading">
                    Caricamento statistiche... ⏳
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stats-page">
                <div className="data-status-message error">
                    Errore: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="stats-page">
            <div className="stats-header">
                <h1>Dashboard Statistiche</h1>
                <p>Panoramica generale del sistema BrickByBrick</p>
            </div>

            <div className="stats-grid">
                {/* Card Immobili */}
                <div className="stat-card immobili">
                    <div className="stat-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Immobili</h3>
                        <p className="stat-number">{stats.immobili}</p>
                        <span className="stat-label">Proprietà registrate</span>
                    </div>
                </div>

                {/* Card Agenti */}
                <div className="stat-card agenti">
                    <div className="stat-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Agenti</h3>
                        <p className="stat-number">{stats.agenti}</p>
                        <span className="stat-label">Agenti attivi</span>
                    </div>
                </div>

                {/* Card Utenti */}
                <div className="stat-card utenti">
                    <div className="stat-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Utenti</h3>
                        <p className="stat-number">{stats.utenti}</p>
                        <span className="stat-label">Clienti registrati</span>
                    </div>
                </div>

                {/* Card Contratti */}
                <div className="stat-card contratti">
                    <div className="stat-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Contratti</h3>
                        <p className="stat-number">{stats.contratti}</p>
                        <span className="stat-label">Contratti esclusivi</span>
                    </div>
                </div>
            </div>

            {/* Riepilogo Totale */}
            <div className="stats-summary">
                <h2>Riepilogo Generale</h2>
                <div className="summary-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Totale</th>
                                <th>Descrizione</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Immobili</td>
                                <td className="number">{stats.immobili}</td>
                                <td>Proprietà disponibili nel catalogo</td>
                            </tr>
                            <tr>
                                <td>Agenti</td>
                                <td className="number">{stats.agenti}</td>
                                <td>Agenti immobiliari attivi</td>
                            </tr>
                            <tr>
                                <td>Utenti</td>
                                <td className="number">{stats.utenti}</td>
                                <td>Clienti registrati nel sistema</td>
                            </tr>
                            <tr>
                                <td>Contratti</td>
                                <td className="number">{stats.contratti}</td>
                                <td>Contratti esclusivi attivi</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}