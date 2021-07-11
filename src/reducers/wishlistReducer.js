import * as actionTypes from '../actions/types';

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      let finalAddedWishlist;
      const result = state.find(({ product, variationIndex }) => (product === action.wishlist.product && variationIndex === action.wishlist.variationIndex));
      if (result === undefined) {
        finalAddedWishlist = [...state, ...[action.wishlist]];
      }
      else {
        finalAddedWishlist = state;
      }
      return finalAddedWishlist;

    case actionTypes.DELETE_WISHLIST:
      let finArr = [];
      state.map((data) => {
        if ((data.product === action.wishlist.product) && (data.variationIndex === action.wishlist.variationIndex)) return
        else finArr.push(data)
      })
      return finArr;

    case actionTypes.EMPTY_WISHLIST:
      return action.wishlist = [];

    default:
      return state;
  }
}