import { Product } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface ProductCompare {
  productsCompare: Product[]
  isShowCompareModal: boolean
}

const initialState: ProductCompare = {
  productsCompare: [],
  isShowCompareModal: false,
}

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    deleteProductCompare: (state, { payload }) => {
      state.productsCompare = state.productsCompare.filter(
        (product) => product.product_tmpl_id !== payload
      )
    },

    clearProductCompare: (state) => {
      state.productsCompare = []
    },

    addProductCompare: (state, { payload }) => {
      const isExist = state.productsCompare.find(
        (item) => item.product_tmpl_id === payload.product_tmpl_id
      )
      if (isExist) return

      state.productsCompare.unshift(payload)
    },

    toggleShowCompareModal: (state, { payload }) => {
      state.isShowCompareModal = payload
    },
  },
})

export default compareSlice.reducer

export const {
  addProductCompare,
  deleteProductCompare,
  toggleShowCompareModal,
  clearProductCompare,
} = compareSlice.actions
