// Action Types
export enum PokemonTypes {
  GET_REQUEST = '@pokemon/GET_REQUEST',
  GET_SUCCESS = '@pokemon/GET_SUCCESS',
  GET_ERROR = '@pokemon/GET_ERROR',
}

// Data Types
export interface Pokemon {
  id: number;
  name: string;
  sprites: string;
  price: number;
  stock: number;
}

// State Type
export interface PokemonState {
  readonly data: Pokemon[];
  readonly loading: boolean;
  readonly error: boolean;
}
