import { useParams } from 'react-router-dom'

export default function DettaglioImmobile() {
    
  const { id } = useParams()

  return (
    <div>
      <h1>Qui ci saranno i dettagli dedicati agli immobili</h1>
      <p>ID Immobile Selezionato: {id}</p>
    </div>
  )
}