import { combineReducers } from 'redux';
import wishlist from './wishlistReducer';
import compare from './compareReducer';
import cart from './cartReducer';
import userData from "./authReducer";

export default combineReducers({
  wishlist,
  compare,
  cart,
  userData
});