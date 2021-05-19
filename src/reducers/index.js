import { combineReducers } from 'redux';
import wishlist from './wishlistReducer';
import compare from './compareReducer';
import cart from './cartReducer';

export default combineReducers({
  wishlist: wishlist,
  compare: compare,
  cart: cart
});