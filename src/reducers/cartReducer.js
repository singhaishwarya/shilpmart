import * as actionTypes from '../actions/types';

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let actionProductArray = [action.product];
      var ids = new Set(state.map(d => d.id));
      return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];
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