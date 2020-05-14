import React, { useState, useEffect, useCallback } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util';
// import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { PokemonList, SubmitButton, Container } from './styles';
import Cart from './Cart';

interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Pokemon {
  data: PokemonResponse;
  price: string;
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

const DashboardFlying: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const priceMath = (): string => {
    const min = 12;
    const max = 100;
    const randomPrice = Math.floor(Math.random() * (+max - +min)) + +min;
    return formatPrice(randomPrice);
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
    const response = await api.get<PokemonType>('type/3');

    const pokemonsData = response.data;
    pokemonsData.pokemon.forEach(pok => getPokemonDetails(pok.pokemon.url));
  }, [getPokemonDetails]);

  useEffect(() => {
    getPokemonByType();
  }, [getPokemonByType]);

  return (
    <Container>
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

            <SubmitButton>
              <div>
                <MdShoppingCart size={16} color="#FFF" />
              </div>
              <span>ADICIONAR</span>
            </SubmitButton>
          </li>
        ))}
      </PokemonList>
      <Cart />
    </Container>
  );
};

export default DashboardFlying;
