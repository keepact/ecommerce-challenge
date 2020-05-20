import React, { createContext, Dispatch, SetStateAction } from 'react';
import { DefaultTheme } from 'styled-components';
import poison from '../styles/themes/poison';
import { usePersistedState } from '../util/hooks';

type Props = {
  children: React.ReactNode;
};

type Store = {
  store: DefaultTheme;
  type: string;
  setTheme: Dispatch<SetStateAction<Store>>;
};

const initialStore: Store = {
  store: poison,
  type: 'type/4',
  setTheme: (): void => {
    throw new Error('setStore function must be overridden');
  },
};

const StoreContext = createContext<Store>(initialStore);

const StoreContextProvider = ({ children }: Props): JSX.Element => {
  const [theme, setTheme] = usePersistedState<Store>('theme', initialStore);

  return (
    <StoreContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
