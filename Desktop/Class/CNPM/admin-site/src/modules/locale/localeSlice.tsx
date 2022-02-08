import { createSlice } from '@reduxjs/toolkit';

interface ILocaleSlice {
  language: 'vni' | 'eng';
}

const initialState: ILocaleSlice = {
  language: 'vni',
};

const productSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    toggleLanguage: (state, { payload }: { payload: 'vni' | 'eng' }) => {
      state.language = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default productSlice.reducer;
