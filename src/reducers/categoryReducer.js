import { FETCH_CATEGORY } from '../actions/types';

export default function categoryReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.category;
    default:
      return state;
  }
};