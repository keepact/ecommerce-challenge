import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  FormEvent,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Pokemon } from '../../store/ducks/pokemon/types';
import CartModal from './CartModal';

import { ApplicationState } from '../../store';
import { AppContext } from '../../context';
import { setPage } from '../../util/helpers';

import poisonLogo from '../../assets/images/poison-type.png';
import groundLogo from '../../assets/images/ground-type.png';
import flyingLogo from '../../assets/images/flying-type.png';
import ghostLogo from '../../assets/images/ghost-type.png';

import { Container, CartHeader, Cart, TextInput } from './styles';

const Header: React.FC = () => {
  const location = useLocation();
  const [logo, setLogo] = useState<string>(poisonLogo);
  const { setContext, context } = useContext(AppContext);

  const cart = useSelector((state: ApplicationState) => state.cart.data);
  const cartSize: number = useMemo(() => cart.length, [cart]);

  const { data: pokemons, pokemonType, page, perPage } = useSelector(
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

  const setPokemonLogo = useCallback((type: string) => {
    switch (type) {
      case 'poison':
        return poisonLogo;
      case 'flying':
        return flyingLogo;
      case 'ghost':
        return ghostLogo;
      case 'ground':
        return groundLogo;
      default:
        return poisonLogo;
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/cart') {
      setLogo(setPokemonLogo(pokemonType));
    }
  }, [setPokemonLogo, pokemonType, location.pathname]);

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
          <img src={logo} alt={pokemonType} />
          <h3>{pokemonType}</h3>
        </CartHeader>
      )}
    </Container>
  );
};
export default Header;
