import Newsletter from "../components/NewsLetter"
import HeroSection from "../components/HeroSection"
import MissionSection from "../components/MissionSection"
import StorySection from "../components/StorySection"
import AgentsSection from "../components/AgentSection"

export default function About() {
    return (
        <div className="about-page">

            <HeroSection title="Esperti locali, risultati misurabili" subtitle="Acquisiamo e vendiamo immobili in esclusiva con metodo digitale e competenza territoriale" showCTA={false} bgImage="/src/assets/images/hero-about.jpg"/> 

            <StorySection />

            <MissionSection />

            <AgentsSection />

            <Newsletter />  
        </div>
    )
}