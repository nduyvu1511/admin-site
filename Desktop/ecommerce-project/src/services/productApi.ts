import { GetProductDetail, ProductParams } from "@/models"
import axiosClient from "."

const productApi = {
  getCategories: (parent_id: number | false = false) => {
    return axiosClient.post("/api/v2.0/product/category", {
      params: {
        parent_id,
      },
    })
  },

  getChildCategories: (parent_id: number | false = false) => {
    return axiosClient.post("/api/v3.0/product/category", {
      params: {
        parent_id,
      },
    })
  },

  getProductDetail: (params: GetProductDetail) => {
    return axiosClient.post("/api/v2.0/product_product/detail", {
      params,
    })
  },

  getProductList: (params?: ProductParams) => {
    return axiosClient.post("/attribute_filter/top_sale", {
      params,
    })
  },

  getProductAttributeList: (categ_id: number) => {
    return axiosClient.post(
      "/attribute_controller/get_product_attribute_list",
      {
        params: {
          categ_id,
        },
      }
    )
  },

  getSaleProductList: (token?: string) => {
    return axiosClient.post("/daily_deal_controller/get_daily_deal", {
      params: {
        token: token || false,
      },
    })
  },

  filterProducts: (params?: ProductParams) => {
    return axiosClient.post(
      "/attribute_controller/search_product_by_attribute",
      {
        params,
      }
    )
  },
}

export default productApi
