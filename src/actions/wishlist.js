import { ADD_TO_WISHLIST, DELETE_WISHLIST, EMPTY_WISHLIST } from './types';

export const addToWishlist = (wishlist) => {
  return {
    type: ADD_TO_WISHLIST,
    wishlist: wishlist
  }
};

export const deleteWishlist = (id) => {
  return {
    type: DELETE_WISHLIST,
    id: id
  }
}

export const emptyWishlist = () => {
  return {
    type: EMPTY_WISHLIST
  }
}