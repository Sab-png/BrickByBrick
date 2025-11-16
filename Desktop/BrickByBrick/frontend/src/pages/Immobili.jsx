import HeroSection from '../components/HeroSection';
import Filters from '../components/Filters';
import ImmobiliResults from '../components/ImmobiliResults';
import Newsletter from '../components/NewsLetter';


export default function Immobili() {

  return (
    <>
      <HeroSection title="Trova la casa dei tuoi sogni!" subtitle="Inizia ora la ricerca" showCTA={false} bgImage="/src/assets/images/hero-immobili.jpg" />

      <Filters />

      <ImmobiliResults />

      <Newsletter />
    </>
  );
}