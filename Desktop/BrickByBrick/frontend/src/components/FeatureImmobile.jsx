import { 
  FaFileContract, 
  FaCouch, 
  FaArrowUp,   
  FaBuilding,  
  FaTree, 
  FaBox, 
  FaLeaf, 
  FaFire 
} from "react-icons/fa";

export default function FeatureImmobile({ caratteristiche }) {
  return (
    <>
      {caratteristiche && (
        <div className="dettaglio-immobile__features-section">
          <h2 className="dettaglio-immobile__section-title">Caratteristiche</h2>
          <div className="dettaglio-immobile__features-list">
            
            {caratteristiche.contratto && (
              <div className="dettaglio-immobile__feature-badge">
                <FaFileContract className="feature-icon" />
                {caratteristiche.contratto}
              </div>
            )}
            
            {caratteristiche.arredato && (
              <div className="dettaglio-immobile__feature-badge">
                <FaCouch className="feature-icon" />
                Arredato
              </div>
            )}
            
            {caratteristiche.ascensore && (
              <div className="dettaglio-immobile__feature-badge">
                <FaArrowUp className="feature-icon" />
                Ascensore
              </div>
            )}
            
            {caratteristiche.terrazzo && (
              <div className="dettaglio-immobile__feature-badge">
                <FaBuilding className="feature-icon" />
                Terrazzo
              </div>
            )}
            
            {caratteristiche.giardino && (
              <div className="dettaglio-immobile__feature-badge">
                <FaTree className="feature-icon" />
                Giardino
              </div>
            )}
            
            {caratteristiche.cantina && (
              <div className="dettaglio-immobile__feature-badge">
                <FaBox className="feature-icon" />
                Cantina
              </div>
            )}
            
            {caratteristiche.classe_energetica && (
              <div className="dettaglio-immobile__feature-badge">
                <FaLeaf className="feature-icon" />
                Classe {caratteristiche.classe_energetica}
              </div>
            )}
            
            {caratteristiche.riscaldamento && (
              <div className="dettaglio-immobile__feature-badge">
                <FaFire className="feature-icon" />
                {caratteristiche.riscaldamento}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}