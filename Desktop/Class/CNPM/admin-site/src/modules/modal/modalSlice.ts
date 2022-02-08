import { createSlice } from '@reduxjs/toolkit';

interface ModalSlice {
  isOpenSidebar: boolean;
}

const initialState: ModalSlice = {
  isOpenSidebar: false,
};

const productSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }: { payload: boolean }) => {
      state.isOpenSidebar = payload;
    },
  },
});

export const { toggleSidebar } = productSlice.actions;
export default productSlice.reducer;
