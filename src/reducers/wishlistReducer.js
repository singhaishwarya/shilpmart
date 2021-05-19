import * as actionTypes from '../actions/types';

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_WISHLIST:
      return [
        ...state,
        Object.assign({}, action.product)
      ];
    case actionTypes.REMOVE_WISHLIST:
      return state.filter((data, i) =>
        data.id !== action.id
      );
    case actionTypes.FETCH_WISHLIST:
      return action.product;
    default:
      return state;
  }
};