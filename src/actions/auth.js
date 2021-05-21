import { USER_DETAIL, LOGOUT } from './types';

export const userDetail = (user) => {
  return {
    type: USER_DETAIL,
    user
  }
};
export const logout = (user) => {
  return {
    type: LOGOUT,
    user
  }
};


