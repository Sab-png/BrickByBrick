import AgentCard from './AgentCard';

import marcoAvif from '../assets/images/avif/marco-nuvola.avif';
import marcoWebp from '../assets/images/webp/marco-nuvola.webp';
import marcoJpg from '../assets/images/jpg/marco-nuvola.jpg';

import francoAvif from '../assets/images/avif/franco-gallo.avif';
import francoWebp from '../assets/images/webp/franco-gallo.webp';
import francoJpg from '../assets/images/jpg/franco-gallo.jpg';

import lucaAvif from '../assets/images/avif/luca-casato.avif';
import lucaWebp from '../assets/images/webp/luca-casato.webp';
import lucaJpg from '../assets/images/jpg/luca-casato.jpg';

import luigiAvif from '../assets/images/avif/luigi-verdi.avif';
import luigiWebp from '../assets/images/webp/luigi-verdi.webp';
import luigiJpg from '../assets/images/jpg/luigi-verdi.jpg';

import jasmineAvif from '../assets/images/avif/jasmine-flore.avif';
import jasmineWebp from '../assets/images/webp/jasmine-flore.webp';
import jasmineJpg from '../assets/images/jpg/jasmine-flore.jpg';

import lauraAvif from '../assets/images/avif/laura-franchi.avif';
import lauraWebp from '../assets/images/webp/laura-franchi.webp';
import lauraJpg from '../assets/images/jpg/laura-franchi.jpg';

import gaiaAvif from '../assets/images/avif/gaia-solis.avif';
import gaiaWebp from '../assets/images/webp/gaia-solis.webp';
import gaiaJpg from '../assets/images/jpg/gaia-solis.jpg';

import martinaAvif from '../assets/images/avif/martina-lucario.avif';
import martinaWebp from '../assets/images/webp/martina-lucario.webp';
import martinaJpg from '../assets/images/jpg/martina-lucario.jpg';

export default function AgentsSection() {

    const agents = [
        { 
            name: "Marco Nuvola", 
            location: "Torino", 
            imageAvif: marcoAvif, imageWebp: marcoWebp, imageJpg: marcoJpg 
        },
        { 
            name: "Franco Gallo", 
            location: "Alessandria", 
            imageAvif: francoAvif, imageWebp: francoWebp, imageJpg: francoJpg 
        },
        { 
            name: "Luca Casato", 
            location: "Novara", 
            imageAvif: lucaAvif, imageWebp: lucaWebp, imageJpg: lucaJpg 
        },
        { 
            name: "Luigi Verdi", 
            location: "Cuneo", 
            imageAvif: luigiAvif, imageWebp: luigiWebp, imageJpg: luigiJpg 
        },
        { 
            name: "Jasmine Flore", 
            location: "Torino", 
            imageAvif: jasmineAvif, imageWebp: jasmineWebp, imageJpg: jasmineJpg 
        },
        { 
            name: "Laura Franchi", 
            location: "Novara", 
            imageAvif: lauraAvif, imageWebp: lauraWebp, imageJpg: lauraJpg 
        },
        { 
            name: "Gaia Solis", 
            location: "Chieri", 
            imageAvif: gaiaAvif, imageWebp: gaiaWebp, imageJpg: gaiaJpg 
        },
        { 
            name: "Martina Lucario", 
            location: "Torino", 
            imageAvif: martinaAvif, imageWebp: martinaWebp, imageJpg: martinaJpg 
        },
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