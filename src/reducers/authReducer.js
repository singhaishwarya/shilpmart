import * as actionTypes from '../actions/types';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.USER_DETAIL:
      return action.user;

    case actionTypes.LOGOUT:
      return action.user = {};

    default:
      return state;
  }
};