import { FETCH_WISHLIST, ADD_TO_WISHLIST, REMOVE_WISHLIST } from './types';

export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    product: product
  }
};

export const fetchWishlist = (product) => {
  return {
    type: FETCH_WISHLIST,
    product: product
  }
};

export const deleteWishlist = (id) => {
  return {
    type: REMOVE_WISHLIST,
    id: id
  }
}
