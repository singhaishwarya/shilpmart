import { ADD_TO_CART, DELETE_CART, EMPTY_CART } from './types';

export const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart: cart
  }
};

export const deleteCart = (cart) => {
  return {
    type: DELETE_CART,
    cart: cart
  }
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  }
}