import { useState, useEffect } from 'react';
import '../styles/components/_mostViewedProperties.scss';

const MostViewedProperties = () => {
    const [mostViewedProperties, setMostViewedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');

    // useEffect per caricare i dati (da collegare successivamente all'API)
    useEffect(() => {
        // Simulazione caricamento dati - da sostituire con chiamata API
        const fetchMostViewedProperties = async () => {
            try {
                setLoading(true);
                // TODO: Sostituire con la chiamata API reale
                // const response = await fetch(`/api/statistics/most-viewed-properties?month=${selectedMonth}`);
                // const data = await response.json();

                // Dati mock per ora
                const mockData = [
                    {
                        id: 1,
                        image: 'https://via.placeholder.com/100x80',
                        address: 'Via Roma 123',
                        city: 'Milano',
                        price: '850.000€',
                        status: 'disponibile'
                    },
                    {
                        id: 2,
                        image: 'https://via.placeholder.com/100x80',
                        address: 'Corso Vittorio Emanuele 45',
                        city: 'Roma',
                        price: '450.000€',
                        status: 'in_trattativa'
                    },
                    {
                        id: 3,
                        image: 'https://via.placeholder.com/100x80',
                        address: 'Piazza Castello 8',
                        city: 'Torino',
                        price: '620.000€',
                        status: 'disponibile'
                    },
                    {
                        id: 4,
                        image: 'https://via.placeholder.com/100x80',
                        address: 'Via dei Calzaiuoli 67',
                        city: 'Firenze',
                        price: '720.000€',
                        status: 'venduta'
                    },
                    {
                        id: 5,
                        image: 'https://via.placeholder.com/100x80',
                        address: 'Via Indipendenza 22',
                        city: 'Bologna',
                        price: '380.000€',
                        status: 'disponibile'
                    }
                ];

                setTimeout(() => {
                    setMostViewedProperties(mockData);
                    setLoading(false);
                }, 500);

            } catch (err) {
                setError('Errore nel caricamento delle statistiche');
                setLoading(false);
            }
        };

        fetchMostViewedProperties();
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className="stats-card">
            <div className="stats-card-header">
                <div className="header-content">
                    <div>
                        <h2>Immobili Più Visti</h2>
                        <p className="stats-card-subtitle">
                            Classifica degli immobili con maggiori visualizzazioni
                        </p>
                    </div>
                    <div className="month-filter">
                        <label htmlFor="month-select">Filtra per mese:</label>
                        <select
                            id="month-select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="month-select"
                        >
                            <option value="">Tutti i mesi</option>
                            <option value="2025-01">Gennaio 2025</option>
                            <option value="2024-12">Dicembre 2024</option>
                            <option value="2024-11">Novembre 2024</option>
                            <option value="2024-10">Ottobre 2024</option>
                            <option value="2024-09">Settembre 2024</option>
                            <option value="2024-08">Agosto 2024</option>
                            <option value="2024-07">Luglio 2024</option>
                            <option value="2024-06">Giugno 2024</option>
                            <option value="2024-05">Maggio 2024</option>
                            <option value="2024-04">Aprile 2024</option>
                            <option value="2024-03">Marzo 2024</option>
                            <option value="2024-02">Febbraio 2024</option>
                            <option value="2024-01">Gennaio 2024</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="data-status-message loading">
                    Caricamento statistiche in corso...
                </div>
            )}

            {error && (
                <div className="data-status-message error">
                    {error}
                </div>
            )}

            {!loading && !error && mostViewedProperties.length === 0 && (
                <div className="data-status-message info">
                    Nessun dato disponibile
                </div>
            )}

            {!loading && !error && mostViewedProperties.length > 0 && (
                <div className="table-container">
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Immobile</th>
                                <th>Indirizzo</th>
                                <th>Città</th>
                                <th>Prezzo</th>
                                <th>Stato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mostViewedProperties.map((property) => (
                                <tr key={property.id}>
                                    <td>
                                        <div className="property-image">
                                            <img src={property.image} alt="Immobile" />
                                        </div>
                                    </td>
                                    <td className="address-cell">{property.address}</td>
                                    <td className="city-cell">{property.city}</td>
                                    <td className="price-cell">{property.price}</td>
                                    <td>
                                        <span className={`status-badge status-${property.status}`}>
                                            {property.status === 'disponibile' && 'Disponibile'}
                                            {property.status === 'in_trattativa' && 'In Trattativa'}
                                            {property.status === 'venduta' && 'Venduta'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MostViewedProperties;
