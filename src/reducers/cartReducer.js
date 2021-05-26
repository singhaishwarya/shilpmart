import * as actionTypes from '../actions/types';

export default function cartReducer(state = [], action) {
  switch (action.type) {

    case actionTypes.ADD_TO_CART:
      let actionProductArray = [action.cart],
        ids = new Set(state.map(d => d.id));
      return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];

    case actionTypes.DELETE_CART:
      return state.filter((data, i) =>
        data.id !== action.id
      );

    case actionTypes.EMPTY_CART:
      return action.cart = [];


    default:
      return state;
  }
};