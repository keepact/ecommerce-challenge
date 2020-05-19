import React, { useContext, useMemo, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { AppContext } from '../../context';
import { setPage } from '../../util/helpers';

import PoisonLogo from '../../assets/images/poison-type.png';
import { Container, CartHeader, Cart, TextInput } from './styles';

const Header: React.FC = () => {
  const location = useLocation();
  const { setContext, context } = useContext(AppContext);

  const cart = useSelector((state: ApplicationState) => state.cart.data);
  const cartSize: number = useMemo(() => cart.length, [cart]);

  const { data: pokemons, page, perPage } = useSelector(
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
    <Container>
      {location.pathname !== '/cart' ? (
        <>
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
        </>
      ) : (
        <CartHeader>
          <img src={PoisonLogo} alt="poison" />
          <h3>Pokemon Type</h3>
        </CartHeader>
      )}
    </Container>
  );
};
export default Header;
