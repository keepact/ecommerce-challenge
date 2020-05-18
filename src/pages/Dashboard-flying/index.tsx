import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice, setPage } from '../../util';
import { ApplicationState } from '../../store';
import { CartTypes } from '../../store/ducks/cart/types';
import { PokemonTypes, Pokemon } from '../../store/ducks/pokemon/types';
import { AppContext } from '../../context';

import { Screen, Container, PokemonList, SubmitButton } from './styles';
import Cart from './Cart';

import loadingAnimation from '../../assets/animations/pokemon-loading.json';
import Animation from '../../components/Animation';
import PageActions from '../../components/Pagination';

interface SumAmount {
  [key: string]: number;
}

const DashboardFlying: React.FC = () => {
  const { filter, setContext } = useContext(AppContext);
  const dispatch = useDispatch();

  const amount = useSelector((state: ApplicationState) =>
    state.cart.data.reduce((sumAmount: SumAmount, pokemon) => {
      sumAmount[pokemon.id] = pokemon.amount;

      return sumAmount;
    }, {}),
  );

  const { data: pokemons, loading, page, perPage, lastPage } = useSelector(
    (state: ApplicationState) => state.pokemon,
  );

  const loadPokemons = useCallback(
    (data: Pokemon[]) => {
      const arrayPaginate = setPage({ page, perPage, array: data });
      setContext({ filter: arrayPaginate, setContext: () => arrayPaginate });
    },
    [setContext, page, perPage],
  );

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

  const handleChangePage = (pageNumber: number): void => {
    const arrayPaginate = setPage({
      page: page + 1,
      perPage,
      array: pokemons,
    });
    dispatch({ type: PokemonTypes.CHANGE_PAGE, page: pageNumber });
    setContext({ filter: arrayPaginate, setContext: () => arrayPaginate });
  };

  return (
    <Screen>
      {loading ? (
        <Animation animation={loadingAnimation} autoplay loop />
      ) : (
        <Container>
          <PokemonList>
            {filter.map(pokemon => (
              <div key={pokemon.id}>
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
              </div>
            ))}
          </PokemonList>
          <Cart />
        </Container>
      )}
      <PageActions
        disableNext={lastPage === page}
        disableBack={page < 2}
        pageLabel={page}
        refresh={handleChangePage}
        currentPage={page}
      />
    </Screen>
  );
};

export default DashboardFlying;
