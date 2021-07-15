import * as actionTypes from '../actions/types';

export default function cartReducer(state = [], action) {
  switch (action.type) {

    case actionTypes.ADD_TO_CART:
      let final;
      const result = state.find(({ product, variation_index }) => (product === action.cart.product && variation_index === action.cart.variation_index));
      if (result === undefined) {
        final = [...state, ...[action.cart]];
      }
      else {
        final = state;
      }
      return final;
    // let actionProductArray = [action.cart],
    //   ids = new Set(state.map(d => d)),
    //   final = [...state, ...actionProductArray.filter(d => (
    //     !ids.has(d)
    //   ))]
    // return final;

    case actionTypes.DELETE_CART:

      // return state.filter((data, i) =>
      //   data !== action.id
      // );
      let finArr = [];
      state.map((data) => {
        if ((data.product === action.cart.product) && (data.variation_index === action.cart.variation_index)) return
        else finArr.push(data)
      })
      return finArr;

    case actionTypes.EMPTY_CART:
      return action.cart = [];


    default:
      return state;
  }
}