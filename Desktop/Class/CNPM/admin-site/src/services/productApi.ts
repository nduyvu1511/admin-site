import axiosClient from '.';

export interface SearchKeyword {
  keyword: string;
}

const productApi = {
  getCategories: () => {
    return axiosClient.post('product/category', { params: {} });
  },

  getConsumtionProducts: () => {
    return axiosClient.post('information_product/list_consumption_product', {
      params: {},
    });
  },
  
  getSearchProducts: (params: SearchKeyword) => {
    return axiosClient.post('product/top', {
      params: params,
    });
  },

  getProductDetail: (params: object = {}) => {
    return axiosClient.post('product_product/detail', {
      params: params,
    });
  },

  getProductList: (params: object = {}) => {
    return axiosClient.post('product/top', { params: params });
  },
};

export default productApi;
