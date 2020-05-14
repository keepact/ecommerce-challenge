import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

import { PokemonList } from './styles';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonType {
  name: string;
  pokemon: PokemonTypeInfo[];
}

interface PokemonTypeInfo {
  pokemon: {
    name: string;
    url: string;
  };
}

const DashboardGhost: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function getPokemonDetails(url: string): Promise<void> {
    const formatUrl = url.replace('https://pokeapi.co/api/v2/', '');

    const response = await api.get<Pokemon>(formatUrl);
    const pokemon = response.data;

    setPokemons(currentPokemons => [...currentPokemons, pokemon]);
  }

  const getPokemonByType = useCallback(async (): Promise<void> => {
    const response = await api.get<PokemonType>('type/8');

    const pokemonsData = response.data;
    pokemonsData.pokemon.forEach(pok => getPokemonDetails(pok.pokemon.url));
  }, []);

  useEffect(() => {
    getPokemonByType();
  }, [getPokemonByType]);

  return (
    <PokemonList>
      {pokemons.map(pokemon => (
        <li key={pokemon.name}>
          <img
            src={
              pokemon.sprites.front_default ??
              'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
            alt={pokemon.name}
          />
          <span>{pokemon.name}</span>
        </li>
      ))}
    </PokemonList>
  );
};

export default DashboardGhost;
