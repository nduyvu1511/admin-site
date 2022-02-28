import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authApi from '../../services/authApi';
import { Login } from './interface';

const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params: Login, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      return await authApi.login(params);
    } catch (error: any) {
      toast.error(rejectWithValue(error).payload.response.data.message);
    }
  }
);

export { fetchLogin };
