import {
  AttributeWithParentId,
  BooleanType,
  Product,
  ProductSlice
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: ProductSlice = {
  product: null,
  listAttribute: undefined,
  search: {
    isOpen: undefined,
    keyword: undefined,
    isSearching: undefined,
  },
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, { payload }: { payload: Product | null }) => {
      state.product = payload
    },

    setAttributeList: (
      state,
      { payload }: { payload: AttributeWithParentId[] }
    ) => {
      state.listAttribute = payload
    },

    changeAttributeItem: (
      state,
      { payload }: { payload: AttributeWithParentId }
    ) => {
      state.listAttribute = state.listAttribute?.map((item) =>
        item.parentId === payload.parentId ? payload : item
      )
    },

    toggleSearchResult: (state, { payload }: BooleanType) => {
      state.search.isOpen = payload
    },

    setKeyword: (state, { payload }: { payload: string }) => {
      state.search.keyword = payload
    },

    setSearchingStatus: (state, { payload }: BooleanType) => {
      state.search.isSearching = payload
    },
  },
})

export default productSlice.reducer

export const {
  setProduct,
  changeAttributeItem,
  setAttributeList,
  setKeyword,
  setSearchingStatus,
  toggleSearchResult,
} = productSlice.actions
