import * as actionTypes from '../actions/types';

export default function compareReducer(state = [], action) {
  switch (action.type) {

    case actionTypes.ADD_TO_COMPARE:
      let final;
      const result = state.find(({ product, variation_index }) => (product === action.compare.product && variation_index === action.compare.variation_index));
      if (result === undefined) {
        final = [...state, ...[action.compare]];
      }
      else {
        final = state;
      }
      return final;
    // let actionProductArray = [action.compare],
    //   ids = new Set(state.map(d => d.id));
    // return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];

    case actionTypes.DELETE_COMPARE:
      let finArr = [];
      state.map((data) => {
        if ((data.product === action.compare.product) && (data.variation_index === action.compare.variation_index)) return
        else finArr.push(data)
      })
      return finArr;
    // return state.filter((data, i) =>
    //   data.id !== action.id
    // );

    case actionTypes.EMPTY_COMPARE:
      return action.compare = [];

    default:
      return state;
  }
}