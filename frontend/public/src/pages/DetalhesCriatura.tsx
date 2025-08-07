import { useParams } from 'react-router-dom';

function DetalhesCriatura() {
  const { id } = useParams();

  return <h1>Detalhes da Criatura ID: {id}</h1>;
}

export default DetalhesCriatura;
