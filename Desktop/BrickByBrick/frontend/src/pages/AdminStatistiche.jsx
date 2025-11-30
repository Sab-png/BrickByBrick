import StatsOverview from '../components/StatsOverview';
import VisitsChart from '../components/VisitsChart';
import MostViewedProperties from '../components/MostViewedProperties';

const Statistiche = () => {

    return (
        <div className="statistics-page">
            <div className="page-header">
                <h1>Statistiche</h1>
                <p className="page-subtitle">Monitora le performance dell'agenzia</p>
            </div>

            {/* Sezione Panoramica Statistiche */}
            <StatsOverview />

            {/* Sezione Grafico Visite Mensili */}
            <VisitsChart />

            {/* Sezione Immobili Più Visti */}
            <MostViewedProperties />
        </div>
    );
};

export default Statistiche;