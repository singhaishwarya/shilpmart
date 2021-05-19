import * as actionTypes from '../actions/types';

export default function compareReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_COMPARE:
      let actionProductArray = [action.product];
      var ids = new Set(state.map(d => d.id));
      return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];
    case actionTypes.REMOVE_COMPARE:
      return state.filter((data, i) =>
        data.id !== action.id
      );
    case actionTypes.FETCH_COMPARE:
      return action.product;
    default:
      return state;
  }
};