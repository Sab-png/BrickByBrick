import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeatureSection"
import Newsletter from "../components/NewsLetter"
import CardSection from "../components/CardSection"

export default function Homepage() {
    return (
      <>
      <HeroSection title={"Vendi la tua casa in Piemonte con un valore garantito e senza stress."}
      bgImage="/src/assets/images/hero-homepage.jpg"/>

      <FeaturesSection/>

      <CardSection />

      <Newsletter />
      </>

    )
}