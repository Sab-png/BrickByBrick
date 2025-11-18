import AgentCard from './AgentCard';

import imgMarcoNuvola from '../assets/images/marco-nuvola.jpg';
import imgFrancoGallo from '../assets/images/franco-gallo.jpg';
import imgLucaCasato from '../assets/images/luca-casato.jpg';
import imgLuigiVerdi from '../assets/images/luigi-verdi.jpg';
import imgJasmineFlore from '../assets/images/jasmine-flore.jpg';
import imgLauraFranchi from '../assets/images/laura-franchi.jpg';
import imgGaiaSolis from '../assets/images/gaia-solis.jpg';
import imgMartinaLucario from '../assets/images/martina-lucario.jpg';

export default function AgentsSection() {

    const agents = [
        { name: "Marco Nuvola", location: "Torino", image: imgMarcoNuvola },
        { name: "Franco Gallo", location: "Alessandria", image: imgFrancoGallo },
        { name: "Luca Casato", location: "Novara", image: imgLucaCasato },
        { name: "Luigi Verdi", location: "Cuneo", image: imgLuigiVerdi },
        { name: "Jasmine Flore", location: "Torino", image: imgJasmineFlore },
        { name: "Laura Franchi", location: "Novara", image: imgLauraFranchi },
        { name: "Gaia Solis", location: "Chieri", image: imgGaiaSolis },
        { name: "Martina Lucario", location: "Torino", image: imgMartinaLucario },
    ];

    return (
        <section className="agents-section">
            <h2 className="agents-section__title">I nostri agenti</h2>
            <div className="agents-section__grid">
                {agents.map((agent, index) => (
                    <AgentCard
                        key={index}
                        {...agent}
                    />
                ))}
            </div>
        </section>
    );
}