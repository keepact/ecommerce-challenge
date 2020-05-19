import React, { useContext, useMemo, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { AppContext } from '../../context';
import { setPage } from '../../util';

import { Container, Cart, TextInput } from './styles';

const Header: React.FC = () => {
  const {
    setContext,
    context,
    context: { visible },
  } = useContext(AppContext);

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
      <CartModal visible={visible} />
    </Container>
  );
};
export default Header;
