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