import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Category, Product, ProductSlice, ProductSort } from './interface';
import {
  fetchAddProduct,
  fetchAllCategories,
  fetchDeleteProduct,
  fetchGetAllProducts,
  fetchUpdateProduct,
} from './productThunk';

const initialState: ProductSlice = {
  initProductList: {
    data: [],
  },
  productList: {
    isLoading: false,
    data: [],
  },
  productDetail: {} as Product,
  categoryList: [] as Category[],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sortProducts: (state, { payload }: { payload: ProductSort }) => {
      state.productList.data = state.productList.data.sort((a, b) => {
        if (payload.id === 'name') {
          return payload.type === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (payload.id === 'sku') {
          return payload.type === 'asc'
            ? a.sku.localeCompare(b.sku)
            : b.sku.localeCompare(a.sku);
        } else if (payload.id === 'price') {
          return payload.type === 'asc'
            ? a.price.regular_price - b.price.regular_price
            : b.price.regular_price - a.price.regular_price;
        } else if (payload.id === 'active') {
          return payload.type === 'asc'
            ? Number(a.active) - Number(b.active)
            : Number(b.active) - Number(a.active);
        }

        return payload.type === 'asc' ? a.stock - b.stock : b.stock - a.stock;
      });
    },

    addProductDetail: (state, { payload }: { payload: Product }) => {
      state.productDetail = payload;
    },

    clearProductDetail: (state) => {
      state.productDetail = {} as Product;
    },

    searchProducts: (state, { payload }: { payload: string }) => {
      state.productList.data = [...state.initProductList.data];
      state.productList.data = state.productList.data.filter((product) =>
        product.name.toLowerCase().includes(payload.trim().toLowerCase())
      );
    },
  },

  extraReducers: (builder) => {
    // Product
    builder.addCase(fetchGetAllProducts.fulfilled, (state, { payload }) => {
      state.productList.isLoading = false;
      state.initProductList.data = payload?.data.data;
      state.productList.data = payload?.data.data;
    });

    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.productList.isLoading = true;
    });

    builder.addCase(fetchAddProduct.fulfilled, (state, { payload }) => {
      state.productList.data.unshift(payload?.data.data);
      toast.success(payload?.data?.message);
    });

    builder.addCase(fetchUpdateProduct.fulfilled, (state, { payload }) => {
      const result = payload?.data;
      state.productList.data = [...state.productList.data].map((product) =>
        product._id === result.data._id ? result.data : product
      );
      toast.success(result?.message);
    });

    builder.addCase(fetchDeleteProduct.fulfilled, (state, { payload }) => {
      state.productList.data = [...state.productList.data].filter(
        (item) => item._id !== payload?.data.data._id
      );
      toast.success(payload?.data?.message);
    });

    // Category
    builder.addCase(fetchAllCategories.fulfilled, (state, { payload }) => {
      state.categoryList = payload?.data.data;
      state.categoryList.map((item: any) => ({ ...item, id: item._id }));
    });
  },
});

export const {
  searchProducts,
  sortProducts,
  addProductDetail,
  clearProductDetail,
} = productSlice.actions;
export default productSlice.reducer;
