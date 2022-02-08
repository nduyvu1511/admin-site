import axiosClient from '.';

const cartApi = {
  getCartList: () => {
    return axiosClient.post('order/order_draft', { params: {} });
  },

  addToCart: (data: any) => {
    return axiosClient.post('order/order_draft', data);
  },

  deleteCart: (id: string) => {
    return axiosClient.post('order/order_draft', { params: { id } });
  },

  updateCart: (data: any) => {
    return axiosClient.post('order/order_draft', data);
  },
};

export default cartApi;
