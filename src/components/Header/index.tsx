import React, { useContext, useMemo, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { AppContext } from '../../context/filter';
import { StoreContext } from '../../context/store';

import poison from '../../styles/themes/poison';
import ground from '../../styles/themes/ground';
import ghost from '../../styles/themes/ghost';
import flying from '../../styles/themes/flying';

import { setPage } from '../../util/helpers';

import { Container, CartHeader, Cart, TextInput, GroupButtons } from './styles';

const Header: React.FC = () => {
  const location = useLocation();
  const { context, setContext } = useContext(AppContext);
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

    if (event.currentTarget.value !== '') {
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

  const changeStore = (type: string) => {
    switch (type) {
      case 'poison':
        return poison;
      case 'flying':
        return flying;
      case 'ghost':
        return ghost;
      case 'ground':
        return ground;
      default:
        return poison;
    }
  };

  const handleChangeStore = (name: string, type: string) => {
    const choonsenStore = changeStore(name);
    setTheme({
      store: choonsenStore,
      type,
      setTheme: () => choonsenStore,
    });
  };

  return (
    <>
      {location.pathname !== '/cart' ? (
        <>
          <Container>
            <TextInput type="text" onChange={handleSearch} />
            <Cart>
              <div>
                <strong>Meu carrinho</strong>
                <span>{`${cartSize} itens`}</span>
              </div>
              <button type="button" onClick={handleToggleVisible}>
                <MdShoppingBasket size={36} color="#000" />
              </button>
            </Cart>
            <CartModal />
          </Container>
          <GroupButtons>
            <div>
              <button
                type="button"
                onClick={() => handleChangeStore('flying', 'type/3')}
              >
                Flying
              </button>
              <button
                type="button"
                onClick={() => handleChangeStore('ground', 'type/5')}
              >
                Ground
              </button>
              <button
                type="button"
                onClick={() => handleChangeStore('ghost', 'type/8')}
              >
                Ghost
              </button>
              <button
                type="button"
                onClick={() => handleChangeStore('poison', 'type/4')}
              >
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
