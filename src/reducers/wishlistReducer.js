import * as actionTypes from '../actions/types';

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_WISHLIST:
      let actionProductArray = [action.product];
      var ids = new Set(state.map(d => d.id));
      return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];

    case actionTypes.REMOVE_WISHLIST:
      return state.filter((data, i) =>
        data.id !== action.id
      );

    case actionTypes.EMPTY_WISHLIST:
      return action.wishlist.splice(0, action.wishlist.length);

    default:
      return state;
  }
};