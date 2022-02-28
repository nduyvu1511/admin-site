import { createSlice } from '@reduxjs/toolkit';

interface ModalSlice {
  isOpenSidebar: boolean;
  isOpenSidebarSm: boolean;
  isOpenProductForm: boolean;
  isOpenCategoryForm: boolean;
  isOpenModalConfirm: boolean;
}

const initialState: ModalSlice = {
  isOpenSidebar: false,
  isOpenSidebarSm: false,
  isOpenProductForm: false,
  isOpenCategoryForm: false,
  isOpenModalConfirm: false,
};

const productSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpenSidebar = !state.isOpenSidebar;
    },

    toggleSidebarSm: (state) => {
      state.isOpenSidebarSm = !state.isOpenSidebarSm;
    },

    toggleProductForm: (state, { payload }: { payload: boolean }) => {
      state.isOpenProductForm = payload;
    },

    toggleModalConfirm: (state) => {
      state.isOpenModalConfirm = !state.isOpenModalConfirm;
    },

    toggleCategoryForm: (state, { payload }: { payload: boolean }) => {
      state.isOpenCategoryForm = payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleSidebarSm,
  toggleProductForm,
  toggleModalConfirm,
  toggleCategoryForm,
} = productSlice.actions;
export default productSlice.reducer;
