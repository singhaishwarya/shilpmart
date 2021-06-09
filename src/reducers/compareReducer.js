import * as actionTypes from '../actions/types';

export default function compareReducer(state = [], action) {
  switch (action.type) {

    case actionTypes.ADD_TO_COMPARE:
      let actionProductArray = [action.compare],
        ids = new Set(state.map(d => d.id));
      return [...state, ...actionProductArray.filter(d => !ids.has(d.id))];

    case actionTypes.DELETE_COMPARE:
      return state.filter((data, i) =>
        data.id !== action.id
      );

    case actionTypes.EMPTY_COMPARE:
      return action.compare = [];

    default:
      return state;
  }
}