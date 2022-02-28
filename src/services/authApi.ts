import axiosClient from '.';
import { Login } from '../modules/user/interface';

const authApi = {
  login: (user: Login) => {
    return axiosClient.post('auth/login', user);
  },
};

export default authApi;
