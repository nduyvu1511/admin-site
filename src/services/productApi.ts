import {
  DeleteWithId,
  ProductParams,
  ProductUpdate,
} from './../modules/product/interface';
import axiosClient from '.';

export interface SearchKeyword {
  keyword: string;
}

export interface Token {
  token: string;
}

export interface ParamsRequest {
  token: string;
  data: any;
}

export interface CategoryParams extends Token {
  category: {
    name: string;
    image: string;
  };
}

const productApi = {
  getCategories: () => {
    return axiosClient.get('category/list');
  },

  addCategory: (params: CategoryParams) => {
    return axiosClient.post('category/add', { params: params });
  },

  editCategory: (params: CategoryParams) => {
    return axiosClient.put(`category/update`, {
      params: params,
    });
  },

  deleteCategory: (params: DeleteWithId) => {
    return axiosClient.post(`category/delete`, {
      params: params,
    });
  },

  addProduct: (product: ProductParams) => {
    return axiosClient.post('product/add', {
      params: product,
    });
  },

  editProduct: (product: ProductUpdate) => {
    return axiosClient.post(`product/update`, {
      params: product,
    });
  },

  deleteProduct: (params: DeleteWithId) => {
    return axiosClient.post(`product/delete`, { params: params });
  },

  uploadImages: (formData: any) => {
    return axiosClient.post('upload', formData);
  },

  getProductList: (query: string = '') => {
    return axiosClient.get(`product/list/${query}`);
  },
};

export default productApi;
