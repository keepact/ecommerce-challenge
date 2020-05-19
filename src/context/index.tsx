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

interface State {
  filter: Pokemon[];
  visible: boolean;
}

type Context = {
  context: State;
  setContext: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
  context: { filter: [], visible: false },
  setContext: (): void => {
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
