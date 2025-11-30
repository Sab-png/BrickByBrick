import { useState, useEffect } from 'react';
import '../styles/components/_statsOverview.scss';

const StatsOverview = () => {
    const [stats, setStats] = useState({
        richiesteVendita: 0,
        richiesteGenerali: 0,
        agentiAssegnati: 0,
        immobiliValutati: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                // TODO: Sostituire con la chiamata API reale
                // const response = await fetch('/api/statistics/overview');
                // const data = await response.json();

                // Dati mock per ora
                const mockStats = {
                    richiesteVendita: 145,
                    richiesteGenerali: 289,
                    agentiAssegnati: 12,
                    immobiliValutati: 423
                };

                setTimeout(() => {
                    setStats(mockStats);
                    setLoading(false);
                }, 500);

            } catch (err) {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsCards = [
        {
            id: 1,
            title: 'Richieste di Vendita',
            value: stats.richiesteVendita,
            icon: '🏠',
            color: '#2563eb'
        },
        {
            id: 2,
            title: 'Richieste Generali',
            value: stats.richiesteGenerali,
            icon: '📋',
            color: '#10b981'
        },
        {
            id: 3,
            title: 'Agenti Assegnati',
            value: stats.agentiAssegnati,
            icon: '👥',
            color: '#f59e0b'
        },
        {
            id: 4,
            title: 'Immobili Valutati',
            value: stats.immobiliValutati,
            icon: '📊',
            color: '#8b5cf6'
        }
    ];

    return (
        <div className="stats-overview">
            {loading ? (
                <div className="stats-grid">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="stat-card loading">
                            <div className="stat-card-content">
                                <div className="stat-icon-placeholder"></div>
                                <div className="stat-info">
                                    <div className="stat-title-placeholder"></div>
                                    <div className="stat-value-placeholder"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="stats-grid">
                    {statsCards.map((stat) => (
                        <div key={stat.id} className="stat-card">
                            <div className="stat-card-content">
                                <div
                                    className="stat-icon"
                                    style={{ backgroundColor: `${stat.color}15` }}
                                >
                                    <span className="icon-emoji">{stat.icon}</span>
                                </div>
                                <div className="stat-info">
                                    <h3 className="stat-title">{stat.title}</h3>
                                    <p className="stat-value">
                                        {stat.value.toLocaleString('it-IT')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatsOverview;
