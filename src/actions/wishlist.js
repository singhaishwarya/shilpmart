import { ADD_TO_WISHLIST, DELETE_WISHLIST, EMPTY_WISHLIST } from './types';

export const addToWishlist = (wishlist) => {
  return {
    type: ADD_TO_WISHLIST,
    wishlist: wishlist
  }
};

export const deleteWishlist = (wishlist) => {
  return {
    type: DELETE_WISHLIST,
    wishlist: wishlist
  }
}

export const emptyWishlist = () => {
  return {
    type: EMPTY_WISHLIST
  }
}