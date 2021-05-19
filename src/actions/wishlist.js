import { FETCH_WISHLIST, ADD_WISHLIST, REMOVE_WISHLIST } from './types';

export const addWishlist = (product) => {
  return {
    type: ADD_WISHLIST,
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
