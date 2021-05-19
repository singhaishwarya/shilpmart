import * as actionTypes from '../actions/types';

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return [
        ...state,
        Object.assign({}, action.product)
      ];
    case actionTypes.REMOVE_CART:
      return state.filter((data, i) =>
        data.id !== action.id
      );
    case actionTypes.FETCH_CART:
      return action.product;
    default:
      return state;
  }
};