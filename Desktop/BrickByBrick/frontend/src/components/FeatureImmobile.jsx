export default function FeatureImmobile({ caratteristiche }) {
  return (
    <>
      {caratteristiche && (
        <div className="dettaglio-immobile__features-section">
          <h2 className="dettaglio-immobile__section-title">Caratteristiche</h2>
          <div className="dettaglio-immobile__features-list">
            {caratteristiche.contratto && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-file-contract"></i>
                {caratteristiche.contratto}
              </div>
            )}
            {caratteristiche.arredato && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-couch"></i>
                Arredato
              </div>
            )}
            {caratteristiche.ascensore && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-elevator"></i>
                Ascensore
              </div>
            )}
            {caratteristiche.terrazzo && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-building"></i>
                Terrazzo
              </div>
            )}
            {caratteristiche.giardino && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-tree"></i>
                Giardino
              </div>
            )}
            {caratteristiche.cantina && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-box"></i>
                Cantina
              </div>
            )}
            {caratteristiche.classe_energetica && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-leaf"></i>
                Classe {caratteristiche.classe_energetica}
              </div>
            )}
            {caratteristiche.riscaldamento && (
              <div className="dettaglio-immobile__feature-badge">
                <i className="fas fa-fire"></i>
                {caratteristiche.riscaldamento}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
