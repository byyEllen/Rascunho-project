import { useEffect, useState } from 'react';
import axios from 'axios';

interface Creature {
  _id: string;
  name: string;
  type: string;
  description: string;
}

const CreatureListPage = () => {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    const fetchCreatures = async () => {
      try {
        const response = await axios.get<Creature[]>('http://localhost:3000/api/creatures');
        setCreatures(response.data);
      } catch (error) {
        console.error('Erro ao buscar criaturas:', error);
      }
    };

    fetchCreatures();
  }, []);

  return (
    <div className="creature-list-container">
      <h2>Lista de Criaturas</h2>
      <ul>
        {creatures.map((creature) => (
          <li key={creature._id}>
            <strong>{creature.name}</strong> - {creature.type}
            <p>{creature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatureListPage;
