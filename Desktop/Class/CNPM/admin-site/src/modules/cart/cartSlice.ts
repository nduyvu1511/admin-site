import { createSlice } from '@reduxjs/toolkit';
import { fetchCartList } from './cartThunk';
import { CartSlice } from './interface';

const initialState: CartSlice = {
  data: [],
};

const productSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get category list

    builder.addCase(fetchCartList.pending, (state) => {});
  },
});

export default productSlice.reducer;
