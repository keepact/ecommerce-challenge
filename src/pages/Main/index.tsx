import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice, setPage, calculateAmount } from '../../util';
import { ApplicationState } from '../../store';
import { CartTypes } from '../../store/ducks/cart/types';
import { PokemonTypes, Pokemon } from '../../store/ducks/pokemon/types';
import { AppContext } from '../../context';

import loadingAnimation from '../../assets/animations/pokemon-loading.json';
import Animation from '../../components/Animation';
import PageActions from '../../components/Pagination';
import Cart from './Cart';

import { Screen, Container, PokemonList, SubmitButton } from './styles';

const Main: React.FC = () => {
  const {
    context,
    context: { filter },
    setContext,
  } = useContext(AppContext);
  const dispatch = useDispatch();

  const amount = useSelector((state: ApplicationState) =>
    calculateAmount(state.cart.data),
  );

  const { data: pokemons, loading, page, perPage, lastPage } = useSelector(
    (state: ApplicationState) => state.pokemon,
  );

  const loadPokemons = useCallback(
    (data: Pokemon[]): void => {
      const arrayPaginate = setPage({ page, perPage, array: data });
      const state = { filter: arrayPaginate, visible: false };
      setContext({ context: state, setContext: () => state });
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
    dispatch({ type: PokemonTypes.CHANGE_PAGE, page: pageNumber });
    const arrayPaginate = setPage({
      page,
      perPage,
      array: pokemons,
    });
    setContext({
      context: { ...context, filter: arrayPaginate },
      setContext: () => context,
    });
  };

  return (
    <Screen>
      {loading ? (
        <Animation animation={loadingAnimation} autoplay loop />
      ) : (
        <>
          <Container>
            <PokemonList>
              {filter.map(pokemon => (
                <div key={pokemon.id}>
                  <img src={pokemon.sprites} alt={pokemon.name} />
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
          <PageActions
            disableNext={lastPage === page}
            disableBack={page < 2}
            pageLabel={page}
            refresh={handleChangePage}
            currentPage={page}
            lastPage={lastPage}
          />
        </>
      )}
    </Screen>
  );
};

export default Main;
