import { combineReducers } from 'redux';
import wishlist from './wishlistReducer';
import compare from './compareReducer';
import cart from './cartReducer';
import auth from "./auth";

export default combineReducers({
  wishlist,
  compare,
  cart,
  auth
});