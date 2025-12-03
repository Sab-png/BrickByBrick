/**
 * @fileoverview Sezione descrizione testuale immobile.
 * 
 * @module DescrizioneImmobile
 */

/**
 * Componente Descrizione Immobile
 * 
 * @component
 * @param {Object} props - Proprietà del componente
 * @param {string} props.descrizione - Descrizione principale
 * @param {string} [props.altreCaratteristiche] - Caratteristiche aggiuntive
 * @returns {JSX.Element} Sezione descrizione
 * 
 * @example
 * <DescrizioneImmobile
 *   descrizione="Splendida villa con giardino"
 *   altreCaratteristiche="Classe energetica A"
 * />
 */
export default function DescrizioneImmobile({ descrizione, altreCaratteristiche }) {
  return (
    <div className="dettaglio-immobile__description-section">
      <h2 className="dettaglio-immobile__section-title">Descrizione</h2>
      <p className="dettaglio-immobile__description">{descrizione}</p>
      {altreCaratteristiche && (
        <p className="dettaglio-immobile__description-extra">
          <strong>Altre caratteristiche:</strong> {altreCaratteristiche}
        </p>
      )}
    </div>
  );
}