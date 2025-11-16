export default function InfoEdificioImmobile({ caratteristiche }) {
    return (
        <>
            {caratteristiche && (
                <div className="dettaglio-immobile__building-section">
                    <h2 className="dettaglio-immobile__section-title">Informazioni Edificio</h2>
                    <div className="dettaglio-immobile__building-info">
                        {caratteristiche.anno_costruzione && (
                            <div className="dettaglio-immobile__info-item">
                                <strong>Anno di costruzione:</strong>
                                <span>{caratteristiche.anno_costruzione}</span>
                            </div>
                        )}
                        {caratteristiche.piani_edificio && (
                            <div className="dettaglio-immobile__info-item">
                                <strong>Piani edificio:</strong>
                                <span>{caratteristiche.piani_edificio}</span>
                            </div>
                        )}
                        {caratteristiche.disponibilita && (
                            <div className="dettaglio-immobile__info-item">
                                <strong>Disponibilità:</strong>
                                <span>{caratteristiche.disponibilita}</span>
                            </div>
                        )}
                        {caratteristiche.accesso_disabili !== undefined && (
                            <div className="dettaglio-immobile__info-item">
                                <strong>Accesso disabili:</strong>
                                <span>{caratteristiche.accesso_disabili ? 'Sì' : 'No'}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

