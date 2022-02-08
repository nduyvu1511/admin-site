import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import localeSlice from './locale/localeSlice';
import modalSlice from './modal/modalSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  language: localeSlice,
  modal: modalSlice,
});

export default rootReducer;
