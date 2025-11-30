import { useState, useEffect, useRef } from 'react';
import '../styles/components/_visitsChart.scss';

const VisitsChart = () => {
    const [visitsData, setVisitsData] = useState([]);
    const [visitsLoading, setVisitsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('2025');
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const chartRef = useRef(null);

    // useEffect per caricare i dati delle visite mensili
    useEffect(() => {
        const fetchVisitsData = async () => {
            try {
                setVisitsLoading(true);
                // TODO: Sostituire con la chiamata API reale
                // const response = await fetch(`/api/statistics/visits?year=${selectedYear}`);
                // const data = await response.json();

                // Dati mock per ora
                const mockVisitsData = [
                    { month: 'Gen', visits: 2000 },
                    { month: 'Feb', visits: 3000 },
                    { month: 'Mar', visits: 4700 },
                    { month: 'Apr', visits: 5000 },
                    { month: 'Mag', visits: 3000 },
                    { month: 'Giu', visits: 8000 },
                    { month: 'Lug', visits: 4800 },
                    { month: 'Ago', visits: 5000 },
                    { month: 'Set', visits: 4500 },
                    { month: 'Ott', visits: 2500 },
                    { month: 'Nov', visits: 6000 },
                    { month: 'Dic', visits: 7200 }
                ];

                setTimeout(() => {
                    setVisitsData(mockVisitsData);
                    setVisitsLoading(false);
                }, 500);

            } catch (err) {
                setVisitsLoading(false);
            }
        };

        fetchVisitsData();
    }, [selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Scala Y fissa
    const chartMax = 10000;
    const chartMin = 0;
    const yAxisValues = [2000, 4000, 6000, 8000, 10000];
    const gridValues = [2000, 4000, 6000, 8000, 10000]; // Solo 5 linee allineate ai numeri

    // Calcola la posizione di ogni punto (usata sia per il path che per i punti visuali)
    const getPointPosition = (index) => {
        const width = 100;
        const height = 100;
        const padding = 5;

        const stepX = (width - 2 * padding) / (visitsData.length - 1);
        const x = padding + index * stepX;
        const y = height - padding - ((visitsData[index].visits - chartMin) / (chartMax - chartMin)) * (height - 2 * padding);
        return { x, y };
    };

    // Genera il path SVG con linee rette (a spigoli) usando le stesse coordinate dei punti
    const generateLinePath = () => {
        if (visitsData.length === 0) return '';

        const points = visitsData.map((_, index) => getPointPosition(index));

        // Crea un path con linee rette tra i punti
        let path = `M ${points[0].x},${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x},${points[i].y}`;
        }

        return path;
    };

    // Genera il path per l'area riempita sotto la linea
    const generateAreaPath = () => {
        if (visitsData.length === 0) return '';

        const points = visitsData.map((_, index) => getPointPosition(index));
        const height = 100;
        const padding = 5;
        const bottom = height - padding;

        // Inizia dal basso a sinistra
        let path = `M ${points[0].x},${bottom}`;
        // Sali al primo punto
        path += ` L ${points[0].x},${points[0].y}`;

        // Segui la linea attraverso tutti i punti
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x},${points[i].y}`;
        }

        // Scendi al basso a destra
        path += ` L ${points[points.length - 1].x},${bottom}`;
        // Chiudi il path tornando all'inizio
        path += ' Z';

        return path;
    };

    return (
        <div className="stats-card">
            <div className="stats-card-header">
                <div className="header-content">
                    <div>
                        <h2>Visite al Sito</h2>
                        <p className="stats-card-subtitle">
                            Andamento delle visite mensili
                        </p>
                    </div>
                    <div className="month-filter">
                        <label htmlFor="year-select">Anno:</label>
                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="month-select"
                        >
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
            </div>

            {visitsLoading && (
                <div className="data-status-message loading">
                    Caricamento dati in corso...
                </div>
            )}

            {!visitsLoading && visitsData.length > 0 && (
                <div className="visits-chart-container">
                    {/* Asse Y con valori */}
                    <div className="y-axis">
                        {yAxisValues.map((value) => {
                            // Usa ESATTAMENTE lo stesso calcolo del grafico SVG con padding del 5%
                            const padding = 5;
                            const normalizedValue = (value - chartMin) / (chartMax - chartMin);
                            const yPercent = padding + (1 - normalizedValue) * (100 - 2 * padding);
                            return (
                                <div
                                    key={value}
                                    className="y-axis-label"
                                    style={{ top: `${yPercent}%` }}
                                >
                                    {value.toLocaleString()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Contenitore grafico + etichette */}
                    <div className="chart-and-labels">
                        {/* Grafico a linea */}
                        <div className="line-chart-wrapper" ref={chartRef}>
                            {/* Griglia orizzontale come sfondo - allineata esattamente ai valori Y */}
                            <div className="grid-lines-container">
                                {gridValues.map((value) => {
                                    // Usa ESATTAMENTE lo stesso calcolo del grafico SVG con padding del 5%
                                    const padding = 5;
                                    const normalizedValue = (value - chartMin) / (chartMax - chartMin);
                                    const yPercent = padding + (1 - normalizedValue) * (100 - 2 * padding);
                                    return (
                                        <div
                                            key={value}
                                            className="grid-line-horizontal"
                                            style={{ top: `${yPercent}%` }}
                                        />
                                    );
                                })}
                            </div>

                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="line-chart-svg"
                            >
                                {/* Gradiente per l'area riempita */}
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                                    </linearGradient>
                                </defs>

                                {/* Area riempita sotto la linea */}
                                <path
                                    d={generateAreaPath()}
                                    fill="url(#areaGradient)"
                                    className="chart-area"
                                />

                                {/* Linea del grafico blu marcata */}
                                <path
                                    d={generateLinePath()}
                                    className="chart-line"
                                    fill="none"
                                    stroke="#2563eb"
                                    strokeWidth="2.5"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>

                            {/* Container per i punti con lo stesso padding dell'SVG */}
                            <div className="chart-points-container">
                                {/* Punti sulla linea - fuori dall'SVG per mantenere la forma circolare */}
                                {visitsData.map((_, index) => {
                                    const position = getPointPosition(index);
                                    return (
                                        <div
                                            key={index}
                                            className="chart-point-dot"
                                            style={{
                                                left: `${position.x}%`,
                                                top: `${position.y}%`
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            {/* Overlay per tooltip interattivi */}
                            <div className="chart-points-overlay">
                                {visitsData.map((data, index) => {
                                    const position = getPointPosition(index);
                                    return (
                                        <div
                                            key={index}
                                            className="chart-point-wrapper"
                                            style={{
                                                left: `${position.x}%`,
                                                top: `${position.y}%`
                                            }}
                                            onMouseEnter={() => setHoveredPoint(index)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                        >
                                            <div className={`chart-point-hover ${hoveredPoint === index ? 'visible' : ''}`} />
                                            {hoveredPoint === index && (
                                                <div className="point-tooltip">
                                                    <div className="tooltip-value">{data.visits.toLocaleString('it-IT')} visite</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Etichette dei mesi in orizzontale sotto il grafico */}
                        <div className="x-axis-labels">
                            {visitsData.map((data, index) => {
                                const position = getPointPosition(index);
                                return (
                                    <div
                                        key={index}
                                        className="x-axis-label"
                                        style={{ left: `${position.x}%` }}
                                    >
                                        {data.month}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitsChart;
