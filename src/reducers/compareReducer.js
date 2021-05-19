import * as actionTypes from '../actions/types';

export default function compareReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TO_COMPARE:
      return [
        ...state,
        Object.assign({}, action.product)
      ];
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