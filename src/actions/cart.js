import { ADD_TO_CART, REMOVE_CART, EMPTY_CART } from './types';

export const addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart: cart
  }
};

export const deleteCart = (id) => {
  return {
    type: REMOVE_CART,
    id: id
  }
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  }
}