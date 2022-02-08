import { createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../services/cartApi';

const fetchCartList = createAsyncThunk(
  'products/fetchCartList',
  async (params: object = {}) => {
    try {
      return await cartApi.getCartList();
    } catch (error) {
      console.log(error);
    }
  }
);

export { fetchCartList };
