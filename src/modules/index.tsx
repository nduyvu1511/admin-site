import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import localeSlice from './locale/localeSlice';
import modalSlice from './modal/modalSlice';
import productSlice from './product/productSlice';
import themeSlice from './theme/themeSlice';
import userSlice from './user/userSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  language: localeSlice,
  modal: modalSlice,
  theme: themeSlice,
  product: productSlice,
  user: userSlice,
});

export default rootReducer;
