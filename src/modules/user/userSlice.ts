import { AuthSlice, UserInfo } from './interface';
import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from './userThunk';
import { toast } from 'react-toastify';

const initialState: AuthSlice = {
  userInfo: {} as UserInfo,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.userInfo = payload?.data;
      state.token = payload?.data.token;
      toast.success('Login successfully!');
    });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
