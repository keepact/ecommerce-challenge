import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import {
  formatPrice,
  calculateBonus,
  calculateTotal,
  calculateSubTotal,
} from '../../../util';

import { ApplicationState } from '../../../store';
import {
  Cart as CartInterface,
  CartTypes,
} from '../../../store/ducks/cart/types';

import emptyAnimation from '../../../assets/animations/empty-cart.json';
import successAnimation from '../../../assets/animations/sending-success.json';
import Animation from '../../../components/Animation';
import Modal from '../../../components/Modal';

import { Container, ProductTable, Total, EmptyCart } from './styles';

const Cart: React.FC = () => {
  const [finished, setFinished] = useState<boolean>(false);
  const [bonus, setBonus] = useState<string>('');
  const dispatch = useDispatch();

  const total: string = useSelector((state: ApplicationState) =>
    formatPrice(calculateTotal(state.cart.data)),
  );
  const cart: CartInterface[] = useSelector((state: ApplicationState) =>
    calculateSubTotal(state.cart.data),
  );
  const cartSize: number = useMemo(() => cart.length, [cart]);

  function increment(product: CartInterface): void {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount + 1,
    });
  }

  function decrement(product: CartInterface): void {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount - 1,
    });
  }

  function handleFinhesed(): void {
    const format = +total.replace('R$', '').replace(',00', '');

    setBonus(calculateBonus(format));
    setFinished(true);
  }

  function handleReset(): void {
    setFinished(false);
    dispatch({
      type: CartTypes.RESET,
    });
  }

  return (
    <Container>
      {finished && (
        <Modal
          animation={successAnimation}
          title="OBRIGADO!!"
          text={`Você ganhou de volta ${bonus} para gastar na loja`}
          buttonLabel="Ok"
          onClick={handleReset}
        />
      )}
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
                <tr key={product.id}>
                  <td>
                    <img src={product.sprites} alt={product.name} />
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </td>
                  <td>
                    <div>
                      <button type="button" onClick={() => decrement(product)}>
                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => increment(product)}>
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
        <EmptyCart>
          <Animation animation={emptyAnimation} autoplay loop />
          <h2>Seu carrinho está vazio.</h2>
        </EmptyCart>
      )}
    </Container>
  );
};

export default Cart;
