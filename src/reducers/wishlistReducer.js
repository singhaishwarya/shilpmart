import * as actionTypes from '../actions/types';

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      let actionProductArray = [action.wishlist],
        ids = new Set(state.map(d => d)),
        final = [...state, ...actionProductArray.filter(d => (
          !ids.has(d)
        ))]
      return final;

    case actionTypes.DELETE_WISHLIST:
      return state.filter((data, i) =>
        data !== action.id
      );

    case actionTypes.EMPTY_WISHLIST:
      return action.wishlist = [];

    default:
      return state;
  }
}