import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';
import { priceMath } from '../../util';
import { ApplicationState } from '../../store';
import { addToCartRequest } from '../../store/ducks/cart/actions';

// import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { PokemonList, SubmitButton, Container } from './styles';
import Cart from './Cart';

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Pokemon {
  data: PokemonDetails;
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

interface SumAmount {
  [key: string]: number;
}

const DashboardFlying: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const dispatch = useDispatch();

  const amount = useSelector((state: ApplicationState) =>
    state.cart.data.reduce((sumAmount: SumAmount, pokemon) => {
      sumAmount[pokemon.id] = pokemon.amount;

      return sumAmount;
    }, {}),
  );

  const getPokemonDetails = useCallback(async (url: string): Promise<void> => {
    const formatUrl = url.replace('https://pokeapi.co/api/v2/', '');

    const response = await api.get<PokemonDetails>(formatUrl);
    const pokemon = {
      data: response.data,
      price: priceMath(),
    };

    setPokemons(currentPokemons => [...new Set(currentPokemons), pokemon]);
  }, []);

  const getPokemonByType = useCallback(async (): Promise<void> => {
    const response = await api.get<PokemonType>('type/3');

    const pokemonsData = response.data;
    pokemonsData.pokemon.forEach(pok => getPokemonDetails(pok.pokemon.url));
  }, [getPokemonDetails]);

  useEffect(() => {
    getPokemonByType();
  }, [getPokemonByType]);

  const handleAddProduct = (pokemon: Pokemon): void => {
    dispatch(addToCartRequest(pokemon));
  };

  return (
    <Container>
      <PokemonList>
        {pokemons.map(pokemon => (
          <li key={pokemon.data.id}>
            <img
              src={
                pokemon.data.sprites.front_default ??
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={pokemon.data.name}
            />
            <strong>{pokemon.data.name}</strong>
            <span>{pokemon.price}</span>

            <SubmitButton onClick={() => handleAddProduct(pokemon)}>
              <div>
                <MdShoppingCart size={16} color="#FFF" />
                {amount[pokemon.data.id] || 0}
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
