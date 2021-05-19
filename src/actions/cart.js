import { FETCH_CART, ADD_TO_CART, REMOVE_CART } from './types';

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product: product
  }
};

export const fetchCart = (product) => {
  return {
    type: FETCH_CART,
    product: product
  }
};

export const deleteCart = (id) => {
  return {
    type: REMOVE_CART,
    id: id
  }
}
