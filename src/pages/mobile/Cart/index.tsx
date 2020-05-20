import React, { useState, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { FilterContext } from '../../../context/filter';

import {
  formatPrice,
  calculateBonus,
  calculateTotal,
  calculateSubTotal,
} from '../../../util/helpers';

import { ApplicationState } from '../../../store';
import {
  Cart as CartInterface,
  CartTypes,
} from '../../../store/ducks/cart/types';

import emptyAnimation from '../../../assets/animations/empty-cart.json';
import successAnimation from '../../../assets/animations/sending-success.json';
import Animation from '../../../components/Animation';
import Modal from '../../../components/Modal';

import {
  ProductList,
  Product,
  Container,
  Amount,
  Total,
  EmptyCart,
  BackButton,
  CartTitle,
} from './styles';

const Cart: React.FC = () => {
  const { context, setContext } = useContext(FilterContext);
  const [finished, setFinished] = useState<boolean>(false);
  const [bonus, setBonus] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();

  const total: string = useSelector((state: ApplicationState) =>
    formatPrice(calculateTotal(state.cart.data)),
  );
  const cart = useSelector((state: ApplicationState) =>
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

  function handleFinished(): void {
    const transformPriceToNumber = +total.replace('R$', '').replace(',00', '');
    setBonus(calculateBonus(transformPriceToNumber));
    setFinished(true);
  }

  function handleReset(): void {
    setFinished(false);
    dispatch({ type: CartTypes.RESET });
    history.push('/');
    setContext({
      context: { ...context, visible: false },
      setContext: () => context,
    });
  }

  return (
    <Container>
      <BackButton>
        <button type="button" onClick={() => history.push('/')}>
          Voltar
        </button>
      </BackButton>
      {finished && (
        <Modal
          animation={successAnimation}
          title="OBRIGADO!!"
          text={`Você ganhou de volta ${bonus} para gastar na loja`}
          buttonLabel="Ok"
          onClick={handleReset}
        />
      )}
      <CartTitle>
        <h2>Minha Cesta</h2>
      </CartTitle>
      {cartSize > 0 ? (
        <>
          <ProductList>
            {cart.map(product => (
              <div key={product.id}>
                <Product>
                  <img src={product.sprites} alt="product" />
                  <div>
                    <p>{product.name}</p>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: CartTypes.REMOVE,
                        id: product.id,
                      })
                    }
                  >
                    <MdDelete size={24} />
                  </button>
                </Product>
                <Amount>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={String(product.amount)}
                    />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                  <div>
                    <span>{product.subtotal}</span>
                  </div>
                </Amount>
              </div>
            ))}
            <Total>
              <span>Total</span>
              <strong>{total}</strong>
              <button type="button" onClick={handleFinished}>
                <span>Finalizar pedido</span>
              </button>
            </Total>
          </ProductList>
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
