// Action Types
export enum CartTypes {
  ADD_REQUEST = '@cart/ADD_REQUEST',
  ADD_SUCCESS = '@cart/ADD_SUCCESS',
  UPDATE_AMOUNT_REQUEST = '@cart/UPDATE_AMOUNT_REQUEST',
  UPDATE_AMOUNT_SUCCESS = '@cart/UPDATE_AMOUNT_SUCCESS',
  REMOVE = '@cart/REMOVE',
  RESET = '@cart/RESET',
}

// Data Types
export interface Cart {
  id: number;
  name: string;
  sprites: string;
  price: number;
  amount: number;
  subtotal?: string;
}

// State Type
export interface CartState {
  readonly data: Cart[];
  readonly loading: boolean;
  readonly error: boolean;
}
