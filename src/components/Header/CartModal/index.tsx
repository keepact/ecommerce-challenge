import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Cart as CartInterface } from '../../../store/ducks/cart/types';
import { ApplicationState } from '../../../store';

import { formatPrice, calculateTotal, calculateSubTotal } from '../../../util';

import {
  Container,
  Content,
  Total,
  CartBasket,
  Scroll,
  EmptyCart,
} from './styles';

interface Props {
  visible?: boolean;
}

const CartModal: React.FC<Props> = ({ visible }: Props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  const total: string = useSelector((state: ApplicationState) =>
    formatPrice(calculateTotal(state.cart.data)),
  );
  const cart: CartInterface[] = useSelector((state: ApplicationState) =>
    calculateSubTotal(state.cart.data),
  );
  const cartSize: number = useMemo(() => cart.length, [cart]);

  const handleGoToCart = (): void => {
    history.push('/cart');
  };

  return (
    <>
      {location.pathname !== '/cart' && (
        <Container visible={visible}>
          <CartBasket>
            {cartSize === 0 ? (
              <EmptyCart>
                <h2>Seu cesta está vazia.</h2>
              </EmptyCart>
            ) : (
              <>
                <p>Minha cesta</p>
                <Scroll>
                  {cart.map(product => (
                    <Content key={product.id}>
                      <div>
                        <img src={product.sprites} alt="pokemon" />
                        <div>
                          <span>{product.name}</span>
                          <span className="qty">{`Quantidade: ${product.amount}`}</span>
                        </div>
                      </div>
                      <div>
                        <strong>{product.subtotal}</strong>
                      </div>
                    </Content>
                  ))}
                </Scroll>
                <footer>
                  <Total>
                    <div>
                      <span>TOTAL</span>
                      <strong>{total}</strong>
                    </div>
                    <button type="button" onClick={handleGoToCart}>
                      ver minha cesta
                    </button>
                  </Total>
                </footer>
              </>
            )}
          </CartBasket>
        </Container>
      )}
    </>
  );
};
export default CartModal;
