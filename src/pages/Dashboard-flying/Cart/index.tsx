import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../../util';
import { ApplicationState } from '../../../store';
import { Cart as CartType, CartTypes } from '../../../store/ducks/cart/types';
import { Container, ProductTable, Total } from './styles';

import emptyAnimation from '../../../assets/animations/empty-cart.json';
import Animation from '../../../components/Animation';

const Cart: React.FC = () => {
  const [finished, setFinished] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  function increment(product: CartType) {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount + 1,
    });
  }

  function decrement(product: CartType) {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount - 1,
    });
  }

  function handleFinhesed() {
    setFinished(true);
    dispatch({
      type: CartTypes.RESET,
    });
  }

  return (
    <Container>
      {finished ? (
        <div>
          <h2>Sua compra foi processada, obrigado pela confiança!</h2>
        </div>
      ) : (
        <>
          {cartSize > 0 ? (
            <>
              <ProductTable>
                <thead>
                  <tr>
                    <th className="display">none</th>
                    <th>PRODUTO</th>
                    <th>QTD</th>
                    <th>SUBTOTAL</th>
                    <th className="display">none</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr>
                      <td>
                        <img src={product.sprites} alt={product.name} />
                      </td>
                      <td>
                        <strong>{product.name}</strong>
                        <span>{formatPrice(product.price)}</span>
                      </td>
                      <td>
                        <div>
                          <button
                            type="button"
                            onClick={() => decrement(product)}
                          >
                            <MdRemoveCircleOutline size={20} color="#7159c1" />
                          </button>
                          <input
                            type="number"
                            readOnly
                            value={product.amount}
                          />
                          <button
                            type="button"
                            onClick={() => increment(product)}
                          >
                            <MdAddCircleOutline size={20} color="#7159c1" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{product.subtotal}</strong>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: CartTypes.REMOVE,
                              id: product.id,
                            })
                          }
                        >
                          <MdDelete size={20} color="#7159c1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ProductTable>

              <footer>
                <button type="button" onClick={() => handleFinhesed()}>
                  Finalizar pedido
                </button>

                <Total>
                  <span>TOTAL</span>
                  <strong>{total}</strong>
                </Total>
              </footer>
            </>
          ) : (
            <div>
              <Animation animation={emptyAnimation} autoplay loop />
              <h2>Seu carrinho está vazio.</h2>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;
