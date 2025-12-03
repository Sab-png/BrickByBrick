/**
 * @fileoverview Informazioni edificio (anno costruzione, piani, disponibilità, accesso disabili).
 * 
 * @module InfoEdificioImmobile
 */

/**
 * Componente Info Edificio Immobile
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {Object} props.caratteristiche - Dati caratteristiche edificio
 * @param {number} [props.caratteristiche.anno_costruzione] - Anno costruzione
 * @param {number} [props.caratteristiche.piani_edificio] - Numero piani
 * @param {string} [props.caratteristiche.disponibilita] - Disponibilità
 * @param {boolean} [props.caratteristiche.accesso_disabili] - Accesso disabili
 * @returns {JSX.Element|null} Sezione info edificio o null
 * 
 * @example
 * <InfoEdificioImmobile
 *   caratteristiche={{
 *     anno_costruzione: 2010,
 *     piani_edificio: 3,
 *     accesso_disabili: true
 *   }}
 * />
 */
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

