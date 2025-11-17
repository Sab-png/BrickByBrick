export default function InformazioneImmobile({ immobile, caratteristiche }) {
    return (
        <div className="dettaglio-immobile__details-section">
            <h2 className="dettaglio-immobile__section-title">Dettagli</h2>
            <div className="dettaglio-immobile__details-grid">
                {caratteristiche?.tipologia && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-home"></i>
                        <div>
                            <strong>Tipologia</strong>
                            <span>{caratteristiche.tipologia}</span>
                        </div>
                    </div>
                )}
                <div className="dettaglio-immobile__detail-item">
                    <i className="fas fa-expand-arrows-alt"></i>
                    <div>
                        <strong>Superficie</strong>
                        <span>{immobile.superficie} m²</span>
                    </div>
                </div>
                <div className="dettaglio-immobile__detail-item">
                    <i className="fas fa-door-open"></i>
                    <div>
                        <strong>Locali</strong>
                        <span>{immobile.locali}</span>
                    </div>
                </div>
                {caratteristiche?.camere && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-bed"></i>
                        <div>
                            <strong>Camere</strong>
                            <span>{caratteristiche.camere}</span>
                        </div>
                    </div>
                )}
                {caratteristiche?.bagni && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-bath"></i>
                        <div>
                            <strong>Bagni</strong>
                            <span>{caratteristiche.bagni}</span>
                        </div>
                    </div>
                )}
                {caratteristiche?.piano !== undefined && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-layer-group"></i>
                        <div>
                            <strong>Piano</strong>
                            <span>{caratteristiche.piano}</span>
                        </div>
                    </div>
                )}
                {caratteristiche?.box_auto > 0 && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-car"></i>
                        <div>
                            <strong>Box Auto</strong>
                            <span>{caratteristiche.box_auto}</span>
                        </div>
                    </div>
                )}
                {caratteristiche?.balcone > 0 && (
                    <div className="dettaglio-immobile__detail-item">
                        <i className="fas fa-door-open"></i>
                        <div>
                            <strong>Balconi</strong>
                            <span>{caratteristiche.balcone}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

