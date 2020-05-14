import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart, TextInput } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <TextInput type="text" />
      <Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span> 0 itens</span>
        </div>
        <MdShoppingBasket size={36} color="#000" />
      </Cart>
    </Container>
  );
};
export default Header;
