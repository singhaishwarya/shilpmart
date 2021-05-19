import { combineReducers } from 'redux';
import category from './categoryReducer';
import wishlist from './wishlistReducer';
import compare from './compareReducer';

export default combineReducers({
  category: category,
  wishlist: wishlist,
  compare: compare
});