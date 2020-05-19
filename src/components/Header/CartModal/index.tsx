import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { formatPrice } from '../../../util';

import { ApplicationState } from '../../../store';

import {
  Container,
  Content,
  Total,
  CartBasket,
  Scroll,
  EmptyCart,
} from './styles';

interface Props {
  visible: boolean;
}

const HeaderModal: React.FC<Props> = ({ visible }: Props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  const total = useSelector((state: ApplicationState) =>
    formatPrice(
      state.cart.data.reduce((sumTotal: number, pokemon) => {
        return sumTotal + pokemon.price * pokemon.amount;
      }, 0),
    ),
  );

  const cart = useSelector((state: ApplicationState) =>
    state.cart.data.map(pokemon => ({
      ...pokemon,
      subtotal: formatPrice(pokemon.price * pokemon.amount),
    })),
  );
  const cartSize = useMemo(() => cart.length, [cart]);

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
export default HeaderModal;
