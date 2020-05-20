import React, { useContext, useMemo, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { AppContext } from '../../context';
import { setPage } from '../../util/helpers';

import { Container, CartHeader, Cart, TextInput, GroupButtons } from './styles';

interface Props {
  changeStore(store: string): void;
}

const Header: React.FC<Props> = ({ changeStore }) => {
  const location = useLocation();
  const { setContext, context } = useContext(AppContext);
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
              <button type="button" onClick={() => changeStore('flying')}>
                Flying
              </button>
              <button type="button" onClick={() => changeStore('ground')}>
                Ground
              </button>
              <button type="button" onClick={() => changeStore('ghost')}>
                Ghost
              </button>
              <button type="button" onClick={() => changeStore('poison')}>
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
