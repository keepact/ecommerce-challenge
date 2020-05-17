import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Pokemon } from '../store/ducks/pokemon/types';

type Props = {
  children: React.ReactNode;
};

type Context = {
  filter: Pokemon[];
  setContext: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
  filter: [],
  setContext: (): Pokemon => {
    throw new Error('setContext function must be overridden');
  },
};

const AppContext = createContext<Context>(initialContext);

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);

  return (
    <AppContext.Provider value={{ ...contextState, setContext }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
