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
  pokemon: PokemonInfo[];
}

interface PokemonInfo {
  pokemon: {
    name: string;
    url: string;
  };
}

const DashboardFlying: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function getPokemonInfo(url: string): Promise<void> {
    const formatUrl = url.replace('https://pokeapi.co/api/v2/', '');

    const response = await api.get<Pokemon>(formatUrl);
    const pokemon = response.data;

    setPokemons(currentPokemons => [...currentPokemons, pokemon]);
  }

  const getPokemonByType = useCallback(async () => {
    const response = await api.get<PokemonType>('type/3');

    const pokemonsData = response.data;
    pokemonsData.pokemon.forEach(pok => getPokemonInfo(pok.pokemon.url));
  }, []);

  useEffect(() => {
    getPokemonByType();
  }, [getPokemonByType]);

  return (
    <div>
      <PokemonList>
        {pokemons.map(pok => (
          <li key={pok.name}>
            <img src={pok.sprites.front_default} alt={pok.name} />
            <span>{pok.name}</span>
          </li>
        ))}
      </PokemonList>
    </div>
  );
};

export default DashboardFlying;
