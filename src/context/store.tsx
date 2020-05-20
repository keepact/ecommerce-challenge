import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type Props = {
  children: React.ReactNode;
};

interface StoreState {
  type: string;
}

type Store = {
  store: StoreState;
  setStore: Dispatch<SetStateAction<Store>>;
};

const initialStore: Store = {
  store: { type: 'type/4' },
  setStore: (): void => {
    throw new Error('setStore function must be overridden');
  },
};

const StoreContext = createContext<Store>(initialStore);

const StoreContextProvider = ({ children }: Props): JSX.Element => {
  const [storeState, setStore] = useState<Store>(initialStore);

  return (
    <StoreContext.Provider value={{ ...storeState, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
