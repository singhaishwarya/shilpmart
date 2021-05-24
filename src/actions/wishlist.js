import { ADD_TO_WISHLIST, REMOVE_WISHLIST, EMPTY_WISHLIST } from './types';

export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    product: product
  }
};

export const deleteWishlist = (id) => {
  return {
    type: REMOVE_WISHLIST,
    id: id
  }
}

export const emptyWishlist = () => {
  return {
    type: EMPTY_WISHLIST
  }
}