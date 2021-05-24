import { ADD_TO_CART, REMOVE_CART, EMPTY_CART } from './types';

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product: product
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