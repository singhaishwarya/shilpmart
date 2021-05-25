import { ADD_TO_WISHLIST, REMOVE_WISHLIST, EMPTY_WISHLIST } from './types';

export const addToWishlist = (wishlist) => {
  return {
    type: ADD_TO_WISHLIST,
    wishlist: wishlist
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