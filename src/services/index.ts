import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    throw err;
  }
);

export default axiosClient;
