import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

import { PokemonList } from './styles';

interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Pokemon {
  data: PokemonResponse;
  price: number;
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

const DashboardPoison: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const priceMath = (): number => {
    const min = 12;
    const max = 100;
    const randomPrice = Math.floor(Math.random() * (+max - +min)) + +min;
    return randomPrice;
  };

  const getPokemonDetails = useCallback(async (url: string): Promise<void> => {
    const formatUrl = url.replace('https://pokeapi.co/api/v2/', '');

    const response = await api.get<PokemonResponse>(formatUrl);
    const pokemon = {
      data: response.data,
      price: priceMath(),
    };

    setPokemons(currentPokemons => [...currentPokemons, pokemon]);
  }, []);

  const getPokemonByType = useCallback(async (): Promise<void> => {
    const response = await api.get<PokemonType>('type/4');

    const pokemonsData = response.data;
    pokemonsData.pokemon.forEach(pok => getPokemonDetails(pok.pokemon.url));
  }, [getPokemonDetails]);

  useEffect(() => {
    getPokemonByType();
  }, [getPokemonByType]);

  return (
    <PokemonList>
      {pokemons.map(pokemon => (
        <li key={pokemon.data.name}>
          <img
            src={
              pokemon.data.sprites.front_default ??
              'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
            alt={pokemon.data.name}
          />
          <strong>{pokemon.data.name}</strong>
          <span>{pokemon.price}</span>
        </li>
      ))}
    </PokemonList>
  );
};

export default DashboardPoison;
