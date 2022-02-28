export interface Price {
  regular_price: number;
  wholesale_price: number;
}

export interface Product extends ProductRequest {
  _id: string;
}

export interface ProductRequest {
  name: string;
  desc: string;
  category_id: String;
  images: Array<string>;
  price: Price;
  stock: number;
  sku: string;
  active: boolean;
  index?: number;
}

export interface ProductSort {
  id: string;
  type: 'asc' | 'desc';
}

export interface ProductPagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
}

export interface Category extends CategoryRequest {
  _id: string;
}

export interface CategoryRequest {
  name: string;
  image: string;
}

export interface ProductSlice {
  initProductList: {
    data: Product[];
  };
  productList: {
    isLoading: boolean;
    data: Product[];
  };

  productDetail: Product;

  categoryList: Category[];
}

export interface Pagination {
  limit: number;
  page: number;
}

export interface ProductParams {
  token: string;
  data: ProductRequest;
}

export interface ProductUpdate {
  token: string;
  data: Product;
}

export interface CategoryParams {
  token: string;
  data: CategoryRequest;
}

export interface DeleteWithId {
  token: string;
  data: { _id: string };
}
