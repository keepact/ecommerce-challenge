import React from 'react';
import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';
import { ApplicationState } from '../../store';

import { Container, Cart, TextInput } from './styles';

const Header: React.FC = () => {
  const cartSize = useSelector(
    (state: ApplicationState) => state.cart.data.length,
  );

  return (
    <Container>
      <TextInput type="text" />
      <Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span>{`${cartSize} itens`}</span>
        </div>
        <MdShoppingBasket size={36} color="#000" />
      </Cart>
    </Container>
  );
};
export default Header;
