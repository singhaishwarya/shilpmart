import { combineReducers } from 'redux';
import wishlist from './wishlistReducer';
import compare from './compareReducer';
import cart from './cartReducer';
import userData from "./authReducer";
import { connectRouter } from 'connected-react-router'
import { history } from './history'

export default combineReducers({
  router: connectRouter(history),
  wishlist,
  compare,
  cart,
  userData
});