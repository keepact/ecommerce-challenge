import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util';
import { ApplicationState } from '../../store';
import { CartTypes } from '../../store/ducks/cart/types';
import { PokemonTypes, Pokemon } from '../../store/ducks/pokemon/types';

// import { FaSpinner } from 'react-icons/fa';
import { PokemonList, SubmitButton, Container } from './styles';
import Cart from './Cart';

interface SumAmount {
  [key: string]: number;
}

const DashboardFlying: React.FC = () => {
  const [filter, setFilter] = useState<Pokemon[]>([]);
  const dispatch = useDispatch();

  const amount = useSelector((state: ApplicationState) =>
    state.cart.data.reduce((sumAmount: SumAmount, pokemon) => {
      sumAmount[pokemon.id] = pokemon.amount;

      return sumAmount;
    }, {}),
  );

  const { data: pokemons } = useSelector(
    (state: ApplicationState) => state.pokemon,
  );

  const loadPokemons = useCallback((data: Pokemon[]) => {
    setFilter(data);
  }, []);

  useEffect(() => {
    dispatch({
      type: PokemonTypes.GET_REQUEST,
      payload: 'type/3',
    });
  }, [dispatch]);

  useEffect(() => {
    loadPokemons(pokemons);
  }, [loadPokemons, pokemons]);

  const handleAddProduct = (pokemon: Pokemon): void => {
    dispatch({
      type: CartTypes.ADD_REQUEST,
      payload: pokemon,
    });
  };

  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    let newList: Pokemon[];

    if (event.currentTarget.value !== '') {
      newList = pokemons.filter(item => {
        const data = item.name.toLowerCase();
        const inputValue = event.currentTarget.value.toLowerCase();
        return data.includes(inputValue);
      });
    } else {
      newList = pokemons;
    }
    setFilter(newList);
  };

  return (
    <Container>
      <div>
        <input type="text" onChange={handleSearch} />
      </div>
      <PokemonList>
        {filter.map(pokemon => (
          <li key={pokemon.id}>
            <img
              src={
                pokemon.sprites ??
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={pokemon.name}
            />
            <strong>{pokemon.name}</strong>
            <span>{formatPrice(pokemon.price)}</span>

            <SubmitButton onClick={() => handleAddProduct(pokemon)}>
              <div>
                <MdShoppingCart size={16} color="#FFF" />
                {amount[pokemon.id] || 0}
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
