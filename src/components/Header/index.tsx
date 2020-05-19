import React, { useContext, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './Modal';

import { ApplicationState } from '../../store';

import { Container, Cart, TextInput } from './styles';
import { AppContext } from '../../context';
import { setPage } from '../../util';

const Header: React.FC = () => {
  const { setContext } = useContext(AppContext);

  const cartSize = useSelector(
    (state: ApplicationState) => state.cart.data.length,
  );
  const { data: pokemons, page, perPage } = useSelector(
    (state: ApplicationState) => state.pokemon,
  );

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
    setContext({ filter: newList, setContext: () => newList });
  };

  return (
    <Container>
      <TextInput type="text" onChange={handleSearch} />
      <Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span>{`${cartSize} itens`}</span>
        </div>
        <MdShoppingBasket size={36} color="#000" />
      </Cart>
      <CartModal />
    </Container>
  );
};
export default Header;
