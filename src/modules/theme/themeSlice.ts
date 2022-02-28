import { createSlice } from '@reduxjs/toolkit';

interface ThemeSlice {
  currentTheme: 'dark' | 'light';
}

const initialState: ThemeSlice = {
  currentTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
