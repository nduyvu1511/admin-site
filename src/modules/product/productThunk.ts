import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi, { CategoryParams } from '../../services/productApi';
import { ProductParams, DeleteWithId, ProductUpdate } from './interface';

const fetchGetAllProducts = createAsyncThunk(
  'products/fetchGetAllProducts',
  async () => {
    try {
      return await productApi.getProductList();
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchAllCategories = createAsyncThunk(
  'products/fetchAllCategories',
  async () => {
    try {
      return await productApi.getCategories();
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchAddProduct = createAsyncThunk(
  'products/fetchAddProduct',
  async (product: ProductParams) => {
    try {
      return await productApi.addProduct(product);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchUpdateProduct = createAsyncThunk(
  'products/fetchUpdateProduct',
  async (product: ProductUpdate) => {
    try {
      return await productApi.editProduct(product);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchDeleteCategory = createAsyncThunk(
  'products/fetchDeleteCategory',
  async (params: DeleteWithId) => {
    try {
      return await productApi.deleteCategory(params);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchAddCategory = createAsyncThunk(
  'products/fetchAddCategory',
  async (category: CategoryParams) => {
    try {
      return await productApi.addCategory(category);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchUpdateCategory = createAsyncThunk(
  'products/fetchUpdateCategory',
  async (category: CategoryParams) => {
    try {
      return await productApi.editCategory(category);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchDeleteProduct = createAsyncThunk(
  'products/fetchDeleteProduct',
  async (params: DeleteWithId) => {
    try {
      return await productApi.deleteProduct(params);
    } catch (error) {
      console.log(error);
    }
  }
);

const fetchUploadProductImages = createAsyncThunk(
  'products/fetchUploadProductImages',
  async (data: any) => {
    try {
      return await productApi.uploadImages(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export {
  fetchGetAllProducts,
  fetchAllCategories,
  fetchUploadProductImages,
  fetchDeleteProduct,
  fetchAddProduct,
  fetchUpdateProduct,
  fetchAddCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
};
