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

interface ContextState {
  filter: Pokemon[];
  visible: boolean;
}
type Context = {
  context: ContextState;
  setContext: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
  context: { filter: [], visible: false },
  setContext: (): void => {
    throw new Error('setContext function must be overridden');
  },
};

const FilterContext = createContext<Context>(initialContext);

const FilterContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);

  return (
    <FilterContext.Provider value={{ ...contextState, setContext }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };
