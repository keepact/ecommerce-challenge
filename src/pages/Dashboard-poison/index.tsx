import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface PokemonType {
  name: string;
  pokemon: Pokemon[];
}

interface Pokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

const DashboardPoison: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonType | undefined>(undefined);

  async function handleGetRepositories(): Promise<void> {
    const response = await api.get<PokemonType>('type/4');

    const pokemonsData = response.data;
    setPokemons(pokemonsData);
  }

  useEffect(() => {
    handleGetRepositories();
  }, []);

  return (
    <div>
      <h1>{pokemons?.name}</h1>
      <ul>
        {pokemons?.pokemon.map(pok => (
          <li>{pok.pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPoison;
