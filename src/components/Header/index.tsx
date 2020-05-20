import React, { useContext, useMemo, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { FilterContext } from '../../context/filter';
import { StoreContext } from '../../context/store';

import { setPage, changeStore } from '../../util/helpers';

import { Container, CartHeader, Cart, TextInput, GroupButtons } from './styles';

const Header: React.FC = () => {
  const location = useLocation();
  const { context, setContext } = useContext(FilterContext);
  const { setTheme } = useContext(StoreContext);

  const { logo } = useContext(ThemeContext);

  const cart = useSelector((state: ApplicationState) => state.cart.data);
  const cartSize: number = useMemo(() => cart.length, [cart]);

  const { data: pokemons, pokemonType, page, perPage } = useSelector(
    (state: ApplicationState) => state.pokemon,
  );

  function handleToggleVisible() {
    setContext({
      context: { ...context, visible: !context.visible },
      setContext: () => context,
    });
  }

  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    let newList: Pokemon[];

    if (event.currentTarget.value) {
      newList = pokemons.filter(item => {
        const data = item.name.toLowerCase();
        const inputValue = event.currentTarget.value.toLowerCase();
        return data.includes(inputValue);
      });
    } else {
      newList = setPage({ page, perPage, array: pokemons });
    }
    setContext({
      context: { ...context, filter: newList },
      setContext: () => context,
    });
  };

  const handleChangeStore = (name: string) => {
    const choonsenStore = changeStore(name);
    const theme = {
      store: choonsenStore,
      type: choonsenStore.path,
    };

    setTheme({
      store: theme.store,
      type: theme.type,
      setTheme: () => theme,
    });
  };

  return (
    <>
      {location.pathname !== '/cart' ? (
        <>
          <Container>
            <TextInput type="text" onChange={handleSearch} />
            <Cart>
              <button type="button" onClick={handleToggleVisible}>
                <MdShoppingBasket size={36} color="#000" />
                <span>{cartSize}</span>
              </button>
            </Cart>
            <CartModal />
          </Container>
          <GroupButtons>
            <div>
              <button type="button" onClick={() => handleChangeStore('flying')}>
                Flying
              </button>
              <button type="button" onClick={() => handleChangeStore('ground')}>
                Ground
              </button>
              <button type="button" onClick={() => handleChangeStore('ghost')}>
                Ghost
              </button>
              <button type="button" onClick={() => handleChangeStore('poison')}>
                Poison
              </button>
            </div>
          </GroupButtons>
        </>
      ) : (
        <Container>
          <CartHeader>
            <img src={logo} alt={pokemonType} />
            <h3>{pokemonType}</h3>
          </CartHeader>
        </Container>
      )}
    </>
  );
};
export default Header;
